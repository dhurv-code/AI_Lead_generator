const ReportTable = ({ reports, searchTerm, setSearchTerm }) => {
  return (
    <div className="table-card">
      <div className="table-toolbar">
        <div>
          <p className="eyebrow">Saved leads</p>
          <h3>Analysis history</h3>
        </div>
        <label className="search-field">
          <span className="sr-only">Search by website</span>
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by website"
          />
        </label>
      </div>

      {reports.length ? (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Website</th>
                <th>Business type</th>
                <th>Score</th>
                <th>Issues</th>
                <th>Recommendations</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, index) => (
                <tr key={`${report.website}-${index}`}>
                  <td>{report.website || 'Unknown'}</td>
                  <td>{report.business_type || 'Not identified'}</td>
                  <td>{report.score ?? 0}</td>
                  <td>{report.issues?.length || 0}</td>
                  <td>{report.recommendations?.length || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state">
          <h4>No leads analyzed yet</h4>
          <p>Visit the home page to inspect a website and save its analysis to this report list.</p>
        </div>
      )}
    </div>
  )
}

export default ReportTable
