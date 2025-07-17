import Balance from "./Balance";
import Chart from "./Chart";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.app}>
      <Balance />
      <Chart />
    </div>
  );
}

export default App;
