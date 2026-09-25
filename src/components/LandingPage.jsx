import React, { useState } from 'react'
import styles from './LandingPage.module.css'
import { CardIcon, WalletIcon, UserIcon } from './icons'

const BADGES = [
  '国家实名认证',
  '信息系统安全等级保护三级',
  'ISO/IEC 27001 认证',
  '青少年防沉迷系统'
]

const FOOTER_LINKS = ['隐私政策', '关于我们', '联系我们', '加入我们']

const FOOTER_LINES = [
  '沪公安网备31010402001113号　|　增值电信业务经营许可证：沪B2-20190555',
  '沪ICP备19018275号-4　|　沪网文〔2025〕0178-050号',
  '互联网违法不良信息举报邮箱: tousu@service.mihoyo.com　互联网违法不良信息举报电话: 021-60371750 （工作时间: 每天10点~20点）',
  '亲爱的市民朋友, 上海警方反诈防骗电话 962110, 专门针对避免您财产受损设计, 请您一旦收到来电, 立即接听',
  '未成年成长关爱热线: 021-60371740 （服务时间: 8:00~23:00）',
  '©2012-2026 上海米哈游影铁科技有限公司版权所有　　客服电话: 400-666-6312'
]

const CERT_CARDS = [
  { icon: '信', bg: '#2eae5b', lines: ['全国企业信息公示', '信用中心'] },
  { icon: '警', bg: '#e85454', lines: ['上海网警备案', '请登录验证'] },
  { icon: '文', bg: '#3d7ff0', lines: ['互联网文化', '经营单位'] },
  { icon: '110', bg: '#2f7bff', lines: ['反诈防骗', '962110'] },
  { icon: '照', bg: '#d9a13c', lines: ['电子营业执照'] }
]

/* —— 卡片插画（纯 SVG 手绘，仿官方扁平插画风） —— */

// 便捷：白色信息卡 + mi 标 + 黄色闪电
function ArtConvenient() {
  return (
    <svg width="88" height="80" viewBox="0 0 88 80" fill="none">
      <g transform="rotate(-6 40 36)">
        <rect x="14" y="10" width="52" height="46" rx="9" fill="#ffffff" stroke="#e2ecf8" />
        <rect x="22" y="20" width="18" height="18" rx="4" fill="#35a3f5" />
        <text x="31" y="33" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#fff" fontFamily="Arial">
          mi
        </text>
        <rect x="44" y="23" width="15" height="3" rx="1.5" fill="#dfe9f6" />
        <rect x="44" y="29" width="11" height="3" rx="1.5" fill="#eaf1fa" />
        <rect x="22" y="43" width="36" height="3" rx="1.5" fill="#eef4fb" />
        <rect x="22" y="49" width="26" height="3" rx="1.5" fill="#f2f7fc" />
      </g>
      <circle cx="64" cy="54" r="14" fill="#ffd45e" />
      <path d="M66.5 44.5l-8.5 11.5h5.2l-2 8.5 9-11.5h-5.4z" fill="#ffffff" />
    </svg>
  )
}

// 安全：账号卡片 + 蓝色盾牌挂锁
function ArtSecurity() {
  return (
    <svg width="94" height="80" viewBox="0 0 94 80" fill="none">
      <rect x="16" y="12" width="46" height="38" rx="7" fill="#ffffff" stroke="#e2ecf8" />
      <circle cx="29" cy="25" r="5.5" fill="#bfe0fb" />
      <path d="M21.5 36a7.5 7.5 0 0 1 15 0z" fill="#bfe0fb" />
      <rect x="41" y="21" width="15" height="3" rx="1.5" fill="#dfe9f6" />
      <rect x="41" y="27" width="11" height="3" rx="1.5" fill="#eaf1fa" />
      <rect x="23" y="40" width="32" height="3" rx="1.5" fill="#eef4fb" />
      <circle cx="28" cy="46.5" r="1.7" fill="#c9dcf3" />
      <circle cx="34" cy="46.5" r="1.7" fill="#c9dcf3" />
      <circle cx="40" cy="46.5" r="1.7" fill="#c9dcf3" />
      <path
        d="M62 28c5.2 0 10.4-2 12.6-4.2C76.8 26 82 28 87.2 28v11c0 9.6-5.2 16-12.6 20.3C67.2 55 62 48.6 62 39z"
        fill="#54aef2"
      />
      <path d="M71.5 41.5v-3.2a3.2 3.2 0 0 1 6.4 0v3.2" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
      <rect x="69.4" y="41" width="10.6" height="8.4" rx="2.2" fill="#ffffff" />
      <circle cx="74.7" cy="45" r="1.7" fill="#54aef2" />
    </svg>
  )
}

