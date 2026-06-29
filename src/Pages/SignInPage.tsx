import "../styles/SignInPage.css"

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

      <div className="sections-container">
        <section className="info-container">
          <form className="form">
            <label className="email">
              Email: <input type="text" className="username-input" placeholder="Enter your email" />
            </label>

            <label className="password">
              Password: <input type="password" className="password-input" placeholder="Enter you password" />
            </label>

            <label className="remember">
              <input type="checkbox" />
              Remember Me
            </label>

            <button className="submit-btn" type="submit">
              Sign In
            </button>

            {/* <label className="forgot">
              <a target="">Forgot Password?</a>
            </label> ADD THIS AFTER THE PASSWORD MATCH FAILS. */}

            <p className="question">
              Don't have an account?<a className="create"> Create one.</a>
            </p>
          </form>
        </section>

        <section className="mindful">
          <img className="mindful-logo" src="/Mindfulness Flower.svg" alt="logo" />
          <p className="mindful-text">Breathe in. Focus. You've got this. One task at a time.</p>
        </section>
      </div>
    </main>
  )
}
