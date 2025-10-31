import { Outlet } from 'react-router'

import AppBarBase from './AppBarBase'

const LayoutMain = () => {
  const title = 'Pizza Hut'

  return (
    <>
      <AppBarBase title={title} />
      <Outlet />
    </>
  )
}

export default LayoutMain
