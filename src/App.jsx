import { useEffect, useRef, useState } from 'react'
import SoftAurora from './SoftAurora.jsx'
import DepthCarousel from './DepthCarousel.jsx'
import {
  profile,
  stats,
  education,
  experience,
  projects,
  strengths,
  skills,
} from './data.js'

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            io.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function Nav() {
  return (
    <header className="nav">
      <div className="container nav-inner">
        <a className="nav-brand" href="#top">
          刘成林<span>PORTFOLIO</span>
        </a>
        <nav className="nav-links">
          <a href="#experience">经历</a>
          <a href="#projects">项目</a>
          <a href="#strengths">优势</a>
          <a href="#contact">联系</a>
        </nav>
        <a className="btn btn-primary nav-cta" href="#contact">
          与我联系
        </a>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-bg">
        <div className="hero-aurora a1" />
        <div className="hero-aurora a2" />
        <video className="hero-video" autoPlay muted loop playsInline>
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" />
      </div>
      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="hero-kicker" data-reveal>
            LIU CHENGLIN · MARKETING / NEW MEDIA / PRODUCT OPERATIONS
          </p>
          <h1 className="hero-title" data-reveal>
            刘成林<span>.</span>
          </h1>
          <div className="hero-sub" data-reveal>
            <p className="hero-quote">
              报告老板，我工作的唯一目的就是完成您交给我的任务，老板！
            </p>
            <p className="hero-skillline">
              Python（Pandas、Numpy）、Power BI、CAD、PS、Office 办公软件、R、Matlab、SPSS、AI Agent 辅助办公，都会一点点，急了也能学 🤏
            </p>
          </div>
          <div className="hero-actions" data-reveal>
            <a className="btn btn-primary" href="#projects">
              查看项目
            </a>
            <a className="btn btn-ghost" href="#contact">
              与我联系
            </a>
          </div>
        </div>
        <HeroSide />
      </div>
      <a className="hero-scroll" href="#experience">
        <span />
        SCROLL
      </a>
    </section>
  )
}

function HeroSide() {
  const timer = useRef(null)
  const [bowed, setBowed] = useState(false)
  const [msg, setMsg] = useState(false)

  useEffect(() => () => clearTimeout(timer.current), [])

  const bow = () => {
    setBowed(true)
    setMsg(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setBowed(false)
      setMsg(false)
    }, 1800)
  }

  const chars = '求求你了我真的很需要这份工作'.split('')

  return (
    <div className="hero-side">
      <div className="hero-side-top" data-reveal>
        <div className="art-stack" aria-label="求求你了我真的很需要这份工作">
          {chars.map((ch, i) =>
            i === 0 ? (
              <span key={i} className="art-seal">
                {ch}
              </span>
            ) : (
              <span key={i} className={`art-line l${((i - 1) % 5) + 1}`}>
                {ch}
              </span>
            ),
          )}
        </div>
        <div className="figure-wrap" data-reveal>
          <button
            type="button"
            className={`stick${bowed ? ' bowing' : ''}`}
            onClick={bow}
            aria-label="点击火柴人，它会向你鞠躬"
          >
            {msg && (
              <span className="bubble" role="status">
                承蒙关照！给您鞠躬了 🙇
              </span>
            )}
            <svg viewBox="0 0 200 260" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round">
              <g className="stick-legs">
                <path d="M100 168 L72 238" />
                <path d="M100 168 L128 238" />
              </g>
              <g className="stick-torso">
                <circle cx="100" cy="56" r="32" />
                <path d="M100 88 L100 168" />
                <path d="M100 104 L62 140" />
                <path d="M100 104 L138 140" />
                <g className="stick-face">
                  <circle cx="90" cy="52" r="3.5" fill="currentColor" stroke="none" />
                  <circle cx="110" cy="52" r="3.5" fill="currentColor" stroke="none" />
                  <path d="M90 66 Q100 74 110 66" />
                </g>
                <circle className="sweat" cx="134" cy="34" r="8" fill="currentColor" stroke="none" />
              </g>
            </svg>
          </button>
          <p className="figure-hint">CLICK ME · 戳我一下</p>
        </div>
      </div>
      <div className="hero-tags" data-reveal>
        <span>HUMOROUS</span>
        <span>OPEN</span>
        <span>RIGOROUS</span>
      </div>
      <p className="art-note" data-reveal>
        幽默是上限，严谨是底线 —— 求职是认真的。
      </p>
    </div>
  )
}

function SectionHead({ index, title, en }) {
  return (
    <div className="section-head" data-reveal>
      <span className="section-index">{index}</span>
      <div>
        <p className="section-en">{en}</p>
        <h2>{title}</h2>
      </div>
    </div>
  )
}

