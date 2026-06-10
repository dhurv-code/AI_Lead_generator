const ErrorAlert = ({ message, onDismiss }) => {
  if (!message) return null

  return (
    <div className="error-alert" role="alert">
      <div className="error-icon">⚠</div>
      <div className="error-content">
        <p className="error-message">{message}</p>
      </div>
      {onDismiss && (
        <button
          type="button"
          className="error-close"
          onClick={onDismiss}
          aria-label="Dismiss error"
        >
          ✕
        </button>
      )}
    </div>
  )
}

export default ErrorAlert
