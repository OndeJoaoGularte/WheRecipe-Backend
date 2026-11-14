/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

export type { Route, Path } from './schema.d.ts'

const placeholder: any = {}

const routes = {
  'auth.new_account.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/signup',
    tokens: [[0,"api"],[0,"v1"],[0,"auth"],[0,"signup"]],
    types: placeholder as Registry['auth.new_account.store']['types'],
  },
  'auth.access_tokens.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/login',
    tokens: [[0,"api"],[0,"v1"],[0,"auth"],[0,"login"]],
    types: placeholder as Registry['auth.access_tokens.store']['types'],
  },
  'profile.profile.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/account/profile',
    tokens: [[0,"api"],[0,"v1"],[0,"account"],[0,"profile"]],
    types: placeholder as Registry['profile.profile.show']['types'],
  },
  'profile.access_tokens.destroy': {
    methods: ["POST"],
    pattern: '/api/v1/account/logout',
    tokens: [[0,"api"],[0,"v1"],[0,"account"],[0,"logout"]],
    types: placeholder as Registry['profile.access_tokens.destroy']['types'],
  },
  'ingredients.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/ingredients',
    tokens: [[0,"api"],[0,"v1"],[0,"ingredients"]],
    types: placeholder as Registry['ingredients.index']['types'],
  },
  'ingredients.categories': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/ingredients/meta',
    tokens: [[0,"api"],[0,"v1"],[0,"ingredients"],[0,"meta"]],
    types: placeholder as Registry['ingredients.categories']['types'],
  },
  'ingredients.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/ingredients/:id',
    tokens: [[0,"api"],[0,"v1"],[0,"ingredients"],[1,"id"]],
    types: placeholder as Registry['ingredients.show']['types'],
  },
  'recipes.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/recipes',
    tokens: [[0,"api"],[0,"v1"],[0,"recipes"]],
    types: placeholder as Registry['recipes.index']['types'],
  },
  'recipes.match': {
    methods: ["POST"],
    pattern: '/api/v1/recipes/match',
    tokens: [[0,"api"],[0,"v1"],[0,"recipes"],[0,"match"]],
    types: placeholder as Registry['recipes.match']['types'],
  },
  'recipes.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/recipes/:id',
    tokens: [[0,"api"],[0,"v1"],[0,"recipes"],[1,"id"]],
    types: placeholder as Registry['recipes.show']['types'],
  },
  'pantry.pantry.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/pantry',
    tokens: [[0,"api"],[0,"v1"],[0,"pantry"]],
    types: placeholder as Registry['pantry.pantry.index']['types'],
  },
  'pantry.pantry.upsert': {
    methods: ["PUT"],
    pattern: '/api/v1/pantry/items',
    tokens: [[0,"api"],[0,"v1"],[0,"pantry"],[0,"items"]],
    types: placeholder as Registry['pantry.pantry.upsert']['types'],
  },
  'pantry.pantry.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/pantry/items/:ingredientId',
    tokens: [[0,"api"],[0,"v1"],[0,"pantry"],[0,"items"],[1,"ingredientId"]],
    types: placeholder as Registry['pantry.pantry.destroy']['types'],
  },
  'pantry.pantry.apply_updates': {
    methods: ["POST"],
    pattern: '/api/v1/pantry/apply',
    tokens: [[0,"api"],[0,"v1"],[0,"pantry"],[0,"apply"]],
    types: placeholder as Registry['pantry.pantry.apply_updates']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
