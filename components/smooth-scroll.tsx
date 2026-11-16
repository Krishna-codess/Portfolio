"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import "lenis/dist/lenis.css"

let instance: Lenis | null = null

export function scrollToTopSmooth() {
  if (instance) instance.scrollTo(0)
  else window.scrollTo({ top: 0, behavior: "smooth" })
}

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const lenis = new Lenis({ autoRaf: true, anchors: true })
    instance = lenis

    return () => {
      lenis.destroy()
      instance = null
    }
  }, [])

  return null
}
