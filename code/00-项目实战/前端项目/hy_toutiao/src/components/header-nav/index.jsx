import { memo, useState } from 'react'
import classnames from 'classnames'

import { NavWrapper } from './style'

export default memo(function HeaderNav(props) {
  const { firstTitle, items, moreTitle, itemClick } = props;

  // 显示的数据
  const showIndex = 6
  const [showItems, setShowItems] = useState(items.slice(0, showIndex + 1))
  const [leftItems, setLeftItems] = useState(items.slice(showIndex + 1))

  // -1为关注的id
  const [currentID, setCurrentID] = useState(-1)

  function setItem(id) {
    setCurrentID(id)
    itemClick(id)
  }

  function changeShowItems(item) {
    // 处理显示的items
    showItems.splice(showIndex, 1)
    setShowItems([...showItems, item])

    // 处理剩余的items
    const leftItems = items.slice(showIndex)
    const itemIndex = leftItems.indexOf(item)
    leftItems.splice(itemIndex, 1)
    setLeftItems(leftItems)

    // 设置当前item的选中
    setItem(item.channelId)
  }

  return (
    <NavWrapper>
      <div className={classnames("first", { active: currentID === -1 })}
           onClick={() => setItem(-1)}>
        {firstTitle}
      </div>
      <div className='list'>
        {
          showItems.map((item, index) => {
            return (
              <div key={item.channelId} 
                   className={classnames("item", { active: currentID === item.channelId })}
                   onClick={() => setItem(item.channelId)}>
                {item.name}
              </div>
            )
          })
        }
      </div>
      <div className='last'>
        <span className='title'>{moreTitle}</span>
        <div className='more'>
          {
            leftItems.map((item, index) => {
              return (
                <div className='item' key={item.channelId}
                     onClick={() => changeShowItems(item)}>
                  {item.name}
                </div>
              )
            })
          }
        </div>
      </div>
    </NavWrapper>
  )
})
