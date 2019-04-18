import recipeService from './s-recipes';

const chefService = {}

chefService.alls = () => {
    return recipeService.get('recipes/chefs/')
}


export default chefService