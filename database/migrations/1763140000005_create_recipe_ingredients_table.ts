import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'recipe_ingredients'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table
        .string('recipe_id', 64)
        .notNullable()
        .references('id')
        .inTable('recipes')
        .onDelete('CASCADE')
      /**
       * Can reference an ingredient id or a family id
       * (e.g. "queijo" covers any cheese in pantry).
       */
      table.string('ingredient_ref', 64).notNullable()
      table.string('quantity', 120).notNullable()
      table.boolean('optional').notNullable().defaultTo(false)
      table.integer('sort_order').notNullable().defaultTo(0)
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      table.index(['recipe_id'])
      table.index(['ingredient_ref'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
