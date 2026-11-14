import vine from '@vinejs/vine'

export const upsertPantryItemValidator = vine.create({
  ingredientId: vine.string().trim().minLength(1).maxLength(64),
  quantity: vine.string().trim().minLength(1).maxLength(120),
})

export const applyPantryUpdatesValidator = vine.create({
  updates: vine.array(
    vine.object({
      ingredientId: vine.string().trim().minLength(1).maxLength(64),
      quantity: vine.string().trim().maxLength(120).nullable(),
    })
  ),
})

export const matchRecipesValidator = vine.create({
  ingredientIds: vine.array(vine.string().trim().minLength(1).maxLength(64)),
})
