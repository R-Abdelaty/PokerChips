import { useCallback, useEffect, useRef, useState } from 'react'

const HINT_DURATION = 1800
const INITIAL_HINT_DURATION = 2400

export default function useHoldHint(initialTarget = null) {
  const [hint, setHint] = useState(
    initialTarget ? { target: initialTarget, id: 0 } : null,
  )
  const completedRef = useRef(false)
  const hintIdRef = useRef(0)
  const hintTimeoutRef = useRef(null)

  const hideHint = useCallback(() => {
    clearTimeout(hintTimeoutRef.current)
    setHint(null)
  }, [])

  const showHint = useCallback((target) => {
    clearTimeout(hintTimeoutRef.current)
    hintIdRef.current += 1
    setHint({ target, id: hintIdRef.current })
    hintTimeoutRef.current = setTimeout(() => setHint(null), HINT_DURATION)
  }, [])

  useEffect(() => {
    if (initialTarget) {
      hintTimeoutRef.current = setTimeout(
        () => setHint(null),
        INITIAL_HINT_DURATION,
      )
    }

    return () => clearTimeout(hintTimeoutRef.current)
  }, [initialTarget])

  const beginHold = useCallback((event, setHolding) => {
    if (event.currentTarget.setPointerCapture) {
      event.currentTarget.setPointerCapture(event.pointerId)
    }
    completedRef.current = false
    hideHint()
    setHolding(true)
  }, [hideHint])

  const completeHold = useCallback(() => {
    completedRef.current = true
    hideHint()
  }, [hideHint])

  const endHold = useCallback((setHolding, target) => {
    setHolding(false)
    if (!completedRef.current) showHint(target)
  }, [showHint])

  return { hint, beginHold, completeHold, endHold }
}
