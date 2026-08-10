import { MemoryRouter } from "react-router-dom"
import { describe, expect, it, vi } from "vitest"
import ForgotPassword from "./ForgotPasswordPage"
import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { sendPasswordResetEmail } from "firebase/auth"

vi.mock("firebase/auth", async (importOriginal) => {
  const actual = await importOriginal<typeof import("firebase/auth")>()

  return {
    ...actual,
    sendPasswordResetEmail: vi.fn(),
  }
})

describe("ForgotPassword", () => {
  it("renders the password-reset form", () => {
    render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>,
    )

    expect(screen.getByRole("heading", { name: /reset password/i })).toBeInTheDocument()

    expect(screen.getByRole("textbox", { name: /email/i })).toBeInTheDocument()

    expect(screen.getByRole("button", { name: /send reset email/i })).toBeInTheDocument()

    expect(screen.getByRole("link", { name: /back to sign in/i })).toHaveAttribute("href", "/")
  })

  it("allows the user to enter an email", async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>,
    )

    const emailInput = screen.getByRole("textbox", { name: /email/i })

    await user.type(emailInput, "test@example.com")

    expect(emailInput).toHaveValue("test@example.com")
  })

  it("sends a password-reset request and shows success feedback", async () => {
    const user = userEvent.setup()
    const mockedSendPasswordResetEmail = vi.mocked(sendPasswordResetEmail)

    mockedSendPasswordResetEmail.mockClear()
    mockedSendPasswordResetEmail.mockResolvedValue(undefined)

    render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>,
    )

    const emailInput = screen.getByRole("textbox", { name: /email/i })
    const submitButton = screen.getByRole("button", {
      name: /send reset email/i,
    })

    await user.type(emailInput, "test@example.com")
    await user.click(submitButton)

    expect(mockedSendPasswordResetEmail).toHaveBeenCalledWith(expect.anything(), "test@example.com")

    expect(await screen.findByRole("status")).toHaveTextContent(/password reset link sent/i)
  })
})
