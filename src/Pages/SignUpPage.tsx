import { useState } from "react"
import { saveUserProfile } from "../types/localStorage"
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
  const [firstNameError, setFirstNameError] = useState("")
  const [lastNameError, setLastNameError] = useState("")
  const [emailInputError, setEmailInputError] = useState("")
  const [phoneError, setPhoneError] = useState("")
  const [confirmationError, setConfirmationError] = useState("")

  const navigate = useNavigate()

  const handleFirstName = (str: string) => {
    if (str.trim() === "") {
      setFirstNameError("")
      return ""
    }

    if (/[!,@,#,$,%,^,&,*]/.test(str)) {
      setFirstNameError("First name should not contain symbols.")
      return "error"
    }

    setFirstNameError("")
    return "Ok"
  }

  const handleLastName = (str: string) => {
    if (str.trim() === "") {
      setLastNameError("")
      return ""
    }

    if (/[!,@,#,$,%,^,&,*]/.test(str)) {
      setLastNameError("Last name should not contain symbols.")
      return "error"
    }

    setLastNameError("")
    return "Ok"
  }

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

      const userCredential = await createUserWithEmailAndPassword(auth, emailInput, password)

      saveUserProfile(userCredential.user.uid, {
        firstName,
        lastName,
        phone,
        email: emailInput,
      })

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

  const handlePhoneNumber = (str: string) => {
    if (!/^\d{10}$/.test(str)) {
      setPhoneError("Phone number should be ten digits long.")
      return "error"
    }

    setPhoneError("")
    return "Ok"
  }

  const handleEmailErrors = (str: string) => {
    if (str.trim() === "") {
      setEmailInputError("")
      return ""
    }
    if (/[!,#,$,%,^,&,*]/.test(str)) {
      setEmailInputError("This email contains an unsupported symbol.")
      return "error"
    }

    setEmailInputError("")
    return "Ok"
  }

  const handlePasswordConfirmation = (str: string) => {
    if (password !== str) {
      setConfirmationError("Passwords don't match.")
      return "error"
    }

    setConfirmationError("")
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
              aria-invalid={Boolean(firstNameError)}
              aria-describedby={firstNameError ? "first-name-error" : undefined}
              onChange={(e) => {
                const value = e.target.value
                const result = handleFirstName(value)
                if (result !== "error") {
                  setFirstName(handleCaps(value))
                }
              }}
            />
            {firstNameError && (
              <p id="first-name-error" className="field-error" role="alert">
                {firstNameError}
              </p>
            )}
          </div>

          <div className="name-container">
            <label className="name">Last name: </label>
            <input
              className="last-name-input"
              type="text"
              placeholder="Last name"
              value={lastName}
              required
              aria-invalid={Boolean(lastNameError)}
              aria-describedby={lastNameError ? "last-name-error" : undefined}
              onChange={(e) => {
                const value = e.target.value
                const result = handleLastName(value)
                if (result !== "error") {
                  setLastName(handleCaps(value))
                }
              }}
            />
            {lastNameError && (
              <p id="last-name-error" className="field-error" role="alert">
                {lastNameError}
              </p>
            )}
          </div>

          <div className="email-container">
            <label className="email-reg">Email: </label>
            <input
              className="email-input"
              type="email"
              placeholder="Email"
              value={emailInput}
              required
              aria-invalid={Boolean(emailInputError)}
              aria-describedby={emailInputError ? "email-input-error" : undefined}
              onChange={(e) => {
                const value = e.target.value
                const result = handleEmailErrors(value)
                if (result !== "error") {
                  setEmailInput(value)
                }
              }}
            />
            {emailInputError && (
              <p id="email-input-error" className="field-error" role="alert">
                {emailInputError}
              </p>
            )}
          </div>

          <div className="phone-container">
            <label className="phone">Phone: </label>
            <input
              className="phone-input"
              type="tel"
              inputMode="numeric"
              maxLength={10}
              placeholder="Phone"
              value={phone}
              required
              aria-invalid={Boolean(phoneError)}
              aria-describedby={phoneError ? "phone-error" : undefined}
              onChange={(e) => {
                const value = e.target.value
                if (/^\d*$/.test(value)) {
                  setPhone(value)
                  setPhoneError("")
                }
              }}
            />
            {phoneError && (
              <p id="phone-error" className="field-error" role="alert">
                {phoneError}
              </p>
            )}
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
              aria-invalid={Boolean(confirmationError)}
              aria-describedby={confirmationError ? "confirmation-error" : undefined}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value)
                setConfirmationError("")
              }}
            />
            {confirmationError && (
              <p id="confirmation-error" className="password-error" role="alert">
                {confirmationError}
              </p>
            )}
          </div>

          <button type="submit" className="sign-up-btn" disabled={registrationLoading}>
            {registrationLoading ? "Loading..." : "Register"}
          </button>
          {registrationError && <p className="registration-error">{registrationError}</p>}
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
