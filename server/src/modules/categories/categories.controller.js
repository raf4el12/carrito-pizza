import * as categoriesUseCase from './categories.usecase.js'

const getCategories = async (req, res) => {
    const categories = await categoriesUseCase.getCategories()
    res.status(200).json(categories)
}

const getCategoryById = async (req, res) => {
    const { id } = req.params
    const category = await categoriesUseCase.getCategoryById(id)
    res.status(200).json(category)
}

const createCategory = async (req, res) => {
    const category = await categoriesUseCase.createCategory(req.body)
    res.status(201).json(category)
}

const updateCategory = async (req, res) => {
    const { id } = req.params
    const category = await categoriesUseCase.updateCategory(id, req.body)
    res.status(200).json(category)
}

const deleteCategory = async (req, res) => {
    const { id } = req.params
    const category = await categoriesUseCase.deleteCategory(id)
    res.status(200).json(category)
}

export { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory }
