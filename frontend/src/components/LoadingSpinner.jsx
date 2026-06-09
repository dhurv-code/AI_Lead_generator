const LoadingSpinner = () => {
  return (
    <div className="loading-state" role="status" aria-live="polite">
      <div className="spinner" />
      <p>Gathering market signals and drafting recommendations…</p>
    </div>
  )
}

export default LoadingSpinner
