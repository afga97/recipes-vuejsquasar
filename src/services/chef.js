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

chefService.save = (chef) => {
  return recipeService.post('/recipes/chefs/', {
    name: chef.name,
    surname: chef.surname,
    edad: chef.edad
  })
}

chefService.edit = (id) => {
  return recipeService.get(`/recipes/chefs/${id}/`)
}

chefService.update = (chef) => {
  return recipeService.put(`/recipes/chefs/${chef.id}/`, {
    name: chef.name,
    surname: chef.surname,
    edad: chef.edad
  })
}

export default chefService
