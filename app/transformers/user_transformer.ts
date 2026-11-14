import type User from '#models/user'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class UserTransformer extends BaseTransformer<User> {
  toObject() {
    return {
      id: String(this.resource.id),
      name: this.resource.fullName ?? '',
      fullName: this.resource.fullName,
      email: this.resource.email,
      initials: this.resource.initials,
      createdAt: this.resource.createdAt,
      updatedAt: this.resource.updatedAt,
    }
  }
}
