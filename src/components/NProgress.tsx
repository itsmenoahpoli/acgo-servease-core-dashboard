import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.08,
})

const primaryColor = '#FF385C'

if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = `
    #nprogress .bar {
      background: ${primaryColor} !important;
      height: 3px !important;
    }
    #nprogress .peg {
      box-shadow: 0 0 10px ${primaryColor}, 0 0 5px ${primaryColor} !important;
    }
  `
  if (!document.getElementById('nprogress-style')) {
    style.id = 'nprogress-style'
    document.head.appendChild(style)
  }
}

export function NProgressBar() {
  const location = useLocation()

  useEffect(() => {
    NProgress.start()

    const timer = setTimeout(() => {
      NProgress.done()
    }, 300)

    return () => {
      clearTimeout(timer)
      NProgress.done()
    }
  }, [location.pathname])

  return null
}

