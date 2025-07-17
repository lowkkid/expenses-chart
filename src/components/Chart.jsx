import {
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
} from "recharts";
import data from "../data.json";
import { useState } from "react";
import Statistics from "./Statistics";
import styles from "./Chart.module.css";

const rootStyles = getComputedStyle(document.documentElement);
const maxValue = Math.max(...data.spendings.map((spending) => spending.amount));

export default function Chart() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipData, setTooltipData] = useState(null);

  const resolveBarColor = (entry, index) => {
    const isMaxValue = entry.amount === maxValue;
    const isActiveBar = index === activeIndex;

    let cssVar = "--bar-color";
    if (isMaxValue && isActiveBar) cssVar = "--selected-max-bar-color";
    else if (isMaxValue) cssVar = "--max-bar-color";
    else if (isActiveBar) cssVar = "--selected-bar-color";

    return rootStyles.getPropertyValue(cssVar).trim();
  };

  return (
    <div className={styles.chart}>
      <h1 className={styles.chartHeader}>Spending - last 7 days</h1>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data.spendings}
          margin={{ top: 40, right: 0, left: 0, bottom: 0 }}
        >
          <XAxis dataKey="day" axisLine={false} tickLine={false} />
          <Tooltip
            cursor={false}
            content={(props) =>
              showTooltip ? (
                <CustomTooltip {...props} tooltipData={tooltipData} />
              ) : null
            }
            isAnimationActive={false}
          />
          <Bar
            dataKey="amount"
            radius={[5, 5, 5, 5]}
            style={{ cursor: "pointer" }}
            onMouseEnter={(barData, index, event) => {
              setActiveIndex(index);
              setShowTooltip(true);

              const target = event.target;
              const rect = target.getBoundingClientRect();
              const chartContainer = target.closest(".recharts-wrapper");
              const chartRect = chartContainer.getBoundingClientRect();

              const barCenterX = rect.left + rect.width / 2 - chartRect.left;
              const barTopY = rect.top - chartRect.top;

              setTooltipData({
                x: barCenterX,
                y: barTopY - 45,
              });
            }}
            onMouseLeave={(barData, index) => {
              setActiveIndex(null);
              setShowTooltip(false);
              setTooltipData(null);
            }}
          >
            {data.spendings.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={resolveBarColor(entry, index)}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <hr />

      <Statistics data={data} />
    </div>
  );
}

const CustomTooltip = ({ active, payload, tooltipData }) => {
  if (active && payload && payload.length && tooltipData) {
    return (
      <div
        className={styles.customTooltip}
        style={{
          position: "absolute",
          left: tooltipData.x,
          top: tooltipData.y,
          transform: "translateX(-50%)",
          pointerEvents: "none",
        }}
      >
        {`$${payload[0].value}`}
      </div>
    );
  }

  return null;
};
