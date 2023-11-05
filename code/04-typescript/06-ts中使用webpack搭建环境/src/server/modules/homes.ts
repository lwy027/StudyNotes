
import wyRequest from "../request";

interface IhomeData {
  data: any,

}

wyRequest.request<IhomeData>({
  url: "/city/all"
}).then(res => {
  console.log(res.data)
})

