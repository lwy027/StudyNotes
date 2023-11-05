import React, { memo } from 'react'

import { AreaHeaderWrapper } from './style'

const AreaHeader = memo((props) => {
  const { title } = props

  return (
    <AreaHeaderWrapper>
      <div className='left'>
        <h3>{title}</h3>  
      </div>
      <div className='right'>
        <button>换一换</button>
      </div>
    </AreaHeaderWrapper>
  )
})

export default AreaHeader