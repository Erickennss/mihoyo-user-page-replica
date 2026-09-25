// 内联 SVG 图标，避免引入额外依赖。
import React from 'react'

export function LogoIcon({ size = 34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="48" y2="48">
          <stop offset="0%" stopColor="#5b7cff" />
          <stop offset="100%" stopColor="#9b5bff" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#logoGrad)" />
      <path
        d="M16 32V16l8 9 8-9v16"
        stroke="#fff"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function EyeIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  )
}

export function EyeOffIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M3 3l18 18M10.6 6.2A9.7 9.7 0 0 1 12 6c6.5 0 10 7 10 7a17 17 0 0 1-3.2 4M6.3 8.3A17 17 0 0 0 2 13s3.5 7 10 7a9.6 9.6 0 0 0 4-.8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function WechatIcon({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8.7 4C4.9 4 1.8 6.6 1.8 9.8c0 1.8 1 3.4 2.6 4.5L3.6 16l2.4-1.2c.8.2 1.6.4 2.5.4h.5a5 5 0 0 1-.2-1.4c0-3 2.9-5.4 6.5-5.4h.6C15.2 5.9 12.3 4 8.7 4Zm-2.3 3.1a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm4.6 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" />
      <path d="M22.2 14.3c0-2.6-2.6-4.7-5.9-4.7s-5.9 2.1-5.9 4.7 2.6 4.7 5.9 4.7c.7 0 1.3-.1 1.9-.3l1.9 1-.5-1.6c1.5-.9 2.5-2.2 2.5-3.8Zm-7.8-1a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6Zm3.9 0a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6Z" />
    </svg>
  )
}

export function QQIcon({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.5c-3.6 0-6.4 3-6.4 7 0 2.4.9 4.6 2 6.3-.3 1-.7 2-1 2.9-.2.7.4 1 .8.5.6-.8 1.3-1.5 1.9-2.1.7 1 1.6 1.8 2.7 1.8s2-.8 2.7-1.8c.6.6 1.3 1.3 1.9 2.1.4.5 1 .2.8-.5-.3-.9-.7-1.9-1-2.9 1.1-1.7 2-3.9 2-6.3 0-4-2.8-7-6.4-7Z" />
    </svg>
  )
}

// 左上角装饰性 Logo（米哈游方块风格的近似图形）
export function LogoMark({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="2" y="12" width="18" height="18" rx="4" fill="#3ec6ff" />
      <rect x="25" y="3" width="13" height="13" rx="3" fill="#2f7bff" />
      <rect x="27" y="21" width="16" height="16" rx="4" fill="#3ec6ff" />
      <rect x="7" y="34" width="11" height="11" rx="3" fill="#2f7bff" />
    </svg>
  )
}

export function WeiboIcon({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M10.6 12.2c-2.7.3-4.8 1.9-4.8 3.6 0 1.8 2.3 3.2 5.2 3.2 3 0 5.4-1.5 5.4-3.3 0-1.5-1.9-2.7-4.3-3.1-.2 0-.5-.4-.5-.4Zm.3-1.6c.2.2.5.3.5.6 0 .6-.8 1-1.8 1-.9 0-1.6-.4-1.6-1 0-.5.6-.9 1.3-1 .3-.1.5-.3.7-.5.4-.3.6-.7.6-1.2 0-.9-.8-1.6-1.8-1.6-.4 0-.8.1-1.2.3C6.6 8.7 5.6 10.6 5.6 12.7c0 3.4 2.8 5.8 6.6 5.8 3.9 0 6.9-2.6 6.9-6 0-2.8-1.9-4.6-4-4.6-.3 0-.6 0-.8.1.4.4.6.9.6 1.4 0 .9-.8 1.5-1.9 1.5-.6 0-1.1-.2-1.5-.5.1.1.2.2.4.3Z" />
    </svg>
  )
}

// B 站（哔哩哔哩）图标
export function BilibiliIcon({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="7" width="18" height="13" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M7.5 4.5l2.5 2.5M16.5 4.5l-2.5 2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M8 11v4M16 11v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

// 移动端卡片小图标：卡片 / 钱包 / 用户
export function CardIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" fill="#35a3f5" />
      <rect x="2.5" y="8.5" width="19" height="3" fill="#ffffff" opacity="0.9" />
      <rect x="5.5" y="14" width="6" height="2" rx="1" fill="#ffffff" opacity="0.9" />
    </svg>
  )
}
export function WalletIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="6" width="18" height="13" rx="2.5" fill="#35a3f5" />
      <path d="M3 9.5h18" stroke="#ffffff" strokeWidth="1.6" />
      <rect x="14" y="12" width="5" height="4" rx="1.2" fill="#ffffff" />
    </svg>
  )
}
export function UserIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8.5" r="4" fill="#35a3f5" />
      <path d="M4.5 19a7.5 7.5 0 0 1 15 0z" fill="#35a3f5" />
    </svg>
  )
}
