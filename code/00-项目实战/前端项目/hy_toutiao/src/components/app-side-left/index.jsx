import { memo } from "react";
import { HashRouter } from 'react-router-dom';
import RouterConfig from '../../router'

import { AppLeft } from './style'

export default memo(function AppSideLeft() {
  return (
    <AppLeft>
      <HashRouter>
        <RouterConfig/>
      </HashRouter>
    </AppLeft>
  )
})