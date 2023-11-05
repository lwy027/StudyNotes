import React, { memo } from 'react'

import HeaderNav from '../header-nav'

import { AppHeaderWrapper } from './style'

import categoryJSON from '../../assets/json/category.json'

export default memo(function AppHeader() {

  function handleItemClick(id) {
    console.log(id)
  }

  return (
    <AppHeaderWrapper>
      <img className='logo' src="https://lf3-cdn2-tos.bytescm.com/toutiao/toutiao_web_pc/svgs/logo_red.5761dbf0.svg" alt="" />
      <div className='category'>
        <HeaderNav firstTitle="关注" 
                   items={categoryJSON} 
                   moreTitle="更多"
                   itemClick={handleItemClick}></HeaderNav>
      </div>
      <div className='search'>
        <input/>
        <button className='btn'><i></i></button>
      </div>
      <div className='login'>
        <button>登录</button>
      </div>
    </AppHeaderWrapper>
  )
})
