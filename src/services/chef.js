import recipeService from './s-recipes'

const chefService = {}

chefService.alls = (limit, offset) => {
  return recipeService.get('recipes/chefs/', {
    params: {
      limit: limit,
      offset: offset
    }
  })
}

export default chefService
