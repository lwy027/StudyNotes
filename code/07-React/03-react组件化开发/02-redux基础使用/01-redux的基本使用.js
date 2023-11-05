const { createStore } = require("redux");

//在实际开发中把type类型定义成常数，放在单独文件中
const CHANGE_NAME = "changeName";

//在实际开发中我们可以把type相同的封装在一个函数中，实现复用，并且在开发中针对类型函数单独放一个文件
const actionCreator = (name) => ({
  type: CHANGE_NAME,
  name,
});

//初始化state状态
const initialState = {
  name: "lwy",
  age: 20,
};

//reducer是个纯函数，在项目开发中reducer函数逻辑可以会很多，所以会单独放在一个文件
//作用:将传入的state和action结合起来生成一个新的state，并返回
function reducer(state = initialState, action) {
  switch (action.type) {
    case "changeName":
      // 更改state时，要以不可变的方式，不推荐之间对state进行修改，必须先复制原来的state
      //Redux 期望所有状态更新都是使用不可变的方式
      return { ...state, name: action.name };
    case "addValue":
      return { ...state, value: action.value };
    default:
      return state;
  }
}

//通过createStore传入一个函数可以创建一个store
//遵循单一数据源，一个项目只有一个store
//store中有3个属性
//getState() , dispatch(), subscript()
const store = createStore(reducer);

store.dispatch(actionCreator("jame"));
console.log(store.getState());

//订阅 dispatch action时的变化监听器
const unSubscribe = store.subscribe(() => {
  console.log("subscribe", store.getState());
});
//拿到返回值停止监听
unSubscribe();

store.dispatch({ type: "addValue", value: 30 });
console.log(store.getState());

store.dispatch(actionCreator("kebi"));
console.log(store.getState());
