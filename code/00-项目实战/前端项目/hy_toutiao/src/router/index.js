import { Navigate, useRoutes } from 'react-router-dom'

import Home from '../views/home'
import Detail from '../views/detail'
import Favor from '../views/favor'

function RouterConfig() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Navigate to="/home"></Navigate>
    },
    {
      path: "/home",
      element: <Home/>
    },
    {
      path: "/detail",
      element: <Detail/>
    },
    {
      path: "/favor",
      element: <Favor/>
    }
  ])

  return routes
}

export default RouterConfig
