import React, { useState } from 'react'
import LandingPage from './components/LandingPage'
import LoginPage from './components/LoginPage'

function SuccessPage() {
  // 登录成功后的“空白页”占位
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #5b7cff, #9b5bff)',
        color: '#fff',
        fontFamily: 'sans-serif'
      }}
    >
      <div style={{ fontSize: 48, marginBottom: 12 }}>✓</div>
      <h2>登录成功</h2>
      <p style={{ opacity: 0.85, marginTop: 8 }}>（空白页占位 · 此处可接入业务主页）</p>
    </div>
  )
}

export default function App() {
  const [showLogin, setShowLogin] = useState(false) // 登录卡片是否以浮层弹出
  const [loggedIn, setLoggedIn] = useState(false)

  if (loggedIn) return <SuccessPage />

  return (
    <>
      {/* 首页始终挂载，浮层打开时仍可见 */}
      <LandingPage onLogin={() => setShowLogin(true)} />

      {showLogin && (
        <LoginPage
          modal
          onClose={() => setShowLogin(false)}
          onLoginSuccess={() => setLoggedIn(true)}
        />
      )}
    </>
  )
}
