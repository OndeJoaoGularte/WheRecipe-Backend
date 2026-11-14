import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_tokens.store': { paramsTuple?: []; params?: {} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'profile.access_tokens.destroy': { paramsTuple?: []; params?: {} }
    'ingredients.index': { paramsTuple?: []; params?: {} }
    'ingredients.categories': { paramsTuple?: []; params?: {} }
    'ingredients.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'recipes.index': { paramsTuple?: []; params?: {} }
    'recipes.match': { paramsTuple?: []; params?: {} }
    'recipes.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'pantry.pantry.index': { paramsTuple?: []; params?: {} }
    'pantry.pantry.upsert': { paramsTuple?: []; params?: {} }
    'pantry.pantry.destroy': { paramsTuple: [ParamValue]; params: {'ingredientId': ParamValue} }
    'pantry.pantry.apply_updates': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'ingredients.index': { paramsTuple?: []; params?: {} }
    'ingredients.categories': { paramsTuple?: []; params?: {} }
    'ingredients.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'recipes.index': { paramsTuple?: []; params?: {} }
    'recipes.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'pantry.pantry.index': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'ingredients.index': { paramsTuple?: []; params?: {} }
    'ingredients.categories': { paramsTuple?: []; params?: {} }
    'ingredients.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'recipes.index': { paramsTuple?: []; params?: {} }
    'recipes.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'pantry.pantry.index': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_tokens.store': { paramsTuple?: []; params?: {} }
    'profile.access_tokens.destroy': { paramsTuple?: []; params?: {} }
    'recipes.match': { paramsTuple?: []; params?: {} }
    'pantry.pantry.apply_updates': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'pantry.pantry.upsert': { paramsTuple?: []; params?: {} }
  }
  DELETE: {
    'pantry.pantry.destroy': { paramsTuple: [ParamValue]; params: {'ingredientId': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}