import React, { memo } from 'react'

import { LoginInfoWrapper } from './style'

const LoginInfo = memo(() => {
  return (
    <LoginInfoWrapper>
      <img src="https://lf3-cdn2-tos.bytescm.com/toutiao/toutiao_web_pc/svgs/unlogin_bg.f00354c3.svg" alt="" />
      <div className='info'>
        <div>登录后, 头条更懂你</div>
        <div>内容更有趣</div>
      </div>
      <div className='login'>
        <button>立即登录</button>
      </div>
    </LoginInfoWrapper>
  )
})

export default LoginInfo
