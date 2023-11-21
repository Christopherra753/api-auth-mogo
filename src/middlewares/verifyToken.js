import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../config.js'

export const verifyToken = (req, res, next) => {
  const { token } = req.cookies

  if (!token) return res.status(401).json(['No token, authorized denied'])

  jwt.verify(token, SECRET_KEY, (error, user) => {
    if (error) return res.status(401).json(['Invalid token'])
    req.user = user
  })

  next()
}
