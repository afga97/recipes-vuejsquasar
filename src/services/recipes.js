import recipeService from './s-recipes'

const recetaService = {}

recetaService.alls = (moreUrl = '') => {
  return recipeService.get(`recipes/recipes/${moreUrl}`)
}

recetaService.searhRecipes = (search, paginate) => {
  return recipeService.get(`recipes/recipes/`, {
    params: {
      search: search,
      nopaginate: paginate
    }
  })
}
export default recetaService
