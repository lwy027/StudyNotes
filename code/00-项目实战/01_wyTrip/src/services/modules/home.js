import wyRequest from "../request/index"


//热门建议
export function getHotSuggestsData() {
  return wyRequest.get({
    url: "/home/hotSuggests"
  })

}

//推荐类别
export function getCategoriesData() {
  return wyRequest.get({
    url: "/home/categories"
  })
}

//房屋列表
export function getHouselistData(currentPage) {
  return wyRequest.get({
    url: "/home/houselist",
    params: {
      page: currentPage
    }
  })
}

//商品详情
export function getDetailInfos(houseId) {
  return wyRequest.get({
    url: "/detail/infos",
    params: {
      houseId
    }
  })
}
