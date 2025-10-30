import * as userUseCase from './user.usecase.js'



const getUsers = async (req, res) => {
  const users = await userUseCase.getUsuarios()
  res.status(200).json(users)
}

const getUserById = async (req, res) => {
  const { id } = req.params
  const user = await userUseCase.getUsuarioById(id)
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }
  res.status(200).json(user)
}

const createdUser = async (req, res) => {
  const user = await userUseCase.createdUsuario(req.body)
  res.status(201).json(user)
}

const updateUser = async (req, res) => {
  const { id } = req.params
  const user = await userUseCase.updateUsuarioById(id, req.body)
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }
  res.status(200).json(user)
}

const deleteUser = async (req, res) => {
  const { id } = req.params
  const user = await userUseCase.deleteUsuarioById(id)
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }
  res.status(200).json({ message: 'User deleted successfully' })
}

export { getUsers, getUserById, createdUser, updateUser, deleteUser }