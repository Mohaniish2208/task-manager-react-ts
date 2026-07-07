export const saveUsername = (username: string) => {
  localStorage.setItem("id", JSON.stringify(username))
}

export const savePassword = (password: string) => {
  localStorage.setItem("password", JSON.stringify(password))
}

export const getUsername = () => {
  try {
    const stored = localStorage.getItem("id")
    if (!stored) return ""
    JSON.parse(stored)
  } catch {
    return ""
  }
}

export const getPassword = (): string => {
  return JSON.parse(localStorage.getItem("password") || '""')
}
