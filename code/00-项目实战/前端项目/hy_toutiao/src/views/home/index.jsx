import React, { memo, useState, useEffect } from 'react';
import { getNewsList } from '../../services/module/home'

import NewsItem from '../../components/news-item'
import { HomeWrapper } from './style'

export default memo(function Home() {
  const [newsList, setNewsList] = useState([])

  useEffect(() => {
    fetchNewsListAction(0)
  }, [])

  async function fetchNewsListAction() {
    const res = await getNewsList(0, 20)
    setNewsList(res.data.list)
  }

  return (
    <HomeWrapper>
      {
        newsList.map((item, index) => {
          return (
            <NewsItem key={index} itemInfo={item}/>
          )
        })
      }
    </HomeWrapper>
  )
})
