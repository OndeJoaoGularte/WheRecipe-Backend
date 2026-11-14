import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'ingredients'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id', 64).primary()
      table.string('name', 160).notNullable()
      table
        .string('category_id', 64)
        .notNullable()
        .references('id')
        .inTable('ingredient_categories')
        .onDelete('RESTRICT')
      table
        .string('family_id', 64)
        .nullable()
        .references('id')
        .inTable('ingredient_families')
        .onDelete('SET NULL')
      table.json('aliases').nullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
