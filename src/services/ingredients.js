import recipeService from './s-recipes'

const ingredientService = {}

ingredientService.alls = (limit, offset) => {
  return recipeService.get('recipes/ingredients/', {
    params: {
      limit: limit,
      offset: offset
    }
  })
}

ingredientService.save = (chef) => {
  return recipeService.post('/recipes/ingredients/', {
    name: chef.name,
    surname: chef.surname,
    edad: chef.edad
  })
}

ingredientService.edit = (id) => {
  return recipeService.get(`/recipes/ingredients/${id}/`)
}

ingredientService.update = (chef) => {
  return recipeService.put(`/recipes/ingredients/${chef.id}/`, {
    name: chef.name,
    surname: chef.surname,
    edad: chef.edad
  })
}

export default ingredientService
