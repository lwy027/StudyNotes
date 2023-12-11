#!/usr/bin/env node
const { program } = require("commander");
const helpOptions = require("./core/help-options");
const download = require("download-git-repo");
//使用git-clone的插件

//1.配置所有的options
helpOptions(program);

//2.增加具体的一些功能操作
program
  .command("create <project> [...others")
  .description("create vue project into a folder,例如:lwycli create demo")
  .action(function (project) {
    //触发功能的函数,peojet就是项目的名称
    //这里要从编写的项目模板中clone下来
    download("项目git地址", project, { clone: true });
    //很多的脚手架都是在这里提示
    console.log(`cd ${project}`);
    console.log(`npm install`);
    console.log(`npm run dev`);
  });

//让commander解析process.argv参数,上面的program.version会拿到命令行的命令,第一个参数是输出的结果
program.parse(process.argv);

//获取命令行额外传递的参数  这一段必须放在commander解析argv之后，因为前面还没有解析完毕
//dest属性为  "-d --dest <dest>", 中的<dest>, 这样就可以获取传递的参数
// console.log(program.opts().dest);
