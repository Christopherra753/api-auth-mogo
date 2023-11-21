import User from '../models/user.models.js'
import { validateRegister, validateLogin } from '../schemas/user.schemas.js'
import bcryptjs from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js'

export const login = async (req, res) => {
  try {
    const result = validateLogin(req.body)

    if (result.error) return res.json(result.error.issues.map(error => error.message))

    const userFound = await User.findOne({ email: result.data.email })

    if (!userFound) return res.status(404).json(['User not found'])

    const isMatch = await bcryptjs.compare(result.data.password, userFound.password)

    if (!isMatch) return res.json(400).json(['Incorrect password'])

    const token = await createAccessToken({ id: userFound._id })

    res.cookie('token', token)

    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt
    })
  } catch (error) {
    res.status(500).json([error.message])
  }
}
export const register = async (req, res) => {
  try {
    const result = validateRegister(req.body)

    if (result.error) return res.status(400).json(result.error.issues.map(error => error.message))

    const userFound = await User.findOne({ email: result.data.email })

    if (userFound) return res.status(400).json(['Email already exists'])

    const password = await bcryptjs.hash(result.data.password, 10)

    const newUser = new User({ ...result.data, password })

    const savedUser = await newUser.save()

    const token = await createAccessToken({ id: savedUser._id })

    res.cookie('token', token)

    res.json({
      id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      createdAt: savedUser.createdAt,
      updatedAt: savedUser.updatedAt
    })
  } catch (error) {
    res.status(500).json([error.message])
  }
}

export const profile = (req, res) => {
  res.send('Profile')
}

export const logout = (req, res) => {
  res.cookie('token', '', {
    expires: new Date(0)
  })
  return res.sendStatus(200)
}
