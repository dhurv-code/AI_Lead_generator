const IssuesGrid = ({ issues }) => {
  if (!issues || issues.length === 0) {
    return (
      <div className="issues-section">
        <h3 className="section-title">Key Issues</h3>
        <p className="empty-message">No issues identified for this website.</p>
      </div>
    )
  }

  // Show only top issues (max 6)
  const topIssues = issues.slice(0, 6)

  return (
    <div className="issues-section">
      <h3 className="section-title">Key Issues</h3>
      <div className="issues-grid">
        {topIssues.map((issue, index) => (
          <div key={`${issue}-${index}`} className="issue-card">
            <div className="issue-icon">•</div>
            <div className="issue-text">{issue}</div>
          </div>
        ))}
      </div>
      {issues.length > 6 && (
        <p className="additional-count">+{issues.length - 6} more issues</p>
      )}
    </div>
  )
}

export default IssuesGrid
