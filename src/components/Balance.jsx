import data from "../data.json";
import styles from "./Balance.module.css";

export default function Balance() {
  return (
    <div className={styles.balanceCard}>
      <div className={styles.balanceInfo}>
        <span className={styles.balanceLabel}>My balance</span>
        <span className={styles.balanceValue}>${data.balance}</span>
      </div>
      <img src="logo.svg" alt="Balance Icon" className="balance-icon" />
    </div>
  );
}
