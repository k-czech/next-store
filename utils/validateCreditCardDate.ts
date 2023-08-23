export const validateCreditCardDate = (value: string) => {
  if (value.length !== 5) {
    return 'Pass your data in format MM/YY'
  }
  const [month, year] = value.split('/')
  if (Number(month) > 12) {
    return 'Wrong month'
  }
  return true
}
