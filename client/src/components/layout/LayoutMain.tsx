import { Outlet } from 'react-router'
import { Badge, IconButton } from '@mui/material'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import AppBarBase from './AppBarBase'

const LayoutMain = () => {
  const title = 'Pizza Hut'
  const navigate = useNavigate()
  const { items } = useCart()

  const actionLeft = (
    <IconButton color="inherit" onClick={() => navigate('/cart')} aria-label="Ver carrito">
      <Badge color="error" badgeContent={items.length} overlap="circular">
        <ShoppingCartOutlinedIcon />
      </Badge>
    </IconButton>
  )

  return (
    <>
      <AppBarBase title={title} actionLeft={actionLeft} />
      <Outlet />
    </>
  )
}

export default LayoutMain
