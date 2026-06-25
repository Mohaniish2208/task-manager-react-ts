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
            Email <input type="text" className="username-input" placeholder="Enter your email" />
          </label>

          <label className="password">
            Password <input type="text" className="password-input" placeholder="Enter you password" />
          </label>

          <label className="remember">
            <input type="checkbox" />
            Remember Me
          </label>

          <label className="forgot">
            <a target="">Forgot Password?</a>
          </label>

          <button className="submit-btn" type="submit">
            Sign In
          </button>

          <p>
            Don't have an account?<a> Create one.</a>
          </p>
        </form>
      </section>

      <section className="mindful">
        <img className="mindful-logo" src="../../public/Mindfulness Flower.svg" alt="logo" />
        <p className="mindful-text">Breathe in. Focus. You've got this. One task at a time.</p>
      </section>
    </main>
  )
}
