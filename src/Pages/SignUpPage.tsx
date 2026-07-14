export default function SignUp() {
  function handlePassword(str: string) {
    if (str.length < 8) return "The password should be at least 8 characters long."
  }
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
      <section className="form-section">
        <form className="form">
          <div className="name-container">
            <label className="name">First name: </label>
            <input className="full-name-input" type="text" placeholder="First name" />
          </div>

          <div className="name-container">
            <label className="name">Last name: </label>
            <input className="full-name-input" type="text" placeholder="Last name" />
          </div>

          <div className="email-container">
            <label className="email-reg">Email: </label>
            <input className="email-input" type="text" placeholder="Email" />
          </div>

          <div className="phone-container">
            <label className="phone">Phone: </label>
            <input className="phone-input" type="text" placeholder="Phone" />
          </div>

          <div className="password-container">
            <label className="password-reg">Password: </label>
            <input className="password-input-reg" type="text" placeholder="Password" />
          </div>

          <div className="password-confirm-container">
            <label> Confirm Password: </label>
            <input className="confirmation-input" type="text" placeholder="Confirm Password" />
          </div>

          <button type="submit" className="sign-up-btn">
            Register
          </button>
        </form>
        <section>
          <div className="option">
            <span className="before"></span>
            <span className="or">or</span>
            <span className="after"></span>
          </div>
          <button type="button" className="google-signin-btn">
            Sign up with Google
          </button>
        </section>
      </section>
    </main>
  )
}
