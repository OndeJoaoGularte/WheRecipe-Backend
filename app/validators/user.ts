import vine from '@vinejs/vine'

/**
 * Shared rules for email and password.
 */
const email = () => vine.string().email().maxLength(254)
const password = () => vine.string().minLength(4).maxLength(72)

/**
 * Validator to use when performing self-signup.
 * Accepts `fullName` or `name` from the frontend.
 */
export const signupValidator = vine.create({
  fullName: vine.string().trim().minLength(1).maxLength(120).optional(),
  name: vine.string().trim().minLength(1).maxLength(120).optional(),
  email: email().unique({ table: 'users', column: 'email' }),
  password: password(),
})

/**
 * Validator to use before validating user credentials
 * during login
 */
export const loginValidator = vine.create({
  email: email(),
  password: vine.string(),
})
