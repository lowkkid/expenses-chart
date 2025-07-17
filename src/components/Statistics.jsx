import styles from "./Statistics.module.css";

export default function Balance({ data }) {
  const totalSpendings = data.spendings.reduce(
    (acc, val) => acc + val.amount,
    0
  );

  const differencePercent =
    ((totalSpendings - data.lastWeekTotalSpendings) /
      data.lastWeekTotalSpendings) *
    100;

  return (
    <div className={styles.statisticsCard}>
      <div className={styles.totalWeekSection}>
        <span className={styles.totalWeekLabel}>Total this week</span>
        <span className={styles.totalWeekValue}>
          ${totalSpendings.toFixed(2)}
        </span>
      </div>
      <div className={styles.lastWeekCompareSection}>
        <span className={styles.lastWeekCompareValue}>
          {differencePercent > 0 ? "+" : ""}
          {`${differencePercent.toFixed(2)}`}%{" "}
        </span>
        <span className={styles.lastWeekCompareLabel}>from last week</span>
      </div>
    </div>
  );
}
