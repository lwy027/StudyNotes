

type ibfoObj = {
  time: number,
  text: string
}


function sum(o: string): ibfoObj[] {


  let obj: ibfoObj[] = []

  obj.push({ time: 11111, text: "天空好像下雨" })

  return obj
}

const sunnn = sum("lll")

sunnn.forEach(item => {

  console.log(item.text, item.text)
});


//void指定函数类型返回值
type funType = () => void

const foo: funType = () => {
  console.log("122")
  return 123
}
foo()


export { }