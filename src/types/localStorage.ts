export const saveFirstName = (username: string) => {
  localStorage.setItem("id", JSON.stringify(username))
}

export const saveLastName = (username: string) => {
  localStorage.setItem("id", JSON.stringify(username))
}

export const saveEmail = (email: string) => {
  localStorage.setItem("email", JSON.stringify(email))
}

export const savePhone = (phone: string) => {
  localStorage.setItem("phone", JSON.stringify(phone))
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

export const getEmail = (): string => {
  return JSON.parse(localStorage.getItem("email") || '""')
}

export const getPhone = (): string => {
  return JSON.parse(localStorage.getItem("phone") || '""')
}
