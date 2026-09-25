import React, { useEffect } from 'react'
import styles from './Toast.module.css'

/**
 * 轻量 Toast 组件。
 * @param {{message:string, type?:'success'|'error', onClose:()=>void, duration?:number}} props
 */
export default function Toast({ message, type = 'error', onClose, duration = 2500 }) {
  useEffect(() => {
    if (!message) return
    const t = setTimeout(onClose, duration)
    return () => clearTimeout(t)
  }, [message, duration, onClose])

  if (!message) return null

  return (
    <div className={styles.wrap}>
      <div className={`${styles.toast} ${styles[type]}`} role="alert">
        <span className={styles.dot} />
        {message}
      </div>
    </div>
  )
}
