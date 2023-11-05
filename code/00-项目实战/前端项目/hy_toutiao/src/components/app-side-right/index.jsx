import React, { memo } from 'react'

import LoginInfo from '../login-info'
import HotRanking from '../hot-ranking'
import HotVideos from '../hot-videos'

import { AppRightWrapper } from './style'

const AppSideRight = memo(() => {
  return (
    <AppRightWrapper>
      <LoginInfo userInfo={{}}/>
      <HotRanking/>
      <HotVideos/>
    </AppRightWrapper>
  )
})

export default AppSideRight