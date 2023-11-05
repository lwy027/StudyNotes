
//文件所在的文件夹
console.log(__dirname)
//文件所在的文件夹+自身文件名称
console.log(__filename)

setTimeout(() => {
  console.log('settimeout')
}, 200);

setInterval(() => {
  console.log('setInterval')
}, 2000)
setImmediate(() => {
  console.log('setimmediate')
})