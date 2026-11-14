import User from '#models/user'
import { signupValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import UserTransformer from '#transformers/user_transformer'

export default class NewAccountController {
  async store({ request, serialize, response }: HttpContext) {
    const payload = await request.validateUsing(signupValidator)
    const fullName = payload.fullName ?? payload.name ?? null

    if (!fullName) {
      return response.unprocessableEntity({
        errors: [{ message: 'Informe o nome completo.' }],
      })
    }

    const user = await User.create({
      fullName,
      email: payload.email,
      password: payload.password,
    })
    const token = await User.accessTokens.create(user)

    return serialize({
      user: UserTransformer.transform(user),
      token: token.value!.release(),
    })
  }
}
