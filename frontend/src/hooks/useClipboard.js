import { useCallback, useEffect, useRef, useState } from 'react'

const useClipboard = (resetDelay = 2000) => {
  const [copiedValue, setCopiedValue] = useState('')
  const timeoutRef = useRef(null)

  const copyToClipboard = useCallback(
    async (value) => {
      if (!value) return false

      try {
        await navigator.clipboard.writeText(value)
        setCopiedValue(value)

        if (timeoutRef.current) {
          window.clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = window.setTimeout(() => {
          setCopiedValue('')
        }, resetDelay)

        return true
      } catch {
        setCopiedValue('')
        return false
      }
    },
    [resetDelay],
  )

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return { copiedValue, copyToClipboard }
}

export default useClipboard
