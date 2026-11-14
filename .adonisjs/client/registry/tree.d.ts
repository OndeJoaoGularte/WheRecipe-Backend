/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    newAccount: {
      store: typeof routes['auth.new_account.store']
    }
    accessTokens: {
      store: typeof routes['auth.access_tokens.store']
    }
  }
  profile: {
    profile: {
      show: typeof routes['profile.profile.show']
    }
    accessTokens: {
      destroy: typeof routes['profile.access_tokens.destroy']
    }
  }
  ingredients: {
    index: typeof routes['ingredients.index']
    categories: typeof routes['ingredients.categories']
    show: typeof routes['ingredients.show']
  }
  recipes: {
    index: typeof routes['recipes.index']
    match: typeof routes['recipes.match']
    show: typeof routes['recipes.show']
  }
  pantry: {
    pantry: {
      index: typeof routes['pantry.pantry.index']
      upsert: typeof routes['pantry.pantry.upsert']
      destroy: typeof routes['pantry.pantry.destroy']
      applyUpdates: typeof routes['pantry.pantry.apply_updates']
    }
  }
}
