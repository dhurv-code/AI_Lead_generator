const EmailCard = ({ email, onCopy, copied }) => {
  return (
    <article className="email-card">
      <div className="card-heading">
        <p className="eyebrow">Generated Outreach Email</p>
        <h3>Ready to Send</h3>
      </div>
      <p className="email-body">{email || 'Email will appear here...'}</p>
      <div className="email-actions">
        <button
          type="button"
          className={`copy-button ${copied ? 'copied' : ''}`}
          onClick={onCopy}
          disabled={!email}
        >
          {copied ? '✓ Copied!' : 'Copy Email'}
        </button>
      </div>
      {copied && <div className="success-message">Email copied to clipboard</div>}
    </article>
  )
}

export default EmailCard
