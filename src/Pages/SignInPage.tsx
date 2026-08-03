import { Link, useNavigate } from "react-router-dom"
import "../styles/SignInPage.css"
import { useState } from "react"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "../firebase"

export default function SignIn() {
  const navigate = useNavigate()
  const [googleLoading, setGoogleLoading] = useState(false)
  const [googleError, setGoogleError] = useState("")

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
          <form className="form">
            <h2 className="welcome">Welcome!</h2>
            <label className="email">
              Email: <input type="text" className="username-input" placeholder="Enter your email" />
            </label>

            <label className="password">
              Password: <input type="password" className="password-input" placeholder="Enter you password" />
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

            <button className="submit-btn" type="submit" onSubmit={() => navigate("/tasks")}>
              Sign In
            </button>

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
