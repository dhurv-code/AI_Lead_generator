const RecommendationsGrid = ({ recommendations }) => {
  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="recommendations-section">
        <h3 className="section-title">Recommendations</h3>
        <p className="empty-message">No recommendations available.</p>
      </div>
    )
  }

  return (
    <div className="recommendations-section">
      <h3 className="section-title">Recommendations</h3>
      <div className="recommendations-grid">
        {recommendations.map((rec, index) => (
          <div key={`${rec}-${index}`} className="recommendation-card">
            <div className="recommendation-number">{index + 1}</div>
            <div className="recommendation-text">{rec}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecommendationsGrid
