import { Router } from 'express'
import {
  login,
  profile,
  register
} from '../controllers/user.controllers.js'

const router = Router()

router.post('/login', login)
router.post('/register', register)
router.get('/profile', profile)

export default router
