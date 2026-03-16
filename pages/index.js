import { useEffect, useRef } from 'react'
import Head from 'next/head'

const STATS = [
  { value: 97,  suffix: '%', label: 'Client Retention',   sub: 'Clients keep coming back' },
  { value: 150, suffix: '+', label: 'Projects Delivered', sub: 'Across 12+ industries'    },
  { value: 48,  suffix: 'H', label: 'Avg Turnaround',     sub: 'From brief to prototype'  },
  { value: 4.9, suffix: '★', label: 'Average Rating',     sub: 'On all platforms'         },
]

const SERVICES = [
  { num: '01', icon: '◈', title: 'Web Development',  desc: 'Performant websites and web apps built with Next.js, React, and modern tooling.'   },
  { num: '02', icon: '⬡', title: 'UI / UX Design',   desc: 'Interfaces crafted to convert — built from Figma designs to pixel-perfect code.'   },
  { num: '03', icon: '◉', title: 'E-Commerce',        desc: 'Shopify and WooCommerce stores engineered to drive real, measurable revenue.'       },
  { num: '04', icon: '◆', title: 'Performance',       desc: 'Core Web Vitals, Lighthouse scores, and speed optimisation that Google rewards.'    },
]

export default function Home() {
  const navRef       = useRef(null)
  const badgeRef     = useRef(null)
  const line1Ref     = useRef([])
  const line2Ref     = useRef([])
  const visualRef    = useRef(null)   // scroll + float target
  const statsRef     = useRef([])
  const floatCardsRef = useRef([])
  const sectionRef   = useRef(null)
  const headingRef   = useRef(null)
  const cardsRef     = useRef([])
  const ctaRef       = useRef(null)
  const cursorRef    = useRef(null)
  const trailRef     = useRef(null)
  const progressRef  = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    let gsap, ST, ctx

    const run = async () => {
      const g  = await import('gsap')
      const st = await import('gsap/ScrollTrigger')
      gsap = g.gsap
      ST   = st.ScrollTrigger
      gsap.registerPlugin(ST)

      ctx = gsap.context(() => {

        /* ── NAV ── */
        gsap.fromTo(navRef.current,
          { y: -30, opacity: 0 },
          { y: 0, opacity: 1, duration: .8, ease: 'power3.out', delay: .1 }
        )

        /* ── INTRO TIMELINE ── */
        const tl = gsap.timeline({ delay: .3 })

        // Badge
        tl.to(badgeRef.current, { opacity: 1, y: 0, duration: .5, ease: 'power3.out' })

        // Line 1: WELCOME
        tl.to(line1Ref.current, {
          opacity: 1, y: '0%', duration: .6, stagger: .04, ease: 'power3.out',
        }, '-=.15')

        // Line 2: ITZFIZZ
        tl.to(line2Ref.current, {
          opacity: 1, y: '0%', duration: .6, stagger: .05, ease: 'power3.out',
        }, '-=.4')

        // Visual orb
        tl.fromTo(visualRef.current,
          { opacity: 0, scale: .75 },
          { opacity: 1, scale: 1, duration: .9, ease: 'elastic.out(1, .85)' },
          '-=.5'
        )

        // Stats
        tl.to(statsRef.current, {
          opacity: 1, y: 0, duration: .5, stagger: .08, ease: 'power3.out',
        }, '-=.3')

        /* ── COUNTERS ── */
        statsRef.current.forEach((el, i) => {
          if (!el) return
          const numEl = el.querySelector('.stat-val')
          if (!numEl) return
          const target = STATS[i].value
          const isDecimal = target % 1 !== 0
          const proxy = { val: 0 }
          gsap.to(proxy, {
            val: target, duration: 2.2, delay: 1 + i * .1, ease: 'power2.out',
            onUpdate() {
              numEl.textContent = isDecimal ? proxy.val.toFixed(1) : Math.round(proxy.val)
            },
          })
        })

        /* ── SCROLL: visual moves up (tied to scroll, not time) ── */
        gsap.to(visualRef.current, {
          y: -140,
          scale: .82,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        })

        /* ── SCROLL: headline letters scatter ── */
        const allLetters = [...line1Ref.current, ...line2Ref.current]
        allLetters.forEach((el, i) => {
          if (!el) return
          gsap.to(el, {
            y: -(60 + i * 4),
            x: (i % 2 === 0 ? -1 : 1) * (i * 3),
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: '45% top',
              scrub: true,
            },
          })
        })

        /* ── SCROLL: stats fade ── */
        gsap.to(statsRef.current, {
          opacity: 0, y: -20, ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: '15% top',
            end: '45% top',
            scrub: true,
          },
        })

        /* ── FLOAT (continuous, separate from scroll y) ── */
        gsap.to(visualRef.current, {
          y: '+=14',
          duration: 3,
          repeat: -1, yoyo: true,
          ease: 'sine.inOut',
        })

        /* ── BELOW FOLD: heading ── */
        gsap.to(headingRef.current, {
          opacity: 1, y: 0, duration: .8, ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        })

        /* ── BELOW FOLD: cards ── */
        gsap.to(cardsRef.current, {
          opacity: 1, y: 0, duration: .65, stagger: .1, ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current[0],
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        })

        /* ── CTA ── */
        gsap.to(ctaRef.current, {
          opacity: 1, y: 0, duration: .75, ease: 'back.out(1.3)',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        })

        /* ── NAV scroll effect ── */
        ST.create({
          trigger: 'body',
          start: '80px top',
          onEnter: () => navRef.current?.classList.add('scrolled'),
          onLeaveBack: () => navRef.current?.classList.remove('scrolled'),
        })

      }) // end context
    }

    run()

    /* ── CURSOR ── */
    const cursor = cursorRef.current
    const trail  = trailRef.current
    let tx = 0, ty = 0, raf
    const onMove = (e) => {
      if (cursor) {
        cursor.style.left = e.clientX + 'px'
        cursor.style.top  = e.clientY + 'px'
      }
      tx = e.clientX; ty = e.clientY
    }
    let trx = 0, try_ = 0
    const loop = () => {
      trx += (tx - trx) * .1
      try_ += (ty - try_) * .1
      if (trail) { trail.style.left = trx + 'px'; trail.style.top = try_ + 'px' }
      raf = requestAnimationFrame(loop)
    }
    const onEnter = () => cursor && cursor.classList.add('hovered')
    const onLeave = () => cursor && cursor.classList.remove('hovered')
    const links = [...document.querySelectorAll('a, button')]
    document.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(loop)
    links.forEach(el => { el.addEventListener('mouseenter', onEnter); el.addEventListener('mouseleave', onLeave) })

    /* ── SCROLL PROGRESS ── */
    const bar = progressRef.current
    const onScroll = () => {
      if (!bar) return
      const p = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
      bar.style.transform = `scaleX(${p})`
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      ctx && ctx.revert()
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      links.forEach(el => { el.removeEventListener('mouseenter', onEnter); el.removeEventListener('mouseleave', onLeave) })
    }
  }, [])

  const WORD1 = 'WELCOME'.split('')
  const WORD2 = 'ITZFIZZ'.split('')

  return (
    <>
      <Head>
        <title>Itzfizz Digital</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Cursor */}
      <div id="cursor"       ref={cursorRef} />
      <div id="cursor-trail" ref={trailRef}  />

      {/* Progress bar */}
      <div id="progress" ref={progressRef} />

      {/* ─── NAV ──────────────────────────────────── */}
      <nav id="nav" ref={navRef} style={{ opacity: 0 }}>
        <div className="logo">
          <div className="logo-mark">IF</div>
          <span className="logo-text">Itzfizz</span>
        </div>
        <div className="nav-links">
          {['Work', 'Services', 'About', 'Contact'].map(n => (
            <a key={n} href="#" className="nav-a">{n}</a>
          ))}
        </div>
        <button className="nav-btn">Get Started</button>
      </nav>

      {/* ─── HERO ─────────────────────────────────── */}
      <section id="hero" ref={sectionRef}>

        {/* Badge row */}
        <div id="badge" ref={badgeRef}>
          <div className="badge-inner">
            <span className="badge-dot" />
            Digital Creative Studio — Est. 2020
          </div>
        </div>

        {/* Headline: WELCOME on one line, ITZFIZZ on next */}
        <div id="headline">
          <div className="hl-word">
            {WORD1.map((ch, i) => (
              <span key={i} ref={el => (line1Ref.current[i] = el)}>{ch}</span>
            ))}
          </div>
          <div className="hl-word gold">
            {WORD2.map((ch, i) => (
              <span key={i} ref={el => (line2Ref.current[i] = el)}>{ch}</span>
            ))}
          </div>
        </div>

        {/* Central visual — browser dashboard mockup */}
        <div id="visual-wrap">
          <div id="visual" ref={visualRef} style={{ opacity: 0 }}>

            {/* Glow behind the card */}
            <div className="vis-glow" />

            {/* Browser window */}
            <div className="vis-browser">
              {/* Chrome bar */}
              <div className="vis-chrome">
                <div className="vis-dots">
                  <span style={{background:'#ff5f57'}}/>
                  <span style={{background:'#febc2e'}}/>
                  <span style={{background:'#28c840'}}/>
                </div>
                <div className="vis-url">itzfizz.digital</div>
                <div className="vis-icons">
                  <span className="vis-icon-btn">↻</span>
                  <span className="vis-icon-btn">⋮</span>
                </div>
              </div>

              {/* Dashboard content */}
              <div className="vis-body">

                {/* Top KPI strip */}
                <div className="vis-kpi-row">
                  {[
                    { label: 'Revenue',    val: '$128K', delta: '+24%', up: true  },
                    { label: 'Sessions',   val: '84.2K', delta: '+67%', up: true  },
                    { label: 'Bounce',     val: '18.4%', delta: '-3%',  up: false },
                  ].map((k, i) => (
                    <div key={i} className="vis-kpi">
                      <div className="vis-kpi-label">{k.label}</div>
                      <div className="vis-kpi-val">{k.val}</div>
                      <div className={`vis-kpi-delta ${k.up ? 'up' : 'down'}`}>{k.delta}</div>
                    </div>
                  ))}
                </div>

                {/* Chart area */}
                <div className="vis-chart">
                  <div className="vis-chart-label">Monthly Performance</div>
                  <div className="vis-bars">
                    {[38,52,44,68,58,80,70,88,74,96,82,100].map((h, i) => (
                      <div key={i} className="vis-bar-wrap">
                        <div className="vis-bar" style={{
                          height: `${h}%`,
                          background: i === 11
                            ? 'linear-gradient(to top, var(--gold), var(--gold2))'
                            : i >= 9
                            ? 'rgba(212,168,67,0.55)'
                            : 'rgba(212,168,67,0.2)',
                          boxShadow: i === 11 ? '0 0 12px rgba(212,168,67,0.5)' : 'none',
                        }} />
                      </div>
                    ))}
                  </div>
                  {/* X axis labels */}
                  <div className="vis-chart-months">
                    {['J','F','M','A','M','J','J','A','S','O','N','D'].map((m,i) => (
                      <span key={i}>{m}</span>
                    ))}
                  </div>
                </div>

                {/* Bottom row */}
                <div className="vis-bottom">
                  <div className="vis-activity">
                    <div className="vis-activity-title">Recent Activity</div>
                    {[
                      { dot: 'var(--gold)',  text: 'New client onboarded', time: '2m ago'  },
                      { dot: 'var(--blue)',  text: 'Deploy successful',    time: '14m ago' },
                      { dot: '#28c840',      text: 'Performance +18%',     time: '1h ago'  },
                    ].map((a, i) => (
                      <div key={i} className="vis-activity-row">
                        <span className="vis-act-dot" style={{ background: a.dot, boxShadow: `0 0 6px ${a.dot}` }} />
                        <span className="vis-act-text">{a.text}</span>
                        <span className="vis-act-time">{a.time}</span>
                      </div>
                    ))}
                  </div>

                  <div className="vis-score">
                    <div className="vis-score-title">Lighthouse</div>
                    <div className="vis-score-ring">
                      <svg viewBox="0 0 60 60" className="vis-score-svg">
                        <circle cx="30" cy="30" r="24" fill="none" stroke="rgba(212,168,67,0.12)" strokeWidth="4"/>
                        <circle cx="30" cy="30" r="24" fill="none" stroke="var(--gold)" strokeWidth="4"
                          strokeDasharray="150.8" strokeDashoffset="15"
                          strokeLinecap="round" transform="rotate(-90 30 30)"/>
                      </svg>
                      <div className="vis-score-num">98</div>
                    </div>
                    <div className="vis-score-label">Performance</div>
                  </div>
                </div>

              </div>
            </div>

            {/* Reflection */}
            <div className="vis-reflection" />

          </div>
        </div>

        {/* Stats */}
        <div id="stats">
          {STATS.map((s, i) => (
            <div key={i} ref={el => (statsRef.current[i] = el)} className="stat-item">
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px', justifyContent: 'center' }}>
                <span className="stat-val">0</span>
                <span className="stat-suffix">{s.suffix}</span>
              </div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-sub">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div id="scroll-ind">
          <div className="scroll-mouse">
            <div className="scroll-wheel" />
          </div>
          <span className="scroll-text">Scroll</span>
        </div>
      </section>

      {/* ─── SERVICES ─────────────────────────────── */}
      <section id="services">
        <p className="section-eyebrow">What We Do</p>
        <h2 ref={headingRef} className="section-heading">
          We build digital<br /><em>experiences</em>
        </h2>
        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <div key={i} ref={el => (cardsRef.current[i] = el)} className="svc-card">
              <div className="svc-num">
                <span>{s.num}</span>
                <span className="svc-icon">{s.icon}</span>
              </div>
              <div className="svc-title">{s.title}</div>
              <div className="svc-desc">{s.desc}</div>
              <div className="svc-line" />
              <a href="#" className="svc-more">Learn more →</a>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────── */}
      <section id="cta-section" ref={ctaRef}>
        <p className="section-eyebrow" style={{ textAlign: 'center' }}>Let&apos;s Talk</p>
        <h2 className="cta-heading">Ready to build something<br />extraordinary?</h2>
        <p className="cta-sub">
          Tell us about your project. We&apos;ll get back to you within 24 hours with a plan.
        </p>
        <div className="btn-row">
          <button className="btn-gold">Start a Project</button>
          <button className="btn-ghost">View Portfolio</button>
        </div>
      </section>

      {/* ─── FOOTER ───────────────────────────────── */}
      <footer>
        <span>© 2024 Itzfizz Digital. All rights reserved.</span>
        <span>Built with Next.js · GSAP · Tailwind</span>
      </footer>
    </>
  )
}
