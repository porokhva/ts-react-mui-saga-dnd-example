import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export const Portal: React.FC<{ selector: string }> = ({ children, selector }) => {
  const ref = useRef()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    ref.current = document.querySelector(selector)

    setMounted(true)
  }, [selector])

  return mounted ? createPortal(children, ref.current) : null
}
