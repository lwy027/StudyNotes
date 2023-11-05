const { sum, foo, bar, arrow } = require('./utils/main')
import "./css/div_style.css"
import "./css/h2_style.less"

sum(20, 30)

const divEl = document.createElement('div')
divEl.innerText = "我是div"
document.body.append(divEl)

const h2El = document.createElement('h2')
h2El.innerText = "我是h2元素"
divEl.append(h2El)
h2El.classList.add("title")
divEl.classList.add('div_style')



console.log('====================')
foo()
bar()
arrow()