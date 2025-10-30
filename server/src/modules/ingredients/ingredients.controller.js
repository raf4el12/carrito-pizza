import * as ingredientsUseCase from './ingredients.usecase.js'

const getIngredients = async (req, res) => {
    const ingredients = await ingredientsUseCase.getIngredients()
    res.status(200).json(ingredients)
}

const getIngredientById = async (req, res) => {
    const { id } = req.params
    const ingredient = await ingredientsUseCase.getIngredientById(id)
    res.status(200).json(ingredient)
}

const createIngredient = async (req, res) => {
    const ingredient = await ingredientsUseCase.createIngredient(req.body)
    res.status(201).json(ingredient)
}

const updateIngredient = async (req, res) => {
    const { id } = req.params
    const ingredient = await ingredientsUseCase.updateIngredient(id, req.body)
    res.status(200).json(ingredient)
}

const deleteIngredient = async (req, res) => {
    const { id } = req.params
    const ingredient = await ingredientsUseCase.deleteIngredient(id)
    res.status(200).json(ingredient)
}

export { getIngredients, getIngredientById, createIngredient, updateIngredient, deleteIngredient }