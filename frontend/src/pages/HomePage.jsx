import { useEffect, useRef, useState } from 'react'
import ContactEmailsCard from '../components/ContactEmailsCard'
import ContactPhonesCard from '../components/ContactPhonesCard'
import EmailCard from '../components/EmailCard'
import ErrorAlert from '../components/ErrorAlert'
import EnhancedLoadingSpinner from '../components/EnhancedLoadingSpinner'
import HeroSection from '../components/HeroSection'
import IssuesGrid from '../components/IssuesGrid'
import RecommendationsGrid from '../components/RecommendationsGrid'
import SummaryCards from '../components/SummaryCards'
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
    document.title = 'LeadForge AI | Lead Generation Platform'
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!url.trim()) {
      setError('Please enter a website URL to analyze.')
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
      }, 100)
    } catch (err) {
      setResult(null)
      setError(err.response?.data?.detail || 'Unable to analyze this website. Please check the URL and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = async () => {
    if (!result?.email) return

    try {
      await navigator.clipboard.writeText(result.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="home-page">
      <HeroSection />

      <section className="analysis-panel">
        <div className="panel-heading">
          <p className="eyebrow">Quick Analysis</p>
          <h2>Analyze any website to generate qualified leads</h2>
        </div>

        <UrlAnalyzerForm
          url={url}
          setUrl={setUrl}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />

        {error && <ErrorAlert message={error} onDismiss={() => setError('')} />}

        {isLoading && <EnhancedLoadingSpinner />}

        {result ? (
          <section className="results-section" ref={resultsRef}>
            <div className="results-header">
              <div>
                <p className="eyebrow">Analysis Results</p>
                <h3>Lead Intelligence Generated</h3>
              </div>
            </div>

            <SummaryCards result={result} />

            <IssuesGrid issues={result?.issues} />

            <RecommendationsGrid recommendations={result?.recommendations} />

            <div className="contact-section">
              <h3 className="section-title">Contact Information</h3>
              <div className="contact-grid">
                <ContactEmailsCard emails={result?.contact_emails} />
                <ContactPhonesCard phones={result?.contact_phones} />
              </div>
            </div>

            <EmailCard email={result?.email} onCopy={handleCopy} copied={copied} />
          </section>
        ) : null}
      </section>
    </div>
  )
}

export default HomePage
