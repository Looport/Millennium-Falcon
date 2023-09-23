export const generateAuthCredentials = () => {
  const email = `eliot@e-corp-${Math.random()}.com`
  const password = email

  return {
    email,
    password,
  }
}