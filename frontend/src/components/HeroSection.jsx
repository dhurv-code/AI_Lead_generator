const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-copy">
        <p className="eyebrow">Intelligent Lead Analysis</p>
        <h1>Find qualified leads in seconds according to your perspective.</h1>
        <p className="hero-text">
          Search the businesses with the locations and identify growth opportunities using LeadForgeAI.<br/>
          Get actionable insights to improve your prospecting.
        </p>
        <div className="hero-stats">
          <div>
            <strong>10-15 sec</strong>
            <span>average analysis</span>
          </div>
          <div>
            <strong>AI-Powered</strong>
            <span>recommendations</span>
          </div>
          {/* <div>
            <strong>Ready-to-Send</strong>
            <span>outreach emails</span>
          </div> */}
        </div>
      </div>
    </section>
  )
}

export default HeroSection
