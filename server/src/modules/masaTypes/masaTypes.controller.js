import * as masaTypesUseCase from './masaTypes.usecase.js'

const getMasaTypes = async (req, res) => {
  const masaTypes = await masaTypesUseCase.getMasaTypes()
  res.status(200).json(masaTypes)
}

const getMasaTypeById = async (req, res) => {
  const { id } = req.params
  const masaType = await masaTypesUseCase.getMasaTypeById(id)
  res.status(200).json(masaType)
}

const createMasaType = async (req, res) => {
  const masaType = await masaTypesUseCase.createMasaType(req.body)
  res.status(201).json(masaType)
}

const updateMasaType = async (req, res) => {
  const { id } = req.params
  const masaType = await masaTypesUseCase.updateMasaType(id, req.body)
  res.status(200).json(masaType)
}

const deleteMasaType = async (req, res) => {
  const { id } = req.params
  const masaType = await masaTypesUseCase.deleteMasaType(id)
  res.status(200).json(masaType)
}

export { getMasaTypes, getMasaTypeById, createMasaType, updateMasaType, deleteMasaType }


