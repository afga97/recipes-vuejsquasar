import axios from 'axios';
import configService from './config'

const recipeService = axios.create({
    baseURL: `http://localhost:8000/`,
    withCredentials: false,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

export default recipeService
