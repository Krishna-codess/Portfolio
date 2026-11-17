"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { scrollToTopSmooth } from "@/components/smooth-scroll"
import { ChevronLeft, ChevronRight, ExternalLink, Play } from "lucide-react"

type Aspect = "vertical" | "horizontal"

type PortfolioItem = {
  id: string
  video?: string
  file: string
  img: string
  aspect: Aspect
  tag?: string
  title: string
  desc?: string
}

type Category = {
  id: string
  title: string
  items: PortfolioItem[]
}

const categories: Category[] = [
  {
    id: "MOTION_GRAPHICS",
    title: "Motion Graphics",
    items: [
      {
        id: "MG_1",
        video: "/videos/mg1.mp4",
        file: "psychology.AEP",
        img: "/placeholder.svg",
        aspect: "vertical",
        tag: "",
        title: "@byjoshisaac",
        desc: "",
      },
      {
        id: "MG_2",
        video: "/videos/mg2.mp4",
        file: "ai_tools.AEP",
        img: "/placeholder.svg",
        aspect: "vertical",
        //tag: "#SOCIAL #ADS",
        title: "@official.namantomar",
        //desc: "High-converting motion ads for Instagram and TikTok.",
      },
    ],
  },

  {
    id: "TALKING_HEAD",
    title: "Talking Head",
    items: [
      {
        id: "TH_1",
        video: "/videos/talkinghead1.mp4",
        file: "asian_americans.AEP",
        img: "/work-talkinghead.png",
        aspect: "vertical",
        //tag: "asian-american's fear",
        title: "@johnwangofficial",
        //desc: "Clean cuts, engaging b-roll, and dynamic captions for maximum retention.",
      },
      {
        id: "TH_2",
        video: "/videos/talkinghead2.mp4",
        file: "unjob_ai.AEP",
        img: "/placeholder.svg",
        aspect: "vertical",
        //tag: "sample_edit",
        title: "@unjob.ai",
        //desc: "Paced storytelling with layered graphics and sound design.",
      },
    ],
  },

  {
    id: "SAAS",
    title: "SaaS",
    items: [
      {
        id: "SAAS_1",
        video: "/videos/saas1.mp4",
        file: "chatgpt.AEP",
        img: "/work-saas.png",
        aspect: "horizontal",
        //tag: "#UI_ANIMATION #B2B",
        title: "ChatGPT",
        //desc: "Dynamic UI animations making complex software look intuitive.",
      },
      {
        id: "SAAS_2",
        video: "/videos/saas2.mp4",
        file: "FEATURE_UPDATE.AEP",
        img: "/work-saas2.png",
        aspect: "horizontal",
        //tag: "#MOTION #EXPLAINER",
        title: "Feature Explainer",
        desc: "Bite-sized feature walkthroughs designed for conversion.",
      },
    ],
  },

  {
    id: "AI_CREATIVE",
    title: "AI Creative",
    items: [
      {
        id: "AI_1",
        video: "/videos/ai1.mp4",
        file: "real_estate.AEP",
        img: "/placeholder.svg",
        aspect: "vertical",
        //tag: "#AI_VIDEO #POST",
        title: "@kingstyle_homes",
        //desc: "AI-generated visuals refined with professional editing, pacing, sound design, and post-production.",
      },
      {
        id: "AI_2",
        video: "/videos/ai2.mp4",
        file: "commercial.AEP",
        img: "/placeholder.svg",
        aspect: "vertical",
        //tag: "#AI #VFX #POST",
        title: "@officialnamantomar",
        //desc: "Blending AI-generated elements with editing and motion design to create engaging brand content.",
      },
    ],
  },

  {
    id: "COLOUR_GRADING",
    title: "Colour Grading",
    items: [
      {
        id: "CG_1",
        video: "/videos/cg1.mp4",
        file: "GRADE_01.DRP",
        img: "/placeholder.svg",
        aspect: "horizontal",
        //tag: "#COLOR #GRADING",
        title: "Nostalgic golden glow",
        //desc: "Rich color grading for narrative storytelling.",
      },
      {
        id: "CG_2",
        video: "/videos/cg2.mp4",
        file: "GRADE_02.DRP",
        img: "/placeholder.svg",
        aspect: "horizontal",
        //tag: "#CORRECTION #LOOKS",
        title: "Supporting B-roll",
        //desc: "Technical color correction for brand consistency.",
      },
    ],
  },
]

