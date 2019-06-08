import recipeService from './s-recipes'

const s_recipeService = {}

s_recipeService.alls = (limit, offset) => {
	return recipeService.get('recipes/recipes/', {
		params: {
			limit: limit,
			offset: offset
		}
	})
}