import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'pantry_items'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
      table
        .string('ingredient_id', 64)
        .notNullable()
        .references('id')
        .inTable('ingredients')
        .onDelete('CASCADE')
      table.string('quantity', 120).notNullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      table.unique(['user_id', 'ingredient_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
