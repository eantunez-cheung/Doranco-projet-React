import logo from "../../images/logo.svg";
import { Redirect } from "react-router";
import styles from './Splash.module.css'
import { useEffect, useState } from "react";

export default function Splash() {

  const [isRedirection, setIsRedirection] = useState(false)

  useEffect(() => {
    delayRedirection()
  })

  const delayRedirection = () => {
    setTimeout(() => {
      setIsRedirection(true)
    }, 5000)
  }

  return (
    <div className={styles.page}>
      <img src={logo} alt="logo" />
      {isRedirection ? <Redirect to="/Accueil" /> : ''}
    </div>
  )
}
