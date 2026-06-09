const UrlAnalyzerForm = ({ url, setUrl, onSubmit, isLoading, error }) => {
  return (
    <form className="analyzer-form" onSubmit={onSubmit}>
      <label className="sr-only" htmlFor="website-url">
        Website URL
      </label>
      <input
        id="website-url"
        type="url"
        value={url}
        onChange={(event) => setUrl(event.target.value)}
        placeholder="https://example.com"
        autoComplete="off"
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Analyzing…' : 'Analyze website'}
      </button>
      {error ? <p className="form-error">{error}</p> : null}
    </form>
  )
}

export default UrlAnalyzerForm
