// import "../css/div-style.css"
import "../css/h2-style.less"
const divEl = document.createElement('div')
document.body.append(divEl)
divEl.innerText = '我是div'
divEl.classList.add('content')
//创建l
const h2El = document.createElement('h2')

divEl.append(h2El)
h2El.innerText = '我是h2元'
h2El.classList.add('title')
