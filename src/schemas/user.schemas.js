import { object, z } from 'zod'

const registerSchema = z.object({
  username: z.string({
    invalid_type_error: 'El username debe ser un string',
    required_error: 'El username debe ser obligatorio'
  }),
  email: z.string({
    required_error: 'El email debe ser obligatorio',
    invalid_type_error: 'El email debe ser un string'
  }).email({
    message: 'El email es incorrecto'
  }),
  password: z.string({
    required_error: 'La constraseña es obligatoria',
    invalid_type_error: 'La contraseña debe ser un string'
  })
})

export const validateRegister = (object) => {
  return registerSchema.safeParse(object)
}

const loginSchema = z.object({
  email: z.string({
    required_error: 'El email debe ser obligatorio',
    invalid_type_error: 'El email debe ser un string'
  }).email({
    message: 'El email es incorrecto'
  }),
  password: z.string({
    required_error: 'La constraseña es obligatoria',
    invalid_type_error: 'La contraseña debe ser un string'
  })
})

export const validateLogin = (object) => {
  return loginSchema.safeParse(object)
}
