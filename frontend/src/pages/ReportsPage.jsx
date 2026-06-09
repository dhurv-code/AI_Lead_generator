import { useEffect, useMemo, useState } from 'react'
import ReportTable from '../components/ReportTable'
import { fetchReports } from '../services/api'

const ReportsPage = () => {
  const [reports, setReports] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    document.title = 'Apex Leads | Reports'

    const loadReports = async () => {
      try {
        const response = await fetchReports()
        setReports(Array.isArray(response.data) ? response.data : [])
      } catch (err) {
        setError('We could not load your reports right now. Please try again shortly.')
      } finally {
        setIsLoading(false)
      }
    }

    loadReports()
  }, [])

  const filteredReports = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()

    if (!term) return reports

    return reports.filter((report) => (report.website || '').toLowerCase().includes(term))
  }, [reports, searchTerm])

  return (
    <div className="reports-page">
      <section className="page-hero">
        <div>
          <p className="eyebrow">Reports</p>
          <h2>Review every lead analysis in one place.</h2>
          <p className="page-description">Keep track of your outreach pipeline and revisit each lead with a single view.</p>
        </div>
      </section>

      {isLoading ? (
        <div className="loading-state compact">
          <div className="spinner" />
          <p>Loading saved reports…</p>
        </div>
      ) : null}

      {error ? <p className="form-error">{error}</p> : null}

      {!isLoading && !error ? <ReportTable reports={filteredReports} searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> : null}
    </div>
  )
}

export default ReportsPage
