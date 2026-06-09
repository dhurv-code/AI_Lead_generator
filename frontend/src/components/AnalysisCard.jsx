const AnalysisCard = ({ result }) => {
  const issues = result?.issues || []
  const recommendations = result?.recommendations || []

  return (
    <article className="card analysis-card">
      <div className="card-heading">
        <p className="eyebrow">Lead snapshot</p>
        <h3>{result?.website || 'Analyzed website'}</h3>
      </div>

      <div className="metric-grid">
        <div className="metric-pill">
          <span>Business type</span>
          <strong>{result?.business_type || 'Not identified'}</strong>
        </div>
        <div className="metric-pill">
          <span>Score</span>
          <strong>{result?.score ?? 0}/100</strong>
        </div>
      </div>

      <div className="detail-stack">
        <div>
          <h4>Key issues</h4>
          {issues.length ? (
            <ul>
              {issues.map((issue, index) => (
                <li key={`${issue}-${index}`}>{issue}</li>
              ))}
            </ul>
          ) : (
            <p className="muted">No issues were highlighted for this lead.</p>
          )}
        </div>

        <div>
          <h4>Recommended actions</h4>
          {recommendations.length ? (
            <ul>
              {recommendations.map((recommendation, index) => (
                <li key={`${recommendation}-${index}`}>{recommendation}</li>
              ))}
            </ul>
          ) : (
            <p className="muted">No recommendations were generated.</p>
          )}
        </div>
      </div>
    </article>
  )
}

export default AnalysisCard
