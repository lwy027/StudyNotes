import React, { memo, useEffect, useState } from 'react'
import { getHotRanking } from '../../services/module/home'
import AreaHeader from '../area-header'

import { HotRankingWrapper } from './style'

const HotRanking = memo(() => {

  const [ hotRanks, setHotRanks ] = useState([])

  useEffect(() => {
    getHotRankingAction()
  }, [])

  async function getHotRankingAction() {
    const res = await getHotRanking()
    setHotRanks(res.data.list)
  }

  return (
    <HotRankingWrapper>
      <div className='header'>
        <AreaHeader title="头条热榜"/>
      </div>
      <div className='list'>
        {
          hotRanks.map((item, index) => {
            return (
              <div className='item' key={item._id}>
                <div className='number'>{index + 1}</div>
                <div className='title'>{item.Title}</div>
              </div>
            )
          })
        }
      </div>
    </HotRankingWrapper>
  )
})

export default HotRanking