const galleryImages = (item) =>
  item.galleryCount
    ? Array.from(
        { length: item.galleryCount },
        (_, i) =>
          `/${item.galleryDir}/img-${String(i + 1).padStart(2, '0')}.${item.galleryExt || 'png'}`,
      )
    : []

function ImageLightbox({ zoom, setZoom }) {
  if (!zoom) return null
  const { gallery, title, index } = zoom
  const step = (delta) =>
    setZoom((z) => z && { ...z, index: (z.index + delta + z.gallery.length) % z.gallery.length })

  return (
    <div
      className="lightbox"
      onClick={() => setZoom(null)}
      role="dialog"
      aria-modal="true"
      aria-label="图片放大预览"
    >
      <button
        type="button"
        className="lightbox-nav lightbox-nav--prev"
        aria-label="上一张"
        onClick={(e) => {
          e.stopPropagation()
          step(-1)
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M15 5l-7 7 7 7" />
        </svg>
      </button>
      <img
        key={index}
        className="lightbox-img"
        src={gallery[index]}
        alt={`${title} · 图片 ${index + 1}`}
        onClick={(e) => e.stopPropagation()}
      />
      <button
        type="button"
        className="lightbox-nav lightbox-nav--next"
        aria-label="下一张"
        onClick={(e) => {
          e.stopPropagation()
          step(1)
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>
      <p className="lightbox-hint">
        {index + 1} / {gallery.length} · ← → 切换 · 点击任意处关闭 · ESC
      </p>
    </div>
  )
}

function TimelineGroup({ title, items, activeId, onZoom }) {
  return (
    <div className="tl-group">
      <p className="tl-title">{title}</p>
      <div className="tl-list">
        {items.map((item) => (
          <article
            id={item.id}
            key={item.title}
            className={`tl-item${item.id && item.id === activeId ? ' is-active flash' : ''}`}
          >
            <div className="tl-head">
              <div>
                <h3>{item.title}</h3>
                <p className="tl-org">{item.sub}</p>
              </div>
              {item.note && <span className="tl-note">{item.note}</span>}
              <span className="tl-period">{item.period}</span>
            </div>
            <ul>
              {item.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            {item.galleryCount > 0 && (
              <div className="tl-gallery">
                {item.galleryCaption && <p className="tl-gallery-caption">{item.galleryCaption}</p>}
                <div className="tl-gallery-carousel">
                  <DepthCarousel
                    items={galleryImages(item).map((src, gi) => ({
                      image: src,
                      alt: `${item.title} · 照片 ${gi + 1}`,
                    }))}
                    cardWidth={260}
                    cardHeight={340}
                    depth={190}
                    spread={78}
                    tilt={22}
                    tiltDirection="right"
                    perspective={1300}
                    visibleCards={4}
                    falloff={0.22}
                    blur={5}
                    duration={700}
                    autoplay
                    autoplayDelay={3200}
                    loop
                    onZoom={(gi) =>
                      onZoom({ gallery: galleryImages(item), title: item.title, index: gi })
                    }
                  />
                </div>
                <p className="tl-gallery-hint">
                  共 {item.galleryCount} 张 · 点击最前面的卡片可放大查看
                </p>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  )
}

function Experience({ onZoom }) {
  const [zoom, setZoom] = useState(false)
  const [activeId, setActiveId] = useState(null)
  const flashTimer = useRef(null)

  useEffect(() => {
    if (!zoom) return
    const onKey = (e) => e.key === 'Escape' && setZoom(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [zoom])

  useEffect(() => () => clearTimeout(flashTimer.current), [])

  const flash = (target) => {
    if (!target) return
    setActiveId(null)
    clearTimeout(flashTimer.current)
    flashTimer.current = setTimeout(() => {
      setActiveId(target)
      document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 60)
  }

  return (
    <section id="experience" className="section">
      <div className="container">
        <SectionHead index="01" title="个人经历" en="EXPERIENCE" />
        <div className="exp-grid">
          <aside className="exp-card" data-reveal>
            <button
              type="button"
              className="avatar-btn"
              onClick={() => setZoom(true)}
              aria-label="点击放大照片"
              title="点击放大照片"
            >
              <div className="avatar">
                <img className="avatar-img" src="/avatar.png" alt="刘成林证件照" />
              </div>
            </button>
            <p className="avatar-name">{profile.en}</p>
            <h3>{profile.name}</h3>
            <p className="exp-role">{profile.role}</p>
            <p className="exp-intro">
              {profile.intro.map((seg, i) =>
                typeof seg === 'string' ? (
                  <span key={i}>{seg}</span>
                ) : (
                  <span key={i}>
                    {seg.before}
                    <span className="fix-char">{seg.text}</span>
                    {seg.after}
                  </span>
                ),
              )}
            </p>
            <ul className="contact-list">
              <li>
                <span className="c-key">MAIL</span>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </li>
              <li>
                <span className="c-key">TEL</span>
                <a href={`tel:${profile.phoneLink}`}>{profile.phone}</a>
              </li>
              <li>
                <span className="c-key">INFO</span>
                <span>{profile.birthday}</span>
              </li>
            </ul>
            <div className="stat-grid">
              {stats.map((s) => {
                const body = (
                  <>
                    <b className={s.label ? '' : 'stat-text'}>{s.value}</b>
                    {s.label && <span>{s.label}</span>}
                  </>
                )
                return s.target ? (
                  <button
                    type="button"
                    key={s.value}
                    className={`stat clickable${activeId === s.target ? ' is-active' : ''}`}
                    onClick={() => flash(s.target)}
                    title={`查看「${s.label}」对应经历`}
                  >
                    {body}
                  </button>
                ) : (
                  <div className="stat" key={s.value}>
                    {body}
                  </div>
                )
              })}
            </div>
          </aside>
          <div className="exp-timeline">
            <TimelineGroup title="教育背景" items={education} activeId={activeId} />
            <TimelineGroup
              title="实习经历"
              items={experience}
              activeId={activeId}
              onZoom={onZoom}
            />
          </div>
        </div>
      </div>
      {zoom && (
        <div
          className="lightbox"
          onClick={() => setZoom(false)}
          role="dialog"
          aria-modal="true"
          aria-label="照片放大预览"
        >
          <img className="lightbox-img" src="/avatar-full.png" alt="刘成林证件照大图" />
          <p className="lightbox-hint">点击任意处关闭 · ESC</p>
        </div>
      )}
    </section>
  )
}

const COVER_THEMES = [
  { from: '#0e3340', to: '#07161d', glow: '#22d3ee' },
  { from: '#31255c', to: '#120e26', glow: '#a78bfa' },
  { from: '#4a3a1a', to: '#1b1408', glow: '#f59e0b' },
]

function ProjectCover({ project, i }) {
  const theme = COVER_THEMES[i % COVER_THEMES.length]
  const num = String(i + 1).padStart(2, '0')
  return (
    <div className="project-cover" data-reveal>
      <svg viewBox="0 0 800 500" role="img" aria-label={`${project.title} 项目封面占位图`}>
        <defs>
          <linearGradient id={`pc-${i}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={theme.from} />
            <stop offset="100%" stopColor={theme.to} />
          </linearGradient>
          <pattern id={`pg-${i}`} width="42" height="42" patternUnits="userSpaceOnUse">
            <path d="M42 0H0v42" fill="none" stroke="rgba(255,255,255,.07)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="800" height="500" fill={`url(#pc-${i})`} />
        <rect width="800" height="500" fill={`url(#pg-${i})`} />
        <circle cx="660" cy="120" r="170" fill={theme.glow} opacity="0.22" />
        <circle cx="90" cy="430" r="210" fill="none" stroke="rgba(255,255,255,.14)" strokeWidth="1" />
        <text x="48" y="92" fontSize="16" letterSpacing="6" fill="rgba(255,255,255,.5)">
          {project.role.toUpperCase()}
        </text>
        <text x="48" y="452" fontSize="210" fontWeight="800" fill="rgba(255,255,255,.85)">
          {num}
        </text>
      </svg>
      <span className="cover-label">PROJECT {num} · 占位封面（后续替换为真实作品图）</span>
    </div>
  )
}

function Projects({ onZoom }) {
  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHead index="02" title="项目经历" en="SELECTED WORK" />
        <div className="project-list">
          {projects.map((project, i) => {
            const projectGallery = galleryImages(project)
            return (
              <article className="project" key={project.title}>
                {project.galleryCount ? (
                  <div className="project-cover project-gallery" data-reveal>
                    <DepthCarousel
                      items={projectGallery.map((src, gi) => ({
                        image: src,
                        alt: `${project.title} · 图片 ${gi + 1}`,
                      }))}
                      cardWidth={270}
                      cardHeight={380}
                      depth={200}
                      spread={85}
                      tilt={24}
                      tiltDirection="right"
                      perspective={1300}
                      visibleCards={4}
                      falloff={0.22}
                      blur={5}
                      duration={700}
                      autoplay
                      autoplayDelay={3600}
                      loop
                      onZoom={(gi) =>
                        onZoom({ gallery: projectGallery, title: project.title, index: gi })
                      }
                    />
                    <span className="cover-label">
                      PROJECT 0{i + 1} · 点击最前面的卡片可放大查看
                    </span>
                  </div>
                ) : (
                  <ProjectCover project={project} i={i} />
                )}
                <div className="project-body" data-reveal>
                <p className="tag">{project.role}</p>
                <h3>{project.title}</h3>
                <p className="project-meta">
                  {project.org} · {project.period}
                </p>
                <ul>
                  {project.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <div className="chips">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

const ICONS = {
  data: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
      <path d="M4 20v-8M10 20V4M16 20v-5M22 20H2" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
      <circle cx="9" cy="8" r="3.4" />
      <path d="M2.8 19.5c.7-3.3 3.2-5.2 6.2-5.2s5.5 1.9 6.2 5.2" />
      <path d="M15.6 5.1a3.4 3.4 0 0 1 0 5.8M17.3 14.7c2.2.5 3.6 2.1 4.1 4.3" />
    </svg>
  ),
  plan: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6.2" y="3.8" width="11.6" height="16.4" rx="2" />
      <path d="M9.2 3.8V3a1.5 1.5 0 0 1 3 0v.8M9 9.5h6M9 13h4" />
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3.5l1.9 5.1 5.1 1.9-5.1 1.9L12 17.5l-1.9-5.1L5 10.5l5.1-1.9z" />
      <path d="M18.5 16.5l.9 2.3 2.3.9-2.3.9-.9 2.3-.9-2.3-2.3-.9 2.3-.9z" />
    </svg>
  ),
}

function Strengths() {
  return (
    <section id="strengths" className="section">
      <div className="container">
        <SectionHead index="03" title="个人优势" en="STRENGTHS" />
        <div className="strength-grid">
          {strengths.map((s) => (
            <article className="strength" key={s.title} data-reveal>
              <div className="strength-icon">{ICONS[s.icon]}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              {s.note && <p className="strength-note">{s.note}</p>}
            </article>
          ))}
        </div>
        <div className="skills" data-reveal>
          <p className="skills-label">技能与证书</p>
          <p className="skills-note">（都会一点点 🤏，急了也能学！）</p>
          <div className="chips">
            {skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="contact-bg" />
      <div className="container contact-inner">
        <p className="contact-kicker" data-reveal>
          GET IN TOUCH
        </p>
        <h2 data-reveal>
          期待与你一起，
          <br />
          把想法变成增长。
        </h2>
        <div className="contact-actions" data-reveal>
          <a className="contact-email" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <a className="contact-phone" href={`tel:${profile.phoneLink}`}>
            {profile.phone}
          </a>
        </div>
        <div className="contact-btns" data-reveal>
          <a className="btn btn-primary" href={`mailto:${profile.email}`}>
            发邮件给我
          </a>
          <a className="btn btn-ghost" href="#top">
            回到顶部 ↑
          </a>
        </div>
      </div>
      <footer className="footer">
        <div className="container footer-inner">
          <span>© 2026 刘成林 LIU CHENGLIN</span>
          <span>REACT + VITE · PORTFOLIO v0.1</span>
        </div>
      </footer>
    </section>
  )
}

export default function App() {
  useReveal()
  const [zoom, setZoom] = useState(null)

  useEffect(() => {
    if (!zoom) return
    const onKey = (e) => {
      if (e.key === 'Escape') setZoom(null)
      if (e.key === 'ArrowLeft')
        setZoom((z) => z && { ...z, index: (z.index - 1 + z.gallery.length) % z.gallery.length })
      if (e.key === 'ArrowRight')
        setZoom((z) => z && { ...z, index: (z.index + 1) % z.gallery.length })
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [zoom])

  return (
    <>
      <div className="page-bg" aria-hidden="true">
        <SoftAurora
          speed={0.5}
          scale={1.4}
          brightness={0.65}
          color1="#7dd3fc"
          color2="#a78bfa"
          noiseFrequency={2.5}
          noiseAmplitude={0.8}
          bandHeight={0.5}
          bandSpread={1.0}
          octaveDecay={0.12}
          layerOffset={0.6}
          colorSpeed={0.8}
          enableMouseInteraction={false}
        />
      </div>
      <Nav />
      <main>
        <Hero />
        <Experience onZoom={setZoom} />
        <Projects onZoom={setZoom} />
        <Strengths />
      </main>
      <Contact />
      <ImageLightbox zoom={zoom} setZoom={setZoom} />
    </>
  )
}