// 通用：浏览器窗口 + 头像信息 + 绿色对勾
function ArtUniversal() {
  return (
    <svg width="94" height="82" viewBox="0 0 94 82" fill="none">
      <circle cx="12" cy="60" r="2.4" fill="#39c07f" />
      <circle cx="7" cy="66" r="1.6" fill="#8fd9b6" />
      <rect x="16" y="8" width="60" height="46" rx="8" fill="#ffffff" stroke="#e2ecf8" />
      <path d="M16 16a8 8 0 0 1 8-8h44a8 8 0 0 1 8 8v4H16z" fill="#e8f2fc" />
      <circle cx="23" cy="14" r="1.7" fill="#c6ddf5" />
      <circle cx="29" cy="14" r="1.7" fill="#c6ddf5" />
      <circle cx="35" cy="14" r="1.7" fill="#c6ddf5" />
      <circle cx="28" cy="33" r="6.5" fill="#bfe0fb" />
      <path d="M19.5 45a8.5 8.5 0 0 1 17 0z" fill="#bfe0fb" />
      <rect x="42" y="28" width="26" height="3.2" rx="1.6" fill="#dfe9f6" />
      <rect x="42" y="35" width="20" height="3.2" rx="1.6" fill="#eaf1fa" />
      <rect x="42" y="42" width="15" height="3.2" rx="1.6" fill="#f2f7fc" />
      <circle cx="70" cy="56" r="11" fill="#3cc986" stroke="#ffffff" strokeWidth="3" />
      <path d="M64.5 56.5l3.8 3.8 7.5-8" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* 多方支持：产品字标（版权 Logo 以等排版文字字标复刻） */
const PARTNERS = [
  { name: '崩坏3', sub: 'HONKAI IMPACT 3RD', color: '#ff8a1e' },
  { name: '未定事件簿', sub: 'TEARS OF THEMIS', color: '#5b6472' },
  { name: '原神', sub: 'GENSHIN IMPACT', color: '#3b4a6b' },
  { name: '崩坏：星穹铁道', sub: 'HONKAI: STAR RAIL', color: '#2f7bff', italic: true },
  { name: '绝区·零', sub: 'ZENLESS ZONE ZERO', color: '#141821', italic: true },
  { name: '米游社', sub: 'HoYoLAB', color: '#35a3f5' }
]

const CARDS = [
  {
    title: '便捷',
    desc: '集中管理手机、邮箱、密码等个人信息，进行实名认证。',
    link: '管理账号信息',
    Art: ArtConvenient,
    Icon: CardIcon
  },
  {
    title: '安全',
    desc: '查看登录设备与操作日志，如有风险可及时修改密码、锁定账号。',
    link: '前往安全中心',
    Art: ArtSecurity,
    Icon: WalletIcon
  },
  {
    title: '通用',
    desc: '绑定各游戏角色，统一维护账号对外授权与关联关系。',
    link: '更多账号功能',
    Art: ArtUniversal,
    Icon: UserIcon
  }
]

export default function LandingPage({ onLogin }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className={styles.page}>
      <div className={styles.bg} />

      {/* 顶部导航 */}
      <header className={styles.nav}>
        <div className={styles.brand}>
          <span className={styles.brandWord}>miHoYo</span>
          <span className={styles.brandDivider} />
          <span className={styles.brandName}>米哈游通行证</span>
        </div>
        <div className={styles.navRight}>
          <a className={styles.help} href="#" onClick={(e) => e.preventDefault()}>
            帮助中心
          </a>
          <button type="button" className={styles.navLoginBtn} onClick={onLogin}>
            登录
          </button>
          {/* 移动端汉堡菜单 / 关闭按钮 */}
          <button
            type="button"
            className={styles.menuBtn}
            aria-label={menuOpen ? '关闭' : '菜单'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="#3b4256"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="#3b4256"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* 移动端下拉菜单 */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          <a href="#" onClick={(e) => e.preventDefault()}>
            帮助中心
          </a>
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false)
              onLogin()
            }}
          >
            登录
          </button>
        </div>
      )}

      {/* Hero 区域 */}
      <main className={styles.hero}>
        <h1 className={styles.title}>
          轻松管理
          <br />
          你的米哈游账号
        </h1>
        <p className={styles.subtitle}>提供一站式服务，守护账号安全</p>
        <button type="button" className={styles.cta} onClick={onLogin}>
          登录 <span className={styles.arrow}>→</span>
        </button>
      </main>

      {/* 亮点卡片（仿官方三卡布局） */}
      <section className={styles.cards}>
        {CARDS.map(({ title, desc, link, Art, Icon }) => (
          <div className={styles.card} key={title}>
            <div className={styles.cardHead}>
              <span className={styles.cardIcon}>
                <Icon />
              </span>
              <h3 className={styles.cardTitle}>{title}</h3>
            </div>
            <p className={styles.cardDesc}>{desc}</p>
            <a className={styles.cardLink} href="#" onClick={(e) => e.preventDefault()}>
              {link} <span className={styles.arr}>→</span>
            </a>
            <div className={styles.cardArt}>
              <Art />
            </div>
          </div>
        ))}
      </section>

      {/* Logo 横向滚动条 */}
      <section className={styles.partners}>
        <div className={styles.partnerLabel}>
          <span className={styles.hr} />
          <span className={styles.labelText}>多方支持</span>
          <span className={styles.hr} />
        </div>
        <div className={styles.marquee}>
          <div className={styles.marqueeTrack}>
            {[...PARTNERS, ...PARTNERS].map((p, i) => (
              <div className={styles.logoItem} key={`${p.name}-${i}`}>
                <span
                  className={styles.logoName}
                  style={{ color: p.color, fontStyle: p.italic ? 'italic' : 'normal' }}
                >
                  {p.name}
                </span>
                <span className={styles.logoSub}>{p.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 企业页脚：左 Logo + 右链接/备案信息/认证卡片 */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerLogo}>
            <span className={styles.footerWord}>miHoYo</span>
            <span className={styles.footerSlogan}>TECH OTAKUS SAVE THE WORLD</span>
          </div>

          <div className={styles.footerContent}>
            <div className={styles.footerLinks}>
              {FOOTER_LINKS.map((l, i) => (
                <React.Fragment key={l}>
                  {i > 0 && <span className={styles.linkSep}>|</span>}
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    {l}
                  </a>
                </React.Fragment>
              ))}
            </div>

            {FOOTER_LINES.map((line) => (
              <p className={styles.footerText} key={line}>
                {line}
              </p>
            ))}

            <div className={styles.footerBadges}>
              {CERT_CARDS.map((c) => (
                <div className={styles.fBadge} key={c.lines[0]}>
                  <span className={styles.fBadgeIcon} style={{ background: c.bg }}>
                    {c.icon}
                  </span>
                  <span className={styles.fBadgeText}>
                    {c.lines.map((t) => (
                      <em key={t}>{t}</em>
                    ))}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
