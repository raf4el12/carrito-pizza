import * as variantsUseCase from './variants.usecase.js'

const getVariantsProducts = async (req, res) => {
    const variants = await variantsUseCase.getVariantsProducts()
    res.status(200).json(variants)
}

const getVariantProductById = async (req, res) => {
    const { id } = req.params
    const variant = await variantsUseCase.getVariantProductById(id)
    res.status(200).json(variant)
}

const createVariantProduct = async (req, res) => {
    const variant = await variantsUseCase.createVariantProduct(req.body)
    res.status(201).json(variant)
}

const updateVariantProduct = async (req, res) => {
    const { id } = req.params
    const variant = await variantsUseCase.updateVariantProduct(id, req.body)
    res.status(200).json(variant)
}

const deleteVariantProduct = async (req, res) => {
    const { id } = req.params
    const variant = await variantsUseCase.deleteVariantProduct(id)
    res.status(200).json(variant)
}

export { getVariantsProducts, getVariantProductById, createVariantProduct, updateVariantProduct, deleteVariantProduct }