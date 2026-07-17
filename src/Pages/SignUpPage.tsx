import { useState } from "react"
import { saveFirstName, saveLastName } from "../types/localStorage"

export default function SignUp() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [emailInput, setEmailInput] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")

  const handlePassword = (str: string) => {
    if (str.length < 8) {
      alert("The password should be at least 8 characters long.")
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

  const handleCaps = (str: string) => {
    if (str.trim() === "") return ""
    return str.replace(/^(\s*)([a-z])/, (_, spaces, firstletter) => {
      return spaces + firstletter.toUpperCase()
    })
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
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault()
            saveFirstName(firstName)
            saveLastName(lastName)
          }}
        >
          <div className="name-container">
            <label className="name">First name: </label>
            <input
              className="full-name-input"
              type="text"
              placeholder="First name"
              required
              onChange={(e) => {
                const value = e.target.value
                const result = handleCaps(handleFirstName(value))
                if (result !== "error") {
                  setFirstName(value)
                }
              }}
            />
          </div>

          <div className="name-container">
            <label className="name">Last name: </label>
            <input
              className="full-name-input"
              type="text"
              placeholder="Last name"
              required
              onChange={(e) => {
                const value = e.target.value
                const result = handleLastName(value)
                if (result !== "error") {
                  setLastName(result)
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
              required
              onChange={(e) => {
                const value = e.target.value
                const result = handleEmailErrors(value)
                if (result !== "error") {
                  setEmailInput(result)
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
              required
              onChange={(e) => {
                const value = e.target.value
                const result = handlePhoneNumber(value)
                if (result !== "error") {
                  setPhone(result)
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
              onChange={(e) => {
                const value = e.target.value
                const result = handlePassword(value)
                if (result !== "error") {
                  setPassword(result)
                }
              }}
            />
          </div>

          <div className="password-confirm-container">
            <label> Confirm Password: </label>
            <input
              className="confirmation-input"
              type="password"
              placeholder="Confirm Password"
              required
              onChange={(e) => {
                const value = e.target.value
                const result = handlePassword(value)
                if (result !== "error") {
                  setPassword(result)
                }
              }}
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
          <button type="button" className="google-signin-btn">
            Sign up with Google
          </button>
        </section>
      </section>
    </main>
  )
}
