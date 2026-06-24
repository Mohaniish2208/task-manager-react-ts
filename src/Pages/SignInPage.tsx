export default function SignIn() {
  return (
    <main>
      <section className="logo-container">
        <div className="title-container">
          <h1 className="title">
            <img className="lexora-logo" src="/lexora-logo.svg" alt="logo" />
            <p className="affiliation">
              Powered by <span className="lifted">Lifted</span>
            </p>
          </h1>
        </div>
      </section>

      <section className="info-container">
        <form>
          <label className="username">
            Username <input type="text" className="username-input" />
          </label>

          <label className="password">
            Password <input type="text" className="password-input" />
          </label>

          <label className="remember">
            <input type="checkbox" />
            Remember Me
          </label>

          <button type="submit">Save</button>
        </form>
      </section>
    </main>
  )
}
