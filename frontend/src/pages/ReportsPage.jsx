import { useEffect, useMemo, useState } from 'react'
import ErrorAlert from '../components/ErrorAlert'
import ReportTable from '../components/ReportTable'
import { fetchReports } from '../services/api'

const ReportsPage = () => {
  const [reports, setReports] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [businessTypeFilter, setBusinessTypeFilter] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    document.title = 'LeadForge AI | Reports'

    const loadReports = async () => {
      try {
        const response = await fetchReports()
        setReports(Array.isArray(response.data) ? response.data : [])
      } catch (err) {
        setError('Unable to load reports. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    loadReports()
  }, [])

  const filteredReports = useMemo(() => {
    let filtered = reports

    const searchLower = searchTerm.trim().toLowerCase()
    if (searchLower) {
      filtered = filtered.filter((report) => (report.website || '').toLowerCase().includes(searchLower))
    }

    if (businessTypeFilter) {
      filtered = filtered.filter((report) => (report.business_type || '').toLowerCase() === businessTypeFilter.toLowerCase())
    }

    return filtered
  }, [reports, searchTerm, businessTypeFilter])

  const businessTypes = useMemo(() => {
    const types = new Set(reports.map((r) => r.business_type).filter(Boolean))
    return Array.from(types).sort()
  }, [reports])

  return (
    <div className="reports-page">
      <section className="page-hero">
        <div>
          <p className="eyebrow">Reports</p>
          <h2>Your Lead Analysis History</h2>
          <p className="page-description">
            Review all analyzed websites and their insights in one place. Track your lead generation progress.
          </p>
        </div>
      </section>

      {error && <ErrorAlert message={error} onDismiss={() => setError('')} />}

      {isLoading ? (
        <div className="loading-state compact">
          <div className="spinner" />
          <p>Loading reports…</p>
        </div>
      ) : null}

      {!isLoading && !error ? (
        <ReportTable
          reports={filteredReports}
          totalReports={reports.length}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          businessTypes={businessTypes}
          businessTypeFilter={businessTypeFilter}
          setBusinessTypeFilter={setBusinessTypeFilter}
        />
      ) : null}
    </div>
  )
}

export default ReportsPage