const tools = [
  {
    name: "Premiere Pro",
    code: "PR",
    role: "Editing",
    pct: 95,
    img: "/premiere_icon.jpg",
  },
  {
    name: "After Effects",
    code: "AE",
    role: "Motion FX",
    pct: 92,
    img: "/aftereffects_icon.jpg",
  },
  {
    name: "DaVinci Resolve",
    code: "DR",
    role: "Color",
    pct: 88,
    img: "/davinci_icon.jpg",
  },
  {
    name: "Photoshop",
    code: "PS",
    role: "Graphics",
    pct: 85,
    img: "/photoshop_icon.jpg",
  },
  {
    name: "Figma",
    code: "FG",
    role: "Design",
    pct: 80,
    img: "/figma_icon.jpg",
  },
  {
    name: "Illustrator",
    code: "AI",
    role: "Vector",
    pct: 78,
    img: "/illustrator_icon.jpg",
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// SOCIAL PROOF DATA
// Edit these arrays to swap in real content. The component reads them directly.
// ─────────────────────────────────────────────────────────────────────────────

const testimonials = [
  {
    id: "T1",
    text: "Bro is very sorted with work. I send the footage, explain what I need and that’s pretty much it. No need to keep reminding him about the deadline",
    client: "Naman Tomar",
  },
  {
    id: "T2",
    text: "Honestly didn’t expect the AI shots to look this good. You took the concept and made it feel like an actual brand commercial.",
    client: "kingstyle homes",
  },
  {
    id: "T3",
    text: "The edits are clean and don’t feel unnecessarily flashy. He knows where to add motion and where to just let the content breathe. Really happy with the work.",
    client: "john wang",
  },
  {
    id: "T4",
    text: "I just wanted someone to make my videos look clean and keep the pacing right. Krishna did that really well. One of the reels he edited ended up being my most viewed reel till date, so yeah, definitely happy with the work.",
    client: "Samvit Sudha",
  },
]

const caseStudies = [
  {
    id: "CS1",
    brand: "Samvit Sudha",
    beforeLabel: "BEFORE",
    afterLabel: "AFTER_EDIT",
    beforeViewsNum: 578,
    beforeViewsDisplay: "578",
    afterViewsNum: 633000,
    afterViewsDisplay: "633K",
    growth: "+109,415%",
    metric: "Reach",
    metricVal: "+109,415%",
    reelUrl: "https://www.instagram.com/reel/DY7PqNgIWky/?dlrf=eHh0c3RsOTlxbzU=",
  },
  {
    id: "CS2",
    brand: "byjoshisaac",
    beforeLabel: "BEFORE",
    afterLabel: "AFTER_EDIT",
    beforeViewsNum: 412,
    beforeViewsDisplay: "412",
    afterViewsNum: 19100,
    afterViewsDisplay: "19.1K",
    growth: "+4,536%",
    metric: "Reach",
    metricVal: "+4,536%",
    reelUrl: "https://www.instagram.com/reel/DbzS69Hj5FQ/?obrf=NTBtbDJ6cjI0cjRw",
  },
  {
    id: "CS3",
    brand: "Society adda",
    beforeLabel: "BEFORE",
    afterLabel: "AFTER_EDIT",
    beforeViewsNum: 115,
    beforeViewsDisplay: "115",
    afterViewsNum: 35000,
    afterViewsDisplay: "35K",
    growth: "+30,769%",
    metric: "Reach",
    metricVal: "+30,769%",
    reelUrl: "https://www.instagram.com/reel/DTvNxR6CMgR/?rpxt=Zjd4Mzk1NXd0ODNu",
  },
]

function SocialProof() {
  // ── Testimonials auto-rotate ──────────────────────────────────────────────
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    setIsHovered(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    setIsHovered(false)
    if (touchStartX.current === null || touchEndX.current === null) return
    const diff = touchStartX.current - touchEndX.current
    if (diff > 40) {
      // Swipe left -> next
      setActiveTestimonial((p) => (p + 1) % testimonials.length)
    } else if (diff < -40) {
      // Swipe right -> prev
      setActiveTestimonial(
        (p) => (p - 1 + testimonials.length) % testimonials.length,
      )
    }
    touchStartX.current = null
    touchEndX.current = null
  }

  useEffect(() => {
    if (isHovered) return

    const id = setTimeout(() => {
      setActiveTestimonial((p) => (p + 1) % testimonials.length)
    }, 3000) // 4 seconds

    return () => clearTimeout(id)
  }, [activeTestimonial, isHovered])

  // ── Case study animated view counter ─────────────────────────────────────
  const [activeCase, setActiveCase] = useState(0)
  const [animKey, setAnimKey] = useState(0)
  const [displayBefore, setDisplayBefore] = useState(
    caseStudies[0].beforeViewsDisplay,
  )
  const [displayAfter, setDisplayAfter] = useState(
    caseStudies[0].afterViewsDisplay,
  )

  useEffect(() => {
    const cs = caseStudies[activeCase]
    const beforeTarget = cs.beforeViewsNum
    const startVal = cs.beforeViewsNum
    const endVal = cs.afterViewsNum
    const duration = 900
    const startTime = performance.now()
    let rafId: number

    const animate = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)

      // Count up before number quickly
      const beforeProgress = Math.min(elapsed / 300, 1)
      const beforeEased = 1 - Math.pow(1 - beforeProgress, 3)
      const currentBefore = Math.round(beforeEased * beforeTarget)
      setDisplayBefore(currentBefore.toLocaleString())

      // Animate after counter from beforeViews up to afterViews
      if (progress >= 1) {
        setDisplayAfter(cs.afterViewsDisplay)
      } else {
        const currentAfter = startVal + eased * (endVal - startVal)
        if (currentAfter < 1000) {
          setDisplayAfter(Math.round(currentAfter).toLocaleString())
        } else if (endVal >= 100000) {
          setDisplayAfter(`${Math.round(currentAfter / 1000)}K`)
        } else {
          setDisplayAfter(`${(currentAfter / 1000).toFixed(1)}K`)
        }
      }

      if (progress < 1) {
        rafId = requestAnimationFrame(animate)
      }
    }

    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [activeCase, animKey])

  const pad = (n: number) => String(n).padStart(2, "0")

  return (
    <div className="container">
      <section className="sp-section" id="results">

        {/* ── Section header ─────────────────────────────────────────── */}
        <div className="sp-header">
          <span className="sp-eyebrow">[ RESULTS.LOG ]</span>
          <h2 className="sp-title">
            The Part Where
            <br />
            The Numbers Start{" "}
            <span>Talking.</span>
          </h2>
          <p className="sp-subtitle">
            Here&apos;s what happened after I got my hands on the timeline.
          </p>
        </div>

        {/* ── Testimonials ───────────────────────────────────────────── */}
        <div
          className="sp-testimonials"
          id="testimonials"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <button
            type="button"
            className="testimonial-arrow testimonial-arrow--prev"
            aria-label="Previous testimonial"
            onClick={() =>
              setActiveTestimonial(
                (p) => (p - 1 + testimonials.length) % testimonials.length,
              )
            }
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            className="testimonial-arrow testimonial-arrow--next"
            aria-label="Next testimonial"
            onClick={() =>
              setActiveTestimonial((p) => (p + 1) % testimonials.length)
            }
          >
            <ChevronRight size={16} />
          </button>

          <div className="testimonial-counter-outer">
            {pad(activeTestimonial + 1)} / {pad(testimonials.length)}
          </div>

          <div className="testimonial-track">
            {testimonials.map((t, i) => (
              <blockquote
                key={t.id}
                className={`testimonial-slide${i === activeTestimonial ? " is-active" : ""
                  }`}
              >
                <p className="testimonial-quote">&ldquo;{t.text}&rdquo;</p>
                <footer className="testimonial-client">
                  {"\u2014 "}<strong>{t.client}</strong>
                </footer>
              </blockquote>
            ))}
          </div>

          <div className="testimonial-footer">
            <div
              className="testimonial-dots"
              role="tablist"
              aria-label="Testimonial navigation"
            >
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === activeTestimonial}
                  aria-label={`Testimonial ${i + 1}`}
                  className={`sp-dot${i === activeTestimonial ? " sp-dot-active" : ""
                    }`}
                  onClick={() => setActiveTestimonial(i)}
                />
              ))}
            </div>

            <a href="#case-studies" className="testimonial-redirect-btn">
              <span>VIEW CASE STUDIES</span>
              <span aria-hidden="true">&darr;</span>
            </a>
          </div>
        </div>

        {/* ── Case Studies ───────────────────────────────────────────── */}
        <div className="sp-cases" id="case-studies">
          <span className="sp-divider-label">CASE_STUDIES/</span>

          {/* Brand tabs */}
          <div
            className="case-tabs"
            role="tablist"
            aria-label="Case study brands"
          >
            {caseStudies.map((c, i) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={i === activeCase}
                className={`case-tab${i === activeCase ? " case-tab-active" : ""
                  }`}
                onClick={() => {
                  setActiveCase(i)
                  setAnimKey((k) => k + 1)
                }}
              >
                {c.brand}
              </button>
            ))}
          </div>

          {/* Grid-stack: all panels share one cell → no height shift on switch */}
          <div className="case-panels-wrapper">
            {caseStudies.map((c, i) => (
              <div
                key={c.id}
                className={`case-panel${i === activeCase ? " case-panel-active" : ""
                  }`}
                aria-hidden={i !== activeCase}
              >
                <div className="case-images">

                  {/* ── BEFORE ── */}
                  <div className="case-card case-card-before">
                    <div
                      className="window-header"
                      style={{ background: "#222", color: "#555" }}
                    >
                      <span>{c.beforeLabel}</span>
                      <div className="window-controls">
                        <button className="window-btn" aria-label="Minimize">
                          <span className="minimize-icon" />
                        </button>
                        <button className="window-btn" aria-label="Maximize">
                          <span className="maximize-icon" />
                        </button>
                        <button
                          className="window-btn window-close"
                          aria-label="Close"
                        >
                          <span className="close-icon" />
                        </button>
                      </div>
                    </div>
                    <div className="case-card-body">
                      <div className="case-card-badge">BEFORE</div>
                      <div className="case-stat-block">
                        <span className="case-stat-label">INITIAL VIEWS</span>
                        <span className="case-stat-num case-stat-num--before">
                          {i === activeCase
                            ? displayBefore
                            : c.beforeViewsDisplay}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ── Growth badge ── */}
                  <div className="case-growth-badge">
                    <span className="case-growth-arrow">&rarr;</span>
                    <span className="case-growth-pct">{c.growth || c.metricVal}</span>
                  </div>

                  {/* ── AFTER ── */}
                  <div className="case-card case-card-after">
                    <div
                      className="window-header"
                      style={{
                        background: "var(--accent-retro)",
                        color: "var(--bg-color)",
                      }}
                    >
                      <span>{c.afterLabel}</span>
                      <div className="window-controls">
                        <button className="window-btn" aria-label="Minimize">
                          <span className="minimize-icon" />
                        </button>
                        <button className="window-btn" aria-label="Maximize">
                          <span className="maximize-icon" />
                        </button>
                        <button
                          className="window-btn window-close"
                          aria-label="Close"
                        >
                          <span className="close-icon" />
                        </button>
                      </div>
                    </div>
                    <div className="case-card-body">
                      <div className="case-card-top-row">
                        <div className="case-card-badge case-card-badge--after">
                          AFTER
                        </div>
                        {c.reelUrl && (
                          <a
                            href={c.reelUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="case-card-reel-btn"
                          >
                            <Play size={10} fill="currentColor" />
                            <span>WATCH REEL</span>
                            <ExternalLink size={11} />
                          </a>
                        )}
                      </div>
                      <div className="case-stat-block">
                        <span className="case-stat-label">AFTER COLLAB</span>
                        <span className="case-stat-num case-stat-num--after">
                          {i === activeCase
                            ? displayAfter
                            : c.afterViewsDisplay}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Supporting metric & viral reel link */}
                <div className="case-metric-row">
                  <div className="case-metric-chip">
                    <span className="case-metric-name">{c.metric}</span>
                    <span className="case-metric-val">{c.metricVal}</span>
                  </div>
                  {c.reelUrl && (
                    <a
                      href={c.reelUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="case-reel-btn"
                    >
                      <Play size={12} fill="currentColor" />
                      <span>WATCH VIRAL REEL</span>
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>
    </div>
  )
}

function ReelCard({ item }: { item: PortfolioItem }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = true
    video.defaultMuted = true
    video.playsInline = true

    const handleUnmuteEvent = (e: Event) => {
      const customEvent = e as CustomEvent<string>
      if (customEvent.detail !== item.id && videoRef.current) {
        videoRef.current.muted = true
        setIsMuted(true)
      }
    }

    window.addEventListener("video-unmuted", handleUnmuteEvent)
    return () => {
      window.removeEventListener("video-unmuted", handleUnmuteEvent)
    }
  }, [item.id])

  useEffect(() => {
    const card = cardRef.current
    const video = videoRef.current
    if (!card || !video) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Autoplay as soon as you get to this section / card is in view
            video
              .play()
              .then(() => setIsPlaying(true))
              .catch(() => {
                video.muted = true
                video
                  .play()
                  .then(() => setIsPlaying(true))
                  .catch(() => { })
              })
          } else {
            video.pause()
            setIsPlaying(false)
          }
        })
      },
      {
        threshold: 0.15,
        rootMargin: "80px 0px 80px 0px",
      }
    )

    observer.observe(card)
    return () => observer.disconnect()
  }, [])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => { })
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    const video = videoRef.current
    if (!video) return
    const nextMuted = !video.muted
    video.muted = nextMuted
    setIsMuted(nextMuted)
    if (!nextMuted) {
      window.dispatchEvent(
        new CustomEvent("video-unmuted", { detail: item.id })
      )
    }
  }

  const handleFullscreen = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation()
    const video = videoRef.current as any
    if (!video) return
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => { })
    } else if (video.requestFullscreen) {
      video.requestFullscreen().catch(() => { })
    } else if (video.webkitEnterFullscreen) {
      video.webkitEnterFullscreen()
    }
  }

  return (
    <div className="project-card" key={item.id} ref={cardRef}>
      <div
        className="window-header"
        style={{
          background: "#333",
          color: "#fff",
        }}
      >
        <span>{item.file}</span>

        <div className="window-controls">
          <button className="window-btn" aria-label="Minimize">
            <span className="minimize-icon"></span>
          </button>
          <button className="window-btn" aria-label="Maximize">
            <span className="maximize-icon"></span>
          </button>
          <button className="window-btn window-close" aria-label="Close">
            <span className="close-icon"></span>
          </button>
        </div>
      </div>

      <div
        className={`project-media ${item.aspect === "horizontal" ? "media-horizontal" : "media-vertical"
          }`}
        onClick={togglePlay}
        style={{ cursor: "pointer" }}
      >
        <video
          ref={videoRef}
          src={item.video}
          poster={item.img}
          className="project-img"
          muted
          loop
          playsInline
          preload="metadata"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        <div className="video-overlay-controls">
          <div className="video-status-badge">
            <span
              className={`status-indicator ${isPlaying ? "is-playing" : ""}`}
            />
            <span>{isPlaying ? "PLAYING" : "PAUSED"}</span>
          </div>

          <div className="video-action-buttons">
            <button
              type="button"
              className="video-control-btn"
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
              title={isMuted ? "Unmute audio" : "Mute audio"}
            >
              {isMuted ? "🔇" : "🔊"}
            </button>

            <button
              type="button"
              className="video-control-btn video-fullscreen-btn"
              onClick={handleFullscreen}
              aria-label="Fullscreen"
              title="Fullscreen"
            >
              ⛶
            </button>
          </div>
        </div>
      </div>

      <div className="project-info">
        {item.tag && <span className="project-tag">{item.tag}</span>}
        <h3 className="project-title">{item.title}</h3>
        {item.desc && (
          <p
            style={{
              fontSize: "0.8rem",
              color: "var(--text-secondary)",
              lineHeight: 1.5,
            }}
          >
            {item.desc}
          </p>
        )}
      </div>
    </div>
  )
}

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [starburstVisible, setStarburstVisible] = useState(true)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  useEffect(() => {
    function updateClock() {
      const now = new Date()

      const timeStr =
        now.getHours().toString().padStart(2, "0") +
        ":" +
        now.getMinutes().toString().padStart(2, "0") +
        ":" +
        now.getSeconds().toString().padStart(2, "0")

      const statusElements = document.querySelectorAll(
        ".system-status, .mobile-system-status",
      )

      statusElements.forEach((el) => {
        el.textContent = `RENDER: ${timeStr} | GPU: ${Math.floor(Math.random() * 20) + 40}%`
      })
    }

    updateClock()

    const interval = setInterval(updateClock, 1000)

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      clearInterval(interval)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Starburst visibility: visible on hero, hidden between #work and before #results,
  // visible during #results, hidden after #results
  useEffect(() => {
    const heroSection = document.querySelector(".hero-section-wrapper") as Element | null
    const workSection = document.querySelector("#work") as Element | null
    const resultsSection = document.querySelector("#results") as Element | null
    const afterResultsSection = document.querySelector(".marquee-container") as Element | null

    if (!heroSection || !workSection || !resultsSection) return

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = (entry.target as HTMLElement).dataset.starburstId

          if (id === "hero") {
            if (entry.isIntersecting) setStarburstVisible(true)
          } else if (id === "work") {
            // when #work enters => hide; when #work exits going back up => show
            if (entry.isIntersecting) {
              setStarburstVisible(false)
            } else if (entry.boundingClientRect.top > 0) {
              // exiting upward (scrolling back to hero)
              setStarburstVisible(true)
            }
          } else if (id === "results") {
            if (entry.isIntersecting) {
              setStarburstVisible(true)
            } else if (entry.boundingClientRect.top > 0) {
              // results left the viewport by scrolling back up
              setStarburstVisible(false)
            } else {
              // results left the viewport by scrolling down past it
              setStarburstVisible(false)
            }
          }
        })
      },
      { threshold: 0.05 }
    )

      ; (heroSection as HTMLElement).dataset.starburstId = "hero"
      ; (workSection as HTMLElement).dataset.starburstId = "work"
      ; (resultsSection as HTMLElement).dataset.starburstId = "results"

    sectionObserver.observe(heroSection)
    sectionObserver.observe(workSection)
    sectionObserver.observe(resultsSection)

    return () => sectionObserver.disconnect()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("visible", entry.isIntersecting)
        })
      },
      {
        threshold: [0, 0.1],
      }
    )

    const sections = document.querySelectorAll(".animate-on-scroll")

    sections.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const scrollToTop = () => {
    scrollToTopSmooth()
  }

  return (
    <>
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="scroll-to-top"
          aria-label="Scroll to top"
        >
          <span className="scroll-arrow">↑</span>
        </button>
      )}

      {/* FIXED STARBURST BACKGROUND GRAPHIC */}
      <div
        className={`hero-visual${starburstVisible ? "" : " hero-visual--hidden"}`}
        aria-hidden="true"
      >
        <div className="hero-starburst-wrapper">
          <Image
            src="/starburst.png"
            alt=""
            width={736}
            height={744}
            priority
            className="hero-starburst"
          />
        </div>
      </div>

      <header>
        <div className="container header-inner">
          <div className="logo">krishnaaa.fx</div>

          <button
            type="button"
            className="mobile-nav-toggle"
            aria-label={mobileNavOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
          >
            <span>{mobileNavOpen ? "[ ✕ CLOSE ]" : "[ ☰ MENU ]"}</span>
          </button>

          <nav className={`nav-links ${mobileNavOpen ? "is-open" : ""}`}>
            <a href="#work" onClick={() => setMobileNavOpen(false)}>
              WORK
            </a>
            <a href="#case-studies" onClick={() => setMobileNavOpen(false)}>
              TESTIMONIALS
            </a>
            <a href="#tools" onClick={() => setMobileNavOpen(false)}>
              TOOLKIT
            </a>
            <a href="#contact" onClick={() => setMobileNavOpen(false)}>
              CONTACT
            </a>
            <div className="mobile-system-status">
              RENDER: 00:00:00 | GPU: 42%
            </div>
          </nav>

          <div className="system-status">
            RENDER: 00:00:00 | GPU: 42%
          </div>
        </div>
      </header>

      <div className="container">
        {/* HERO */}
        <section className="hero">
          <div className="hero-content">
            <p
              style={{
                color: "var(--accent-retro)",
                marginBottom: "10px",
              }}
            >
              {"[ LOADING TIMELINE... ]"}
            </p>

            <h1>
              Video Editor &amp; <span>Motion</span> Designer
            </h1>

            <p>
              I take raw footage, add some questionable amounts of
              keyframes, and turn it into something people actually
              stop scrolling for.
            </p>

            <a href="#work" className="btn-retro">
              WATCH REELS ↓
            </a>
          </div>
        </section>

        {/* STATS */}
        <div className="stats-bar">
          <div className="stat-item">
            <div className="stat-val">01+</div>
            <div className="stat-label">Year Editing</div>
          </div>

          <div className="stat-item">
            <div className="stat-val">100+</div>
            <div className="stat-label">Videos Cut</div>
          </div>

          <div className="stat-item">
            <div className="stat-val">10M+</div>
            <div className="stat-label">Views Driven</div>
          </div>

          <div className="stat-item">
            <div className="stat-val">48h</div>
            <div className="stat-label">Avg Turnaround</div>
          </div>
        </div>

        {/* WORK / EDIT SUITE */}
        <section id="work">
          <h2 className="section-title">Edit Suite</h2>

          <div className="categories-wrapper">
            {categories.map((category) => (
              <div
                key={category.id}
                className="category-section animate-on-scroll"
              >
                <h3 className="category-title">
                  {category.title}
                </h3>

                <div className="portfolio-grid-2">
                  {category.items.map((item) => (
                    <ReelCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TOOLKIT */}
        <section id="tools">
          <h2 className="section-title">The Toolkit</h2>

          <div className="tools-grid">
            {tools.map((tool) => (
              <div className="tool-card" key={tool.code}>
                <div
                  className="tool-badge"
                  style={{
                    padding: 0,
                    overflow: "hidden",
                    border: "none",
                  }}
                >
                  <Image
                    src={tool.img}
                    alt={tool.name}
                    style={{
                      width: "110%",
                      height: "110%",
                      objectFit: "cover",
                    }}
                    width={100}
                    height={100}
                  />
                </div>

                <div className="tool-meta">
                  <h3 className="tool-name">
                    {tool.name}
                  </h3>

                  <span className="tool-role">
                    {tool.role}
                  </span>

                  <div className="tool-bar">
                    <div
                      className="tool-bar-fill"
                      style={{
                        width: `${tool.pct}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* MARQUEE */}
      <div className="marquee-container">
        <div className="marquee-text">
          <span>SHORT FORM • </span>
          <span>SAAS • </span>
          <span>TALKING HEAD • </span>
          <span>AI CREATIVE • </span>
          <span>COLOUR GRADING • </span>
          <span>MOTION GRAPHICS • </span>

          <span>SHORT FORM • </span>
          <span>SAAS • </span>
          <span>TALKING HEAD • </span>
          <span>AI CREATIVE • </span>
          <span>COLOUR GRADING • </span>
          <span>MOTION GRAPHICS • </span>
        </div>
      </div>

      <SocialProof />

      <div className="container">
        {/* FOOTER */}
        <footer id="contact">
          <div className="footer-logo">
            <p
              style={{
                color: "var(--accent-retro)",
                fontSize: "0.8rem",
                marginBottom: "10px",
              }}
            >
              LET&apos;S EDIT
            </p>

            <h2>
              KRISHNAAA.
              <br />
              FX©
            </h2>
          </div>

          <div style={{ textAlign: "right" }}>
            <a
              href="https://wa.me/917007015965?text=Hey!%20I%20came%20across%20your%20portfolio%20and%20I'm%20interested%20in%20working%20with%20you."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-retro"
              style={{ marginBottom: "20px" }}
            >
              I&apos;M READY TO START
            </a>

            <p className="copyright">
              EDITED FRAME BY FRAME. ALL RIGHTS RESERVED.
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}