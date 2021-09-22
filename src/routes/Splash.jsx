import logo from "../images/logo.svg";
import styles from './Splash.module.css'

export default function Splash() {
    return (
      <div className={styles.page}>
        <img src={logo} alt="logo" />
      </div>
    )
  }
  