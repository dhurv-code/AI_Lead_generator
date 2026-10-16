
import { useState } from 'react'
import { findLeads } from '../services/api'

export default function LeadSearchForm() {
  const [niche, setNiche] = useState('')
  const [location, setLocation] = useState('')
  const [limit, setLimit] = useState(20)
  const [leads, setLeads] = useState([])
  const [totalDiscovered, setTotalDiscovered] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSearch(e) {
    e.preventDefault()
    const searchNiche = niche.trim()
    const searchLocation = location.trim()

    if (searchNiche.length < 2 || searchLocation.length < 2) {
      setError('Enter a business type and location with at least 2 characters each.')
      return
    }

    setLoading(true)
    setError('')
    setLeads([])
    setTotalDiscovered(null)

    try {
      const response = await findLeads({ niche: searchNiche, location: searchLocation, limit })
      const results = Array.isArray(response.data?.results) ? response.data.results : []
      setLeads(results)
      setTotalDiscovered(Number.isFinite(response.data?.total_discovered)
        ? response.data.total_discovered
        : results.length)
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        'Unable to find leads. Please check your connection and try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="lead-search">
      <h2>Find Leads Automatically</h2>
      <p>Discover businesses by niche and location.</p>

      <form className="lead-search-form" onSubmit={handleSearch}>
        <input
          type="text"
          aria-label="Business niche"
          placeholder="Business niche (e.g. gyms)"
          value={niche}
          onChange={(e) => setNiche(e.target.value)}
          required
          minLength={2}
          maxLength={100}
        />

        <input
          type="text"
          aria-label="Location"
          placeholder="Location (e.g. Delhi, India)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          minLength={2}
          maxLength={100}
        />

        <label className="lead-limit-field">
          <span>Maximum results</span>
          <select value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
            {[5, 10, 15, 20].map((count) => <option key={count} value={count}>{count}</option>)}
          </select>
        </label>

        <button className="secondary-button" type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Find Leads'}
        </button>
      </form>

      {error && <p className="lead-search-error" role="alert">{error}</p>}
      {loading && <p className="lead-search-status" role="status">Searching OpenStreetMap for matching businesses…</p>}

      {!loading && totalDiscovered !== null && leads.length > 0 && (
        <div className="lead-results">
          <h3>Found {totalDiscovered} {totalDiscovered === 1 ? 'business' : 'businesses'}</h3>

          {leads.map((lead) => (
            <div
              className="lead-card"
              key={lead.place_id || `${lead.business_name}-${lead.address}`}
            >
              <h4>{lead.business_name || 'Unnamed business'}</h4>

              {lead.address && <p>{lead.address}</p>}
              {lead.phone && <p><a href={`tel:${lead.phone}`}>{lead.phone}</a></p>}
              {!lead.address && !lead.phone && <p>Contact details are not listed.</p>}

              {lead.website && (
                <a
                  href={/^https?:\/\//i.test(lead.website) ? lead.website : `https://${lead.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Website
                </a>
              )}
              <span className="lead-status">{lead.status || 'discovered'}</span>
            </div>
          ))}
        </div>
      )}

      {!loading && totalDiscovered === 0 && !error && (
        <p className="lead-search-status">No matching businesses were found. Try another niche or a nearby location.</p>
      )}

      {totalDiscovered === null && !loading && !error && (
        <p className="lead-search-status">Search to discover potential customers.</p>
      )}
    </div>
  )
}
