import { useEffect, useRef, useState } from 'react'
import AnalysisCard from '../components/AnalysisCard'
import EmailCard from '../components/EmailCard'
import HeroSection from '../components/HeroSection'
import LoadingSpinner from '../components/LoadingSpinner'
import UrlAnalyzerForm from '../components/UrlAnalyzerForm'
import { analyzeWebsite } from '../services/api'

const HomePage = () => {
  const [url, setUrl] = useState('')
  const [result, setResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const resultsRef = useRef(null)

  useEffect(() => {
    document.title = 'Apex Leads | AI Lead Generation'
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!url.trim()) {
      setError('Enter a website URL to start the analysis.')
      return
    }

    setIsLoading(true)
    setError('')
    setCopied(false)

    try {
      const response = await analyzeWebsite(url.trim())
      setResult(response.data)
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 120)
    } catch (err) {
      setResult(null)
      setError(err.response?.data?.detail || 'We could not analyze that website. Please try again in a moment.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = async () => {
    if (!result?.email) return

    try {
      await navigator.clipboard.writeText(result.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="home-page">
      <HeroSection />

      <section className="analysis-panel">
        <div className="panel-heading">
          <p className="eyebrow">Quick analysis</p>
          <h2>Paste a target website and capture an instant lead brief.</h2>
        </div>

        <UrlAnalyzerForm
          url={url}
          setUrl={setUrl}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          error={error}
        />

        {isLoading ? <LoadingSpinner /> : null}

        {result ? (
          <section className="results-section" ref={resultsRef}>
            <div className="results-header">
              <div>
                <p className="eyebrow">Analysis ready</p>
                <h3>Lead intelligence generated</h3>
              </div>
              <p className="results-subtext">Use the insights below to personalize your outreach with confidence.</p>
            </div>

            <div className="results-grid">
              <AnalysisCard result={result} />
              <EmailCard email={result.email} onCopy={handleCopy} copied={copied} />
            </div>
          </section>
        ) : null}
      </section>
    </div>
  )
}

export default HomePage
