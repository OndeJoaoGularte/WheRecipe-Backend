import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'recipes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id', 64).primary()
      table.string('title', 200).notNullable()
      table.text('description').notNullable()
      table.integer('servings').notNullable()
      table.integer('prep_time_minutes').notNullable()
      table.integer('cook_time_minutes').notNullable()
      table.json('steps').notNullable()
      table.json('tags').notNullable()
      table.json('nutrition').nullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
