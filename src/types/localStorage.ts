export const saveFirstName = (firstName: string) => {
  localStorage.setItem("firstName", JSON.stringify(firstName))
}

export const saveLastName = (lastName: string) => {
  localStorage.setItem("lastName", JSON.stringify(lastName))
}

export const saveEmail = (email: string) => {
  localStorage.setItem("email", JSON.stringify(email))
}

export const savePhone = (phone: string) => {
  localStorage.setItem("phone", JSON.stringify(phone))
}

export const getFirstName = (): string => {
  return JSON.parse(localStorage.getItem("firstName") || '""')
}

export const getLastName = (): string => {
  return JSON.parse(localStorage.getItem("lastName") || '""')
}

export const getEmail = (): string => {
  return JSON.parse(localStorage.getItem("email") || '""')
}

export const getPhone = (): string => {
  return JSON.parse(localStorage.getItem("phone") || '""')
}
