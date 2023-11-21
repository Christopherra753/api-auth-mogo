export const verifyToken = (req, res, next) => {
  const { token } = req.cookies

  next()
}
