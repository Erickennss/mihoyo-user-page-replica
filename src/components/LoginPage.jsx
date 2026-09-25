import React, { useState, useEffect, useRef } from 'react'
import styles from './LoginPage.module.css'
import Toast from './Toast'
import { mockLogin, mockSendCode } from '../api/mockApi'
import {
  EyeIcon,
  EyeOffIcon,
  WechatIcon,
  QQIcon,
  WeiboIcon,
  LogoMark
} from './icons'

const PHONE_RE = /^1[3-9]\d{9}$/
const CODE_RE = /^\d{6}$/

function validatePhone(v) {
  if (!v.trim()) return '请输入手机号'
  if (!PHONE_RE.test(v)) return '请输入正确的手机号'
  return ''
}
function validateCode(v) {
  if (!v) return '请输入验证码'
  if (!CODE_RE.test(v)) return '验证码为 6 位数字'
  return ''
}
function validatePassword(v) {
  if (!v) return '请输入密码'
  if (v.length < 6) return '密码长度至少为 6 位'
  return ''
}

export default function LoginPage({ onLoginSuccess, onClose, modal = false }) {
  const [mode, setMode] = useState('sms') // 'sms' | 'pwd'
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [agree, setAgree] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [toast, setToast] = useState({ message: '', type: 'error' })
  const timerRef = useRef(null)

  useEffect(() => () => clearInterval(timerRef.current), [])

  // 弹窗态锁定页面滚动，关闭时还原
  useEffect(() => {
    if (!modal) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [modal])

  const canSendCode = countdown === 0 && !validatePhone(phone)

  function switchMode(m) {
    setMode(m)
    setErrors({})
  }

  function startCountdown() {
    setCountdown(60)
    timerRef.current = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(timerRef.current)
          return 0
        }
        return c - 1
      })
    }, 1000)
  }

  async function handleSendCode() {
    const err = validatePhone(phone)
    if (err) {
      setErrors((e) => ({ ...e, phone: err }))
      return
    }
    const res = await mockSendCode(phone)
    setToast({ message: res.message, type: 'success' })
    startCountdown()
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (loading) return
    if (!agree) {
      setToast({ message: '请先阅读并同意用户协议与隐私政策', type: 'error' })
      return
    }
    const ePhone = validatePhone(phone)
    const eRest = mode === 'sms' ? validateCode(code) : validatePassword(password)
    const next = { phone: ePhone, code: mode === 'sms' ? eRest : '', password: mode === 'pwd' ? eRest : '' }
    setErrors(next)
    if (ePhone || eRest) return

    setLoading(true)
    mockLogin({ account: phone, password: mode === 'pwd' ? password : code, code }).then((res) => {
      setLoading(false)
      if (res.success) {
        onLoginSuccess && onLoginSuccess(res)
      } else {
        setToast({ message: res.message, type: 'error' })
      }
    })
  }

  function clearErr(field) {
    if (errors[field]) setErrors((e) => ({ ...e, [field]: '' }))
  }

  return (
    <div className={modal ? `${styles.page} ${styles.modal}` : styles.page}>
      {!modal && <div className={styles.bgLayer} />}

      <main className={styles.container}>
        <section className={styles.card}>
          {/* 左上角装饰 Logo */}
          <div className={styles.cornerLogo}>
            <LogoMark size={46} />
          </div>

          {/* 关闭按钮 */}
          <button
            type="button"
            className={styles.closeBtn}
            aria-label="关闭"
            onClick={() => onClose && onClose()}
          >
            ✕
          </button>

          {/* 品牌区 */}
          <div className={styles.brandHead}>
            <span className={styles.brandWord}>miHoYo</span>
            <span className={styles.brandSub}>TECH OTAKUS SAVE THE WORLD</span>
          </div>

          {/* 登录方式 Tab */}
          <div className={styles.tabs} role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'sms'}
              className={`${styles.tab} ${mode === 'sms' ? styles.tabActive : ''}`}
              onClick={() => switchMode('sms')}
            >
              短信登录
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'pwd'}
              className={`${styles.tab} ${mode === 'pwd' ? styles.tabActive : ''}`}
              onClick={() => switchMode('pwd')}
            >
              密码登录
            </button>
          </div>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            {/* 手机号（带 +86 前缀） */}
            <div className={styles.field}>
              <div className={`${styles.inputWrap} ${errors.phone ? styles.inputError : ''}`}>
                <span className={styles.prefix}>+86</span>
                <input
                  className={styles.input}
                  type="tel"
                  maxLength={11}
                  placeholder="手机号"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value.replace(/\D/g, ''))
                    clearErr('phone')
                  }}
                  autoComplete="tel"
                />
              </div>
              {errors.phone && <p className={styles.errText}>{errors.phone}</p>}
            </div>

            {/* 短信模式：验证码 */}
            {mode === 'sms' && (
              <div className={styles.field}>
                <div className={`${styles.inputWrap} ${errors.code ? styles.inputError : ''}`}>
                  <input
                    className={styles.input}
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="验证码"
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value.replace(/\D/g, ''))
                      clearErr('code')
                    }}
                  />
                  <button
                    type="button"
                    className={`${styles.sendBtn} ${canSendCode ? '' : styles.sendBtnDisabled}`}
                    onClick={handleSendCode}
                    disabled={!canSendCode}
                  >
                    {countdown > 0 ? `${countdown}s后重发` : '获取验证码'}
                  </button>
                </div>
                {errors.code && <p className={styles.errText}>{errors.code}</p>}
              </div>
            )}

            {/* 密码模式：密码 */}
            {mode === 'pwd' && (
              <div className={styles.field}>
                <div className={`${styles.inputWrap} ${errors.password ? styles.inputError : ''}`}>
                  <input
                    className={styles.input}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="密码"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      clearErr('password')
                    }}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className={styles.iconBtn}
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label="切换密码可见"
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
                {errors.password && <p className={styles.errText}>{errors.password}</p>}
              </div>
            )}

            {/* 协议勾选（圆形单选样式） */}
            <label className={styles.agreeRow}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />
              <span className={styles.agreeText}>
                已阅读并同意
                <a className={styles.link} href="#" onClick={(e) => e.preventDefault()}>
                  《米哈游用户协议》
                </a>
                <a className={styles.link} href="#" onClick={(e) => e.preventDefault()}>
                  《米哈游隐私政策》
                </a>
                ，未注册的手机号验证通过后将自动注册
              </span>
            </label>

            {/* 登录按钮 */}
            <button
              type="submit"
              className={`${styles.submitBtn} ${loading || !agree ? styles.submitDisabled : ''}`}
              disabled={loading || !agree}
            >
              {loading && <span className={styles.spinner} />}
              {loading ? '登录中' : '登录'}
            </button>
          </form>

          {/* 底部帮助 */}
          <div className={styles.divider} />
          <div className={styles.helpRow}>
            <a className={styles.helpLink} href="#" onClick={(e) => e.preventDefault()}>
              遇到问题
            </a>
          </div>

          {/* 左侧第三方登录 */}
          <div className={styles.sideIcons}>
            <button className={styles.thirdIcon} type="button" aria-label="微信登录">
              <WechatIcon />
            </button>
            <button className={styles.thirdIcon} type="button" aria-label="QQ登录">
              <QQIcon />
            </button>
            <button className={styles.thirdIcon} type="button" aria-label="微博登录">
              <WeiboIcon />
            </button>
          </div>
        </section>
      </main>

      {!modal && (
        <footer className={styles.footer}>
          <p>© 2026 米哈游（仅用于学习复现，非官方页面）</p>
          <p>沪ICP备XXXXXXXX号 | 沪公网安备 XXXXXXXXXXXXXX号</p>
        </footer>
      )}

      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'error' })}
      />
    </div>
  )
}
