import React, { memo, useEffect, useState } from 'react'
import { getHotVideos } from '../../services/module/home'

import AreaHeader from '../area-header'
import VideoItem from '../video-item'

import { HotVideosWrapper } from './style'

const HotVideos = memo(() => {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    getHotVideoAction()
  }, [])

  async function getHotVideoAction() {
    const res = await getHotVideos(0, 10)
    setVideos(res.data.list)
  }

  return (
    <HotVideosWrapper>
      <AreaHeader title="热门视频"/>
      <div className='list'>
        {
          videos.slice(0, 5).map((item, index) => {
            return <VideoItem key={item._id} itemInfo={item} index={index}/>
          })
        }
      </div>
    </HotVideosWrapper>
  )
})

export default HotVideos