const ReportTable = ({
  reports,
  totalReports,
  searchTerm,
  setSearchTerm,
  businessTypes,
  businessTypeFilter,
  setBusinessTypeFilter,
}) => {
  return (
    <div className="table-card">
      <div className="table-toolbar">
        <div>
          <p className="eyebrow">Analysis History</p>
          <h3>Saved Leads ({totalReports})</h3>
        </div>
        <div className="filters-container">
          <label className="search-field">
            <span className="sr-only">Search by website</span>
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by website…"
            />
          </label>
          {businessTypes.length > 0 && (
            <select
              value={businessTypeFilter}
              onChange={(event) => setBusinessTypeFilter(event.target.value)}
              className="filter-select"
            >
              <option value="">All Business Types</option>
              {businessTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {reports.length ? (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Website</th>
                <th>Business Type</th>
                <th>Lead Score</th>
                <th>Lead Quality</th>
                <th>Issues</th>
                <th>Recommendations</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, index) => (
                <tr key={`${report.website}-${index}`}>
                  <td>
                    <a href={`https://${report.website}`} target="_blank" rel="noopener noreferrer" title="Visit website">
                      {report.website || 'Unknown'}
                    </a>
                  </td>
                  <td>{report.business_type || '—'}</td>
                  <td>
                    <strong>{report.score ?? 0}</strong>
                  </td>
                  <td>{report.lead_quality || '—'}</td>
                  <td>{report.issues?.length || 0}</td>
                  <td>{report.recommendations?.length || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state">
          <h4>No leads found</h4>
          <p>
            {searchTerm || businessTypeFilter
              ? 'Try adjusting your search or filters.'
              : 'Analyze a website to see your history here.'}
          </p>
        </div>
      )}
    </div>
  )
}

export default ReportTable
