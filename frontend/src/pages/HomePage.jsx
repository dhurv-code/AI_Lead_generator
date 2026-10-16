import { useEffect, useRef, useState } from 'react'
// import ContactEmailsCard from '../components/ContactEmailsCard'
// import ContactPhonesCard from '../components/ContactPhonesCard'
// import EmailCard from '../components/EmailCard'
// import ErrorAlert from '../components/ErrorAlert'
// import EnhancedLoadingSpinner from '../components/EnhancedLoadingSpinner'
import HeroSection from '../components/HeroSection'
// import IssuesGrid from '../components/IssuesGrid'
// import RecommendationsGrid from '../components/RecommendationsGrid'
// import SummaryCards from '../components/SummaryCards'
// import UrlAnalyzerForm from '../components/UrlAnalyzerForm'
import { analyzeWebsite } from '../services/api'
import LeadSearchForm from '../components/LeadSearchForm'



const HomePage = () => {
  // const [url, setUrl] = useState('')
  const [result, setResult] = useState(null)
  // const [isLoading, setIsLoading] = useState(false)
  // const [error, setError] = useState('')
  // const [copied, setCopied] = useState(false)
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

      <LeadSearchForm />

  
    </div>
  )
}

export default HomePage
