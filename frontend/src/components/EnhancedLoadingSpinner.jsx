import { useState, useEffect } from 'react'

const EnhancedLoadingSpinner = () => {
  const [step, setStep] = useState(0)

  const messages = [
    'Analyzing Website...',
    'Finding Opportunities...',
    'Generating Outreach Email...',
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % messages.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="enhanced-loading" role="status" aria-live="polite">
      <div className="loading-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="loading-messages">
        {messages.map((msg, idx) => (
          <p
            key={idx}
            className={`loading-message ${step === idx ? 'active' : ''}`}
          >
            {msg}
          </p>
        ))}
      </div>
    </div>
  )
}

export default EnhancedLoadingSpinner
