export const saveUserProfile = (
  uid: string,
  profile: {
    firstName: string
    lastName: string
    email: string
    phone: string
  },
) => {
  localStorage.setItem(`profile-${uid}`, JSON.stringify(profile))
}
