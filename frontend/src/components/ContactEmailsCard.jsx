import useClipboard from '../hooks/useClipboard'

const ContactEmailsCard = ({ emails }) => {
  const safeEmails = Array.isArray(emails) ? emails.filter(Boolean) : []
  const { copiedValue, copyToClipboard } = useClipboard()

  return (
    <article className="contact-card">
      <div className="contact-card-heading">
        <div>
          <p className="contact-card-label">Contact Emails</p>
          <h4>Emails</h4>
        </div>
      </div>

      {safeEmails.length > 0 ? (
        <div className="contact-list">
          {safeEmails.map((email, index) => {
            const isCopied = copiedValue === email

            return (
              <div key={`${email}-${index}`} className="contact-row">
                <a className="contact-link" href={`mailto:${email}`}>
                  {email}
                </a>
                <button
                  type="button"
                  className={`contact-copy-button ${isCopied ? 'copied' : ''}`}
                  onClick={() => copyToClipboard(email)}
                  aria-label={`Copy ${email}`}
                >
                  <span className="contact-copy-icon" aria-hidden="true" />
                  <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            )
          })}
        </div>
      ) : (
        <p className="contact-empty">No emails found</p>
      )}
    </article>
  )
}

export default ContactEmailsCard
