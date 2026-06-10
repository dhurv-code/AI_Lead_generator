import useClipboard from '../hooks/useClipboard'

const ContactPhonesCard = ({ phones }) => {
  const safePhones = Array.isArray(phones) ? phones.filter(Boolean) : []
  const { copiedValue, copyToClipboard } = useClipboard()

  return (
    <article className="contact-card">
      <div className="contact-card-heading">
        <div>
          <p className="contact-card-label">Phone Numbers</p>
          <h4>Phones</h4>
        </div>
      </div>

      {safePhones.length > 0 ? (
        <div className="contact-list">
          {safePhones.map((phone, index) => {
            const isCopied = copiedValue === phone

            return (
              <div key={`${phone}-${index}`} className="contact-row">
                <span className="contact-value">{phone}</span>
                <button
                  type="button"
                  className={`contact-copy-button ${isCopied ? 'copied' : ''}`}
                  onClick={() => copyToClipboard(phone)}
                  aria-label={`Copy ${phone}`}
                >
                  <span className="contact-copy-icon" aria-hidden="true" />
                  <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            )
          })}
        </div>
      ) : (
        <p className="contact-empty">No phone numbers found</p>
      )}
    </article>
  )
}

export default ContactPhonesCard
