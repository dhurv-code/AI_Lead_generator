const SummaryCards = ({ result }) => {
  return (
    <div className="summary-section">
      <div className="summary-cards">
        <div className="summary-card">
          <div className="summary-label">Lead Score</div>
          <div className="summary-value">{result?.score ?? 0}</div>
          <div className="summary-unit">/100</div>
        </div>

        <div className="summary-card">
          <div className="summary-label">Lead Quality</div>
          <div className="summary-value">{result?.lead_quality || 'Not rated'}</div>
        </div>

        <div className="summary-card">
          <div className="summary-label">Business Type</div>
          <div className="summary-value">{result?.business_type || 'Unknown'}</div>
        </div>
      </div>
    </div>
  )
}

export default SummaryCards
