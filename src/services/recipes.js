import recipeService from './s-recipes'

const recetaService = {}

recetaService.alls = async (limit, offset = 0) => {
  return recipeService.get('recipes/recipes/', {
    params: {
      limit: limit,
      offset: offset
    }
  })
}
export default recetaService
