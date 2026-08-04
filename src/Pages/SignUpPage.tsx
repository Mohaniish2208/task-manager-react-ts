import { useState } from "react"
import { saveEmail, saveFirstName, saveLastName, savePhone } from "../types/localStorage"
import "../styles/SignUpPage.css"
import { useNavigate } from "react-router-dom"
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "../firebase"

export default function SignUp() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [emailInput, setEmailInput] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [googleLoading, setGoogleLoading] = useState(false)
  const [googleError, setGoogleError] = useState("")
  const [registrationLoading, setRegistrationLoading] = useState(false)
  const [registrationError, setRegistrationError] = useState("")

  const navigate = useNavigate()

  const handleGoogleSignup = async () => {
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
      setGoogleError("Google signup failed. Please try again.")
    } finally {
      setGoogleLoading(false)
    }
  }

  const handleRegistration = async () => {
    try {
      setRegistrationLoading(true)
      setRegistrationError("")

      await createUserWithEmailAndPassword(auth, emailInput, password)

      saveFirstName(firstName)
      saveLastName(lastName)
      saveEmail(emailInput)
      savePhone(phone)

      navigate("/tasks")
    } catch (error) {
      console.log("Email registration failed:", error)
      setRegistrationError("Registration failed. Please try again.")
    } finally {
      setRegistrationLoading(false)
    }
  }

  const handlePassword = (str: string) => {
    if (str.length < 8) {
      return "error"
    }
    return "Ok"
  }

  const handleFirstName = (str: string) => {
    if (str.trim() === "") return ""
    if (/[!,@,#,$,%,^,&,*]/.test(str)) {
      alert("Username should not contain any symbols.")
      return "error"
    }
    return "Ok"
  }

  const handleLastName = (str: string) => {
    if (str.trim() === "") return ""
    if (/[!,@,#,$,%,^,&,*]/.test(str)) {
      alert("Username should not contain any symbols.")
      return "error"
    }
    return "Ok"
  }

  const handlePhoneNumber = (str: string) => {
    if (str.trim() === "") return ""
    if (str.length < 10 || str.length > 10) {
      alert("Phone number should be ten digits long.")
      return "error"
    }
    return "Ok"
  }

  const handleEmailErrors = (str: string) => {
    if (str.trim() === "") return ""
    if (/[!,#,$,%,^,&,*]/.test(str)) {
      alert("No special symbols are allowed")
      return "error"
    }
    return "Ok"
  }

  const handlePasswordConfirmation = (str: string) => {
    if (password !== str) {
      alert("Passwords don't match.")
      return "error"
    }
    return "Ok"
  }

  const handleCaps = (str: string) => {
    if (str.trim() === "") return ""
    return str.replace(/^(\s*)([a-z])/, (_, spaces, firstletter) => {
      return spaces + firstletter.toUpperCase()
    })
  }

  return (
    <main className="main">
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
        <form
          className="sign-up-form"
          onSubmit={async (e) => {
            e.preventDefault()
            if (handleFirstName(firstName) !== "Ok") return
            if (handleLastName(lastName) !== "Ok") return
            if (handleEmailErrors(emailInput) !== "Ok") return
            if (handlePhoneNumber(phone) !== "Ok") return
            if (handlePassword(password) === "error") return
            if (handlePasswordConfirmation(confirmPassword) === "error") return

            await handleRegistration()
          }}
        >
          <div className="name-container">
            <label className="name">First name: </label>
            <input
              className="first-name-input"
              type="text"
              placeholder="First name"
              value={firstName}
              required
              onChange={(e) => {
                const value = e.target.value
                const result = handleFirstName(value)
                if (result !== "error") {
                  setFirstName(handleCaps(value))
                }
              }}
            />
          </div>

          <div className="name-container">
            <label className="name">Last name: </label>
            <input
              className="last-name-input"
              type="text"
              placeholder="Last name"
              value={lastName}
              required
              onChange={(e) => {
                const value = e.target.value
                const result = handleLastName(value)
                if (result !== "error") {
                  setLastName(handleCaps(value))
                }
              }}
            />
          </div>

          <div className="email-container">
            <label className="email-reg">Email: </label>
            <input
              className="email-input"
              type="email"
              placeholder="Email"
              value={emailInput}
              required
              onChange={(e) => {
                const value = e.target.value
                const result = handleEmailErrors(value)
                if (result !== "error") {
                  setEmailInput(value)
                }
              }}
            />
          </div>

          <div className="phone-container">
            <label className="phone">Phone: </label>
            <input
              className="phone-input"
              type="text"
              placeholder="Phone"
              value={phone}
              required
              onChange={(e) => {
                const value = e.target.value
                const result = handlePhoneNumber(value)
                if (result !== "error") {
                  setPhone(value)
                }
              }}
            />
          </div>

          <div className="password-container">
            <label className="password-reg">Password: </label>
            <input
              className="password-input-reg"
              type="password"
              placeholder="Password"
              required
              value={password}
              minLength={8}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="password-confirm-container">
            <label className="confirmation-password-reg"> Confirm Password: </label>
            <input
              className="confirmation-password-input"
              type="password"
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
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
          <button type="button" className="google-signin-btn" onClick={handleGoogleSignup} disabled={googleLoading}>
            {googleLoading ? "Loading..." : "Sign up with Google"}
          </button>
          {googleError && <p className="google-error">{googleError}</p>}
        </section>
      </section>
    </main>
  )
}
