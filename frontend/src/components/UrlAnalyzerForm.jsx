const UrlAnalyzerForm = ({ url, setUrl, onSubmit, isLoading }) => {
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
        disabled={isLoading}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Analyzing…' : 'Analyze Website'}
      </button>
    </form>
  )
}

export default UrlAnalyzerForm
