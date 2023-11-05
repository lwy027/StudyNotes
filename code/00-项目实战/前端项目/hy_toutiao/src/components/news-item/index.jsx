import React, { memo } from 'react'
import { timestampToDate } from '../../utils/format'

import { NewsItemWrapper } from './style'

const NewsItem = memo((props) => {
  const { itemInfo } = props;

  const albumImg = itemInfo.image_list && itemInfo.image_list[0].url

  return (
    <NewsItemWrapper>
      <div className='info'>
        <div className='title'>{itemInfo.title}</div>
        <div className='desc'>
          <span className='anthor'>{itemInfo.user_info.name}</span>
          <span className='comment'>{itemInfo.comment_count}评论</span>
          <span className='time'>{timestampToDate(itemInfo.publish_time)}</span>
        </div>
      </div>
      <div className='album'>
        { albumImg ? <img src={albumImg} alt="" />: '' }
      </div>
    </NewsItemWrapper>
  )
})

export default NewsItem