import { sendPasswordResetEmail } from "firebase/auth"
import { useState } from "react"
import { Link } from "react-router-dom"
import { auth } from "../firebase"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [resetLoading, setResetLoading] = useState(false)
  const [resetMessage, setResetMessage] = useState("")
  const [resetError, setResetError] = useState("")

  const handlePasswordReset = async () => {
    try {
      setResetLoading(true)
      setResetMessage("")
      setResetError("")

      await sendPasswordResetEmail(auth, email)
      setResetMessage("Password reset link sent. Please check your inbox.")
    } catch (error) {
      console.log("Password reset failed:", error)
      setResetError("Unable to send the reset email. Please try again.")
    } finally {
      setResetLoading(false)
    }
  }

  return (
    <main className="sign-in-main">
      <section className="info-container">
        <form
          className="form"
          onSubmit={async (e) => {
            e.preventDefault()
            await handlePasswordReset()
          }}
        >
          <h1 className="reset-heading">Reset password</h1>
          <p className="reset-message">Enter your account email to get a password-reset link</p>

          <label htmlFor="reset-email">Email:</label>
          <input
            id="reset-email"
            className="reset-email"
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            aria-invalid={Boolean(resetError)}
            aria-describedby={resetError ? "reset-error" : undefined}
            onChange={(e) => {
              setEmail(e.target.value)
              setResetMessage("")
              setResetError("")
            }}
          />
          <button className="reset-button" type="submit" disabled={resetLoading}>
            {resetLoading ? "Sending..." : "Send Reset Email"}
          </button>

          {resetMessage && (
            <p className="reset-success" role="status">
              {resetMessage}
            </p>
          )}

          {resetError && (
            <p id="reset-error" className="reset-error" role="alert">
              {resetError}
            </p>
          )}
          <Link to={"/"}>Back to Sign In</Link>
        </form>
      </section>
    </main>
  )
}
