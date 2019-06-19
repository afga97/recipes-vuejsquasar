import recipeService from './s-recipes'

const recetaService = {}

recetaService.alls = (moreUrl = '') => {
  return recipeService.get(`recipes/recipes/${moreUrl}`)
}

recetaService.searhRecipes = (param) => {
  return recipeService.get(`recipes/recipes/?${param}`)
}
export default recetaService
