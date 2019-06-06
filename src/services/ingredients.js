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

ingredientService.save = (ingredient) => {
  return recipeService.post('/recipes/ingredients/', {
    name: ingredient.name,
    description: ingredient.description,
    categorie: ingredient.categorie.value
  })
}

ingredientService.edit = (id) => {
  return recipeService.get(`/recipes/ingredients/${id}/`)
}

ingredientService.update = (ingredient) => {
  return recipeService.put(`/recipes/ingredients/${ingredient.id}/`, {
    name: ingredient.name,
    description: ingredient.description,
    categorie: ingredient.categorie.value
  })
}

ingredientService.getCategories = () => {
  return recipeService.get(`/recipes/categories/?nopaginate=True/`)
}

export default ingredientService
