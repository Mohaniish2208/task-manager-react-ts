import { Link, useNavigate } from "react-router-dom"
import "../styles/SignInPage.css"
import { useState } from "react"
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { auth } from "../firebase"

export default function SignIn() {
  const navigate = useNavigate()
  const [googleLoading, setGoogleLoading] = useState(false)
  const [googleError, setGoogleError] = useState("")
  const [emailInput, setEmailInput] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [loadingError, setLoadingError] = useState("")

  const handleRegularLogin = async () => {
    try {
      setLoading(true)
      setLoadingError("")

      await signInWithEmailAndPassword(auth, emailInput, password)
      navigate("/tasks")
    } catch (error) {
      console.log("Email authentication failed:", error)
      setLoadingError("email or password is incorrect")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true)
      setGoogleError("")

      const provider = new GoogleAuthProvider()

      provider.setCustomParameters({
        prompt: "select_account",
      })

      await signInWithPopup(auth, provider)
      navigate("/tasks")
    } catch (error) {
      console.log("Google authentication failed:", error)
      setGoogleError("Google login failed. Please try again.")
    } finally {
      setGoogleLoading(false)
    }
  }

  return (
    <main className="sign-in-main">
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
          <form
            className="form"
            onSubmit={async (e) => {
              e.preventDefault()
              await handleRegularLogin()
            }}
          >
            <h2 className="welcome">Welcome!</h2>
            <label className="email">
              Email:
              <input
                type="email"
                className="username-input"
                placeholder="Enter your email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
              />
            </label>

            <label className="password">
              Password:
              <input
                type="password"
                className="password-input"
                placeholder="Enter you password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <div className="remember">
              <label className="remember-sec-1">
                <input type="checkbox" />
                Remember Me
              </label>
              <div className="remember-sec-2">
                <Link to={"/forgotpassword"} className="forgotpassword">
                  Forgot Password
                </Link>
              </div>
            </div>

            <button className="submit-btn" type="submit" disabled={loading}>
              {loading ? "Loading..." : "Sign In"}
            </button>
            {loadingError && <p className="loading-error">{loadingError}</p>}

            <div className="divider">
              <span className="partition-line"></span>
              <span className="partition">or</span>
              <span className="partition-line"></span>
            </div>

            <button type="button" className="google-btn-signin-pg" onClick={handleGoogleLogin} disabled={googleLoading}>
              {googleLoading ? "Loading..." : "Sign in with Google"}
            </button>

            {googleError && <p className="google-error-signin-pg">{googleError}</p>}

            <p className="question">
              Don't have an account?
              <Link to={"/signup"} className="create">
                Create one
              </Link>
            </p>
          </form>
        </section>

        <section className="mindful">
          <img className="mindful-logo" src="/Mindfulness Flower.svg" alt="logo" />
          <p className="mindful-text">
            Breathe in. Focus. <br /> You've got this. One task at a time.
          </p>
        </section>
      </div>
    </main>
  )
}
