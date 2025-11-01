const AdminDashboard = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Pedidos Pendientes
          </h3>
          <p className="text-3xl font-bold text-red-600">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Ingresos del Mes
          </h3>
          <p className="text-3xl font-bold text-green-600">$0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Productos Activos
          </h3>
          <p className="text-3xl font-bold text-blue-600">0</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Bienvenido al Panel de Administración</h2>
        <p className="text-gray-600">
          Aquí podrás gestionar pedidos, productos, categorías y más.
        </p>
      </div>
    </div>
  )
}

export default AdminDashboard
