import * as sizesUseCase from './sizes.usecase.js'

const getSizes = async (req, res) => {
    const sizes = await sizesUseCase.getSizes()
    res.status(200).json(sizes)
}

const getSizeById = async (req, res) => {
    const { id } = req.params
    const size = await sizesUseCase.getSizeById(id)
    res.status(200).json(size)
}

const createSize = async (req, res) => {
    const size = await sizesUseCase.createSize(req.body)
    res.status(201).json(size)
}

const updateSize = async (req, res) => {
    const { id } = req.params
    const size = await sizesUseCase.updateSize(id, req.body)
    res.status(200).json(size)
}

const deleteSize = async (req, res) => {
    const { id } = req.params
    const size = await sizesUseCase.deleteSize(id)
    res.status(200).json(size)
}

export { getSizes, getSizeById, createSize, updateSize, deleteSize }