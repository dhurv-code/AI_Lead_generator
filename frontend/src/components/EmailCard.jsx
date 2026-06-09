const EmailCard = ({ email, onCopy, copied }) => {
  return (
    <article className="card email-card">
      <div className="card-heading">
        <p className="eyebrow">Outreach email</p>
        <h3>Ready for outreach</h3>
      </div>
      <p className="email-body">{email || 'The generated email will appear here once the analysis is complete.'}</p>
      <button type="button" className="secondary-button" onClick={onCopy} disabled={!email}>
        {copied ? 'Copied!' : 'Copy email'}
      </button>
    </article>
  )
}

export default EmailCard
