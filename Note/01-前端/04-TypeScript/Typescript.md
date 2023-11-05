#  快速入门

## 0、TypeScript简介

1. TypeScript是JavaScript的超集。
2. 它对JS进行了扩展，向JS中引入了类型的概念，并添加了许多新的特性。
3. TS代码需要通过编译器编译为JS，然后再交由JS解析器执行。
4. TS完全兼容JS，换言之，任何的JS代码都可以直接当成JS使用。
5. 相较于JS而言，TS拥有了静态类型，更加严格的语法，更强大的功能；TS可以在代码执行前就完成代码的检查，减小了运行时异常的出现的几率；TS代码可以编译为任意版本的JS代码，可有效解决不同JS运行环境的兼容问题；同样的功能，TS的代码量要大于JS，但由于TS的代码结构更加清晰，变量类型更加明确，在后期代码的维护中TS却远远胜于JS。



## 1、TypeScript 开发环境搭建

1. 下载Node.js
   - 64位：https://nodejs.org/dist/v14.15.1/node-v14.15.1-x64.msi
   - 32位：https://nodejs.org/dist/v14.15.1/node-v14.15.1-x86.msi
   
2. 安装Node.js

3. 使用npm全局安装typescript
   - 进入命令行
   - 输入：npm i -g typescript
   
4. 创建一个ts文件

5. 使用tsc对ts文件进行编译
   - 进入命令行
   
   - 进入ts文件所在目录
   
   - 执行命令：tsc xxx.ts
   
     

## 2、基本类型

- 类型声明

  - 类型声明是TS非常重要的一个特点

  - 通过类型声明可以指定TS中变量（参数、形参）的类型

  - 指定类型后，当为变量赋值时，TS编译器会自动检查值是否符合类型声明，符合则赋值，否则报错

  - 简而言之，类型声明给变量设置了类型，使得变量只能存储某种类型的值

  - 语法：

    - ```typescript
      let 变量: 类型;
      
      let 变量: 类型 = 值;
      
      function fn(参数: 类型, 参数: 类型): 类型{
          ...
      }
      ```

- 自动类型判断

  - TS拥有自动的类型判断机制
  - 当对变量的声明和赋值是同时进行的，TS编译器会自动判断变量的类型
  - 所以如果你的变量的声明和赋值时同时进行的，可以省略掉类型声明

- 类型：

  |  类型   |                       例子                        |              描述              |
  | :-----: | :-----------------------------------------------: | :----------------------------: |
  | number  |                    1, -33, 2.5                    |            任意数字            |
  | string  |                 'hi', "hi", `hi`                  |           任意字符串           |
  | boolean |                    true、false                    |       布尔值true或false        |
  | 字面量  |                      其本身                       |  限制变量的值就是该字面量的值  |
  |   any   |                         *                         |            任意类型            |
  | unknown |                         *                         |         类型安全的any          |
  |  void   |                 空值（undefined）                 |   没有返回值（或undefined）    |
  |  never  |                      没有值                       |          不能是任何值          |
  | object  | {name:'孙悟空'}：规定以后写对象必须按照着这个格式 |          任意的JS对象          |
  |  array  |                      [1,2,3]                      |           任意JS数组           |
  |  tuple  |                       [4,5]                       | 元素，TS新增类型，固定长度数组 |
  |  enum   |                    enum{A, B}                     |       枚举，TS中新增类型       |

- number

  - ```typescript
    let decimal: number = 6;
    let hex: number = 0xf00d;
    let binary: number = 0b1010;
    let octal: number = 0o744;
    let big: bigint = 100n;
    ```

- boolean

  - ```typescript
    let isDone: boolean = false;
    ```

- string

  - ```typescript
    let color: string = "blue";
    color = 'red';
    
    let fullName: string = `Bob Bobbington`;
    let age: number = 37;
    let sentence: string = `Hello, my name is ${fullName}.
    
    I'll be ${age + 1} years old next month.`;
    ```

- 字面量

  - 也可以使用字面量去指定变量的类型，通过字面量可以确定变量的取值范围

  - ```typescript
    let color: 'red' | 'blue' | 'black';
    let num: 1 | 2 | 3 | 4 | 5;
    ```

- any

  - ```typescript
    let d: any = 4;
    d = 'hello';
    d = true;
    ```

- unknown

  - 和any类型有点类似，但是unknown类型的值上做任何事情都是不合法的

  - ```typescript
    let notSure: unknown = 4;
    notSure = 'hello';
    //如果直接操作notSure会报错，不可以对值做任何事情，只能进行校验之后才可以使用
    if (typeof notSure === "string") {
      console.log(notSure.length)
    }
    ```

- void

  - ```typescript
    let unusable: void = undefined;
    
    function bar(num: number): void {
      console.log(num)
    }
    bar(1) //返回值为undefined
    ```

  - 通常用于指定函数类型

    ```ts
    //void指定函数类型返回值为void也就是undefined
    type funType = () => void
    
    const foo: funType = () => {
      return 123
    }
    ```

  - **当基于上下文的类型推导（Contextual Typing）推导出返回类型为 void 的时候，并不会强制函数一定不能返回内容。**

- never

  - **never 表示永远不会发生值的类型，比如一个函数：**
    - 如果一个函数中是一个死循环或者抛出一个异常，那么这个函数会返回东西吗？
    - 不会，那么写void类型或者其他类型作为返回值类型都不合适，我们就可以使用never类型；

  - ```typescript
    function error(message: string): never {
      throw new Error(message);
    }
    ```

- object（没啥用）

  - ```typescript
    let obj: object = {};
    ```

- array

  - ```typescript
    let list: number[] = [1, 2, 3];
    let list: Array<number> = [1, 2, 3];
    ```

- tuple

  - ```typescript
    let x: [string, number];
    x = ["hello", 10]; 
    
    //数组
    const  info:(string|number)[]=["why",18,1.88]
    const  iteml=·info[o]//,不能确定类型
    //元组
    const tInfo:[string,number,number]=["why",18,1.88]
    const item2·=·tInfo[o]//一定是string.类型
    ```
  - **tuple和数组有什么区别呢？**
    
    - 首先，**数组中通常建议存放相同类型的元素，不同类型的元素是不推荐放在数组中**。（可以放在对象或者元组中）z
    - 其次，**元组中每个元素都有自己特定的类型，根据索引值获取到的值可以确定对应的类型；**
  - **Tuple的应用场景：**
    
    - **tuple通常可以作为返回的值，在使用的时候会非常的方便；**
    - 返回特定类型

- enum

  - 枚举类型是为数不多的TypeScript特性有的特性之一：
  - 枚举其实就是将一组可能出现的值，一个个列举出来，定义在一个类型中，这个类型就是枚举类型；
  - 枚举允许开发者定义一组命名常量，常量可以是数字、字符串类型；

  - ```typescript
    enum Color {
      Red,
      Green,
      Blue,
    }
    let c: Color = Color.Green; 
    
    enum Color {
        //枚举类型默认是有值的，比如上面的枚举，默认值是这样的：
        //如果不写值时，默认为0
        //值会单调递增
      Red = 1,
      Green = 2,
      Blue = 3,
    }
    ```

- 类型断言

  - 有些情况下，变量的类型对于我们来说是很明确，但是TS编译器却并不清楚，此时，可以通过类型断言来告诉编译器变量的类型，断言有两种形式：

    - 第一种

      - ```typescript
        let someValue: unknown = "this is a string";
        let strLength: number = (someValue as string).length;
        ```

    - 第二种

      - ```typescript
        let someValue: unknown = "this is a string";
        let strLength: number = (<string>someValue).length;
        ```

- 非空类型断言!

  - **当我们编写下面的代码时，在执行ts的编译阶段会报错：**

    - 这是因为传入的message有可能是为undefined的，这个时候是不能执行方法的；

    ```ts
    function printMessage(message?:string){
    //error TS2532:Object is possibly:'undefined
    console.log(message.toUppercase())
    }
    printMessage("hello")
    ```

  - **但是，我们确定传入的参数是有值的，这个时候我们可以使用非空类型断言：**
    
    - **非空断言使用的是!**，表示**可以确定某个标识符是有值**的，**跳过ts在编译阶段对它的检测；**

  ```ts
  function printMessage(message?:string){
  console.log(message!.toUppercase())
  ```

- 可选类型

  - 对象类型也可以指定哪些属性是可选的，可以在属性的后面添加一个？

  ```ts
  type printType = { x: number, y: number, z?: number }
  
  function printCoordinate(point: printType) {
      
    console.log(point.x, point.y, point.z) //111 222 undefined
  }
  
  printCoordinate({ x: 111, y: 222 })
  ```

  



## 3、编译选项

- 自动编译文件

  - 编译文件时，使用 -w 指令后，TS编译器会自动监视文件的变化，并在文件发生变化时对文件进行重新编译。

  - 示例：

    - ```powershell
      tsc xxx.ts -w
      ```

- 自动编译整个项目

  - 如果直接使用tsc指令，则可以自动将当前项目下的所有ts文件编译为js文件。

  - 但是能直接使用tsc命令的前提时，要先在项目根目录下创建一个ts的配置文件 tsconfig.json

  - tsconfig.json是一个JSON文件，添加配置文件后，只需只需 tsc 命令即可完成对整个项目的编译

  - 配置选项：

    - include

      - 定义希望被编译文件所在的目录

      - 默认值：["\*\*/\*"]

      - 示例：

        - ```json
          "include":["src/**/*", "tests/**/*"]
          ```

        - 上述示例中，所有src目录和tests目录下的文件都会被编译

    - exclude

      - 定义需要排除在外的目录

      - 默认值：["node_modules", "bower_components", "jspm_packages"]

      - 示例：

        - ```json
          "exclude": ["./src/hello/**/*"]
          ```

        - 上述示例中，src下hello目录下的文件都不会被编译

    - extends

      - 定义被继承的配置文件

      - 示例：

        - ```json
          "extends": "./configs/base"
          ```

        - 上述示例中，当前配置文件中会自动包含config目录下base.json中的所有配置信息

    - files

      - 指定被编译文件的列表，只有需要编译的文件少时才会用到

      - 示例：

        - ```json
          "files": [
              "core.ts",
              "sys.ts",
              "types.ts",
              "scanner.ts",
              "parser.ts",
              "utilities.ts",
              "binder.ts",
              "checker.ts",
              "tsc.ts"
            ]
          ```

        - 列表中的文件都会被TS编译器所编译

      - compilerOptions

        - 编译选项是配置文件中非常重要也比较复杂的配置选项

        - 在compilerOptions中包含多个子选项，用来完成对编译的配置

          - 项目选项

            - target

              - 设置ts代码编译的目标版本

              - 可选值：

                - ES3（默认）、ES5、ES6/ES2015、ES7/ES2016、ES2017、ES2018、ES2019、ES2020、ESNext

              - 示例：

                - ```json
                  "compilerOptions": {
                      "target": "ES6"
                  }
                  ```

                - 如上设置，我们所编写的ts代码将会被编译为ES6版本的js代码

            - lib

              - 指定代码运行时所包含的库（宿主环境）

              - 可选值：

                - ES5、ES6/ES2015、ES7/ES2016、ES2017、ES2018、ES2019、ES2020、ESNext、DOM、WebWorker、ScriptHost ......

              - 示例：

                - ```json
                  "compilerOptions": {
                      "target": "ES6",
                      "lib": ["ES6", "DOM"],
                      "outDir": "dist",
                      "outFile": "dist/aa.js"
                  }
                  ```

            - module

              - 设置编译后代码使用的模块化系统

              - 可选值：

                - CommonJS、UMD、AMD、System、ES2020、ESNext、None

              - 示例：

                - ```typescript
                  "compilerOptions": {
                      "module": "CommonJS"
                  }
                  ```

            - outDir

              - 编译后文件的所在目录

              - 默认情况下，编译后的js文件会和ts文件位于相同的目录，设置outDir后可以改变编译后文件的位置

              - 示例：

                - ```json
                  "compilerOptions": {
                      "outDir": "dist"
                  }
                  ```

                - 设置后编译后的js文件将会生成到dist目录

            - outFile

              - 将所有的文件编译为一个js文件

              - 默认会将所有的编写在全局作用域中的代码合并为一个js文件，如果module制定了None、System或AMD则会将模块一起合并到文件之中

              - 示例：

                - ```json
                  "compilerOptions": {
                      "outFile": "dist/app.js"
                  }
                  ```

            - rootDir

              - 指定代码的根目录，默认情况下编译后文件的目录结构会以最长的公共目录为根目录，通过rootDir可以手动指定根目录

              - 示例：

                - ```json
                  "compilerOptions": {
                      "rootDir": "./src"
                  }
                  ```

            - allowJs

              - 是否对js文件编译

            - checkJs

              - 是否对js文件进行检查

              - 示例：

                - ```json
                  "compilerOptions": {
                      "allowJs": true,
                      "checkJs": true
                  }
                  ```

            - removeComments

              - 是否删除注释
              - 默认值：false

            - noEmit

              - 不对代码进行编译
              - 默认值：false

            - sourceMap

              - 是否生成sourceMap
              - 默认值：false

              

          - 严格检查

            - strict
              - 启用所有的严格检查，默认值为true，设置后相当于开启了所有的严格检查
            - alwaysStrict
              - 总是以严格模式对代码进行编译
            - noImplicitAny
              - 禁止隐式的any类型
            - noImplicitThis
              - 禁止类型不明确的this
            - strictBindCallApply
              - 严格检查bind、call和apply的参数列表
            - strictFunctionTypes
              - 严格检查函数的类型
            - strictNullChecks
              - 严格的空值检查
            - strictPropertyInitialization
              - 严格检查属性是否初始化

          - 额外检查

            - noFallthroughCasesInSwitch
              - 检查switch语句包含正确的break
            - noImplicitReturns
              - 检查函数没有隐式的返回值
            - noUnusedLocals
              - 检查未使用的局部变量
            - noUnusedParameters
              - 检查未使用的参数

          - 高级

            - allowUnreachableCode
              - 检查不可达代码
              - 可选值：
                - true，忽略不可达代码
                - false，不可达代码将引起错误
            - noEmitOnError
              - 有错误的情况下不进行编译
              - 默认值：false

## 4、webpack

- 通常情况下，实际开发中我们都需要使用构建工具对代码进行打包，TS同样也可以结合构建工具一起使用，下边以webpack为例介绍一下如何结合构建工具使用TS。

- 步骤：

  1. 初始化项目

     - 进入项目根目录，执行命令 ``` npm init -y```
       - 主要作用：创建package.json文件

  2. 下载构建工具

     - ```npm i -D webpack webpack-cli webpack-dev-server typescript ts-loader clean-webpack-plugin```
       - 共安装了7个包
         - webpack
           - 构建工具webpack
         - webpack-cli
           - webpack的命令行工具
         - webpack-dev-server
           - webpack的开发服务器
         - typescript
           - ts编译器
         - ts-loader
           - ts加载器，用于在webpack中编译ts文件
         - html-webpack-plugin
           - webpack中html插件，用来自动创建html文件
         - clean-webpack-plugin
           - webpack中的清除插件，每次构建都会先清除目录

  3. 根目录下创建webpack的配置文件webpack.config.js

     - ```javascript
       const path = require("path");
       const HtmlWebpackPlugin = require("html-webpack-plugin");
       const { CleanWebpackPlugin } = require("clean-webpack-plugin");
       
       module.exports = {
           optimization:{
               minimize: false // 关闭代码压缩，可选
           },
       
           entry: "./src/index.ts",
           
           devtool: "inline-source-map",
           
           devServer: {
               contentBase: './dist'
           },
       
           output: {
               path: path.resolve(__dirname, "dist"),
               filename: "bundle.js",
               environment: {
                   arrowFunction: false // 关闭webpack的箭头函数，可选
               }
           },
       
           resolve: {
               extensions: [".ts", ".js"]
           },
           
           module: {
               rules: [
                   {
                       test: /\.ts$/,
                       use: {
                          loader: "ts-loader"     
                       },
                       exclude: /node_modules/
                   }
               ]
           },
       
           plugins: [
               new CleanWebpackPlugin(),
               new HtmlWebpackPlugin({
                   title:'TS测试'
               }),
           ]
       
       }
       ```

  4. 根目录下创建tsconfig.json，配置可以根据自己需要

     - ```json
       {
           "compilerOptions": {
               "target": "ES2015",
               "module": "ES2015",
               "strict": true
           }
       }
       ```

  5. 修改package.json添加如下配置

     - ```json
       {
         ...略...
         "scripts": {
           "test": "echo \"Error: no test specified\" && exit 1",
           "build": "webpack",
           "start": "webpack serve --open chrome.exe"
         },
         ...略...
       }
       ```

  6. 在src下创建ts文件，并在并命令行执行```npm run build```对代码进行编译，或者执行```npm start```来启动开发服务器

     

## 5、Babel

- 经过一系列的配置，使得TS和webpack已经结合到了一起，除了webpack，开发中还经常需要结合babel来对代码进行转换以使其可以兼容到更多的浏览器，在上述步骤的基础上，通过以下步骤再将babel引入到项目中。

  1. 安装依赖包：
     - ```npm i -D @babel/core @babel/preset-env babel-loader core-js```
     - 共安装了4个包，分别是：
       - @babel/core
         - babel的核心工具
       - @babel/preset-env
         - babel的预定义环境
       - @babel-loader
         - babel在webpack中的加载器
       - core-js
         - core-js用来使老版本的浏览器支持新版ES语法

  2. 修改webpack.config.js配置文件

     - ```javascript
       ...略...
       module: {
           rules: [
               {
                   test: /\.ts$/,
                   use: [
                       //配置babel
                       {
                           //指定加载器
                           loader: "babel-loader",
                           //设置babel
                           options:{
                               //设置预定义环境
                               presets: [
                                   [
                                       //指定环境插件
                                       "@babel/preset-env",
                                       {
                                           //要兼容的目标浏览器
                                           "targets":{
                                               "chrome": "58",
                                               "ie": "11"
                                           },
                                           //指定core.js的版本
                                           "corejs":"3",
                                           //指定core.js的方式，"usage"便是按需加载
                                           "useBuiltIns": "usage"
                                       }
                                   ]
                               ]
                           }
                       },
                       {
                           loader: "ts-loader",
       
                       }
                   ],
                   exclude: /node_modules/
               }
           ]
       }
       ...略...
       ```
       
     - 如此一来，使用ts编译后的文件将会再次被babel处理，使得代码可以在大部分浏览器中直接使用，可以在配置选项的targets中指定要兼容的浏览器版本。

## 6、使用ts-node

- **方式二：安装ts-node**

  ```shell
  npm install ts-node -g
  ```

- **另外ts-node需要依赖 tslib 和 @types/node 两个包：**

```shell
npm install tslib @types/node -g
```

- **现在，我们可以直接通过 ts-node 来运行TypeScript的代码：**

```shell
ts-node 文件名
```

# 面向对象

面向对象是程序中一个非常重要的思想，它被很多同学理解成了一个比较难，比较深奥的问题，其实不然。面向对象很简单，简而言之就是程序之中所有的操作都需要通过对象来完成。

- 举例来说：
  - 操作浏览器要使用window对象
  - 操作网页要使用document对象
  - 操作控制台要使用console对象

一切操作都要通过对象，也就是所谓的面向对象，那么对象到底是什么呢？这就要先说到程序是什么，计算机程序的本质就是对现实事物的抽象，抽象的反义词是具体，比如：照片是对一个具体的人的抽象，汽车模型是对具体汽车的抽象等等。程序也是对事物的抽象，在程序中我们可以表示一个人、一条狗、一把枪、一颗子弹等等所有的事物。一个事物到了程序中就变成了一个对象。

在程序中所有的对象都被分成了两个部分数据和功能，以人为例，人的姓名、性别、年龄、身高、体重等属于数据，人可以说话、走路、吃饭、睡觉这些属于人的功能。数据在对象中被成为属性，而功能就被称为方法。所以简而言之，在程序中一切皆是对象。

## 1、类（class）

要想面向对象，操作对象，首先便要拥有对象，那么下一个问题就是如何创建对象。要创建对象，必须要先定义类，所谓的类可以理解为对象的模型，程序中可以根据类创建指定类型的对象，举例来说：可以通过Person类来创建人的对象，通过Dog类创建狗的对象，通过Car类来创建汽车的对象，不同的类可以用来创建不同的对象。

- 定义类：

  - ```typescript
    class 类名 {
        //在ts中，必须在类中声明成员属性
    	属性名: 类型;
    	
    	constructor(参数: 类型){
    		this.属性名 = 参数;
    	}
    	
    	方法名(){
    		....
    	}
    
    }
    ```

- 示例：

  - ```typescript
    class Person{
        name: string;
        age: number;
    
        constructor(name: string, age: number){
            this.name = name;
            this.age = age;
        }
    
        sayHello(){
            console.log(`大家好，我是${this.name}`);
        }
    }
    ```

- 使用类：

  - ```typescript
    const p = new Person('孙悟空', 18);
    p.sayHello();
    ```

## 2、面向对象的特点

- 封装

  - 对象实质上就是属性和方法的容器，它的主要作用就是存储属性和方法，这就是所谓的封装

  - 默认情况下，对象的属性是可以任意的修改的，为了确保数据的安全性，在TS中可以对属性的权限进行设置

  - 只读属性（readonly）：

    - 如果在声明属性时添加一个readonly，则属性便成了只读属性无法修改

  - TS中属性具有三种修饰符：

    - public（默认值），可以在类、子类和对象中修改
    - protected ，可以在类、子类中修改
    - private ，可以在类中修改

  - 示例：

    - public

      - ```typescript
        class Person{
            public name: string; // 写或什么都不写都是public
            public age: number;
        
            constructor(name: string, age: number){
                this.name = name; // 可以在类中修改
                this.age = age;
            }
        
            sayHello(){
                console.log(`大家好，我是${this.name}`);
            }
        }
        
        class Employee extends Person{
            constructor(name: string, age: number){
                super(name, age);
                this.name = name; //子类中可以修改
            }
        }
        
        const p = new Person('孙悟空', 18);
        p.name = '猪八戒';// 可以通过对象修改
        ```

    - protected

      - ```typescript
        class Person{
            protected name: string;
            protected age: number;
        
            constructor(name: string, age: number){
                this.name = name; // 可以修改
                this.age = age;
            }
        
            sayHello(){
                console.log(`大家好，我是${this.name}`);
            }
        }
        
        class Employee extends Person{
        
            constructor(name: string, age: number){
                super(name, age);
                this.name = name; //子类中可以修改
            }
        }
        
        const p = new Person('孙悟空', 18);
        p.name = '猪八戒';// 不能修改
        ```

    - private

      - ```typescript
        class Person{
            private name: string;
            private age: number;
        
            constructor(name: string, age: number){
                this.name = name; // 可以修改
                this.age = age;
            }
        
            sayHello(){
                console.log(`大家好，我是${this.name}`);
            }
        }
        
        class Employee extends Person{
        
            constructor(name: string, age: number){
                super(name, age);
                this.name = name; //子类中不能修改
            }
        }
        
        const p = new Person('孙悟空', 18);
        p.name = '猪八戒';// 不能修改
        ```

  - 属性存取器

    - 对于一些不希望被任意修改的属性，可以将其设置为private

    - 直接将其设置为private将导致无法再通过对象修改其中的属性

    - 我们可以在类中定义一组读取、设置属性的方法，这种对属性读取或设置的属性被称为属性的存取器

    - 读取属性的方法叫做setter方法，设置属性的方法叫做getter方法

    - 示例：

      - ```typescript
        class Person{
            private _name: string;
        
            constructor(name: string){
                this._name = name;
            }
        
            get name(){
                return this._name;
            }
        
            set name(name: string){
                this._name = name;
            }
        
        }
        
        const p1 = new Person('孙悟空');
        console.log(p1.name); // 通过getter读取name属性
        p1.name = '猪八戒'; // 通过setter修改name属性
        ```

  - 静态属性

    - 静态属性（方法），也称为类属性。使用静态属性无需创建实例，通过类即可直接使用

    - 静态属性（方法）使用static开头

    - 示例：

      - ```typescript
        class Tools{
            static PI = 3.1415926;
            
            static sum(num1: number, num2: number){
                return num1 + num2
            }
        }
        
        console.log(Tools.PI);
        console.log(Tools.sum(123, 456));
        ```

  - this

    - 在类中，使用this表示当前对象

- 继承

  - 继承时面向对象中的又一个特性

  - 通过继承可以将其他类中的属性和方法引入到当前类中

    - 示例：

      - ```typescript
        class Animal{
            name: string;
            age: number;
        
            constructor(name: string, age: number){
                this.name = name;
                this.age = age;
            }
        }
        
        class Dog extends Animal{
        
            bark(){
                console.log(`${this.name}在汪汪叫！`);
            }
        }
        
        const dog = new Dog('旺财', 4);
        dog.bark();
        
        ```

  - 使用extends关键字来实现继承，子类中使用super来访问父类。

  - 通过继承可以在不修改类的情况下完成对类的扩展

  - 重写

    - 发生继承时，如果子类中的方法会替换掉父类中的同名方法，这就称为方法的重写

    - 示例：
  
      - ```typescript
        class Animal{
            name: string;
            age: number;
        
            constructor(name: string, age: number){
                this.name = name;
                this.age = age;
            }
        
            run(){
                console.log(`父类中的run方法！`);
            }
        }
        
        class Dog extends Animal{
        
            bark(){
                console.log(`${this.name}在汪汪叫！`);
            }
        
            run(){
                console.log(`子类中的run方法，会重写父类中的run方法！`);
            }
        }
        
        const dog = new Dog('旺财', 4);
        dog.bark();
      
        ```

      - 在子类中可以使用super来完成对父类的引用

  - 抽象类（abstract class）

    - 抽象类是专门用来被其他类所继承的类，它只能被其他类所继承不能用来创建实例
  
    - ```typescript
      abstract class Animal{
          abstract run(): void;
          bark(){
              console.log('动物在叫~');
          }
      }
      
      class Dog extends Animals{
          run(){
              console.log('狗在跑~');
          }
      }
    
      ```

    - **使用abstract开头的方法叫做抽象方法，抽象方法没有方法体只能定义在抽象类中，继承抽象类时抽象方法必须要实现**

#### 参数属性（Parameter Properties）

- **TypeScript 提供了特殊的语法，可以把一个构造函数参数转成一个同名同值的类属性。**

  - 这些就被称为参数属性（parameter properties）；
  - 你可以通过在构造函数参数前**添加一个可见性修饰符 public private protected 或者 readonly 来创建参数属性**，最后**这些类属性字段也会得到这些修饰符**

```ts

class Person {

  //相当于省略了定义属性和this参数的步骤。一种语法糖形式
  constructor(public name: string, private _age: number, readonly height: number) {
  }

  get age() {
    return this._age
  }
}

const p = new Person("lwy", 20, 1.88)

console.log(p.name)
console.log(p.age)
console.log(p.height)
```



## 3、接口（Interface）

接口的作用类似于抽象类，不同点在于接口中的所有方法和属性都是没有实值的，换句话说接口中的所有方法都是抽象方法。**接口主要负责定义一个类的结构，接口可以去限制一个对象的接口，对象只有包含接口中定义的所有属性和方法时才能匹配接口**。同时，可以让一个类去实现接口，实现接口时类中要保护接口中的所有属性。

**声明的方式定义**

- 示例（检查对象类型）：

  - ```typescript
    interface Person{
        name: string;
        sayHello():void;
    }
    
    function fn(per: Person){
        per.sayHello();
    }
    
    fn({name:'孙悟空', sayHello() {console.log(`Hello, 我是 ${this.name}`)}});
    
    
    ```

- 示例（实现）

  - ```typescript
    interface Person{
        name: string;
        sayHello():void;
    }
    
    //被类实现
    //如果被一个类实现，那么在之后需要传入接口的地方，都可以将这个类传入；
    //如果被类实现，那么这个类中需要实现接口中的所有属性和方法
    class Student implements Person{
        constructor(public name: string) {
        }
    
        sayHello() {
            console.log('大家好，我是'+this.name);
        }
    }
    
    //使用extends实现继承，可以继承多个
    interface Iperson {
      name: string
      age: number
    }
    
    interface Ikun extends Iperson {
      say: () => void
    }
    ```

- **还可以使用type(类型别名)声明一个对象类型**

  ```ts
  type Person{
      name: string;
      sayHello():void;
  }
  
  ```

- **interface和type区别**

  - 类型别名和接口非常相似，在定义对象类型时，大部分时候，你可以任意选择使用。
  - 接口的几乎所有特性都可以在 type 中使用

  - 如果是**定义非对象类型**，通常**推荐使用type**，比如Direction、Alignment、一些Function；
  - **如果是定义对象类型，那么他们是有区别的：**
    - interface 可以重复的对某个接口来定义属性和方法；
    - 而type定义的是别名，别名是不能重复的
  - **所以，interface可以为现有的接口提供更多的扩展。**

  

## 4、泛型（Generic）

定义一个函数或类时，有些情况下无法确定其中要使用的具体类型（返回值、参数、属性的类型不能确定），此时泛型便能够发挥作用。

- 举个例子：

  - ```typescript
    function test(arg: any): any{
    	return arg;
    }
    
    ```

  - 上例中，test函数有一个参数类型不确定，但是能确定的时其返回值的类型和参数的类型是相同的，由于类型不确定所以参数和返回值均使用了any，但是很明显这样做是不合适的，首先使用any会关闭TS的类型检查，其次这样设置也不能体现出参数和返回值是相同的类型

  - 使用泛型：

  - ```typescript
    function test<T>(arg: T): T{
    	return arg;
    }
    ```
  
- 这里的```<T>```就是泛型，T是我们给这个类型起的名字（不一定非叫T），设置泛型后即可在函数中使用T来表示该类型。所以泛型其实很好理解，就表示某个类型。
  
- **相当于`<T>`是一个变量，由使用者来决定`<T>`是什么类型**
  
- 那么如何使用上边的函数呢？
  
  - 方式一（直接使用）：
  
      - ```typescript
        test(10)
        
        ```
  - 使用时可以直接传递参数使用，类型会由TS自动推断出来，但有时编译器无法自动推断时还需要使用下面的方式
    
  - 方式二（指定类型）：
  
      - ```typescript
        test<number>(10)
        
        ```
  - 也可以在函数后手动指定泛型
  
- 可以同时指定多个泛型，泛型间使用逗号隔开：
  
    - ```typescript
      function test<T, K>(a: T, b: K): K{
          return b;
      }
      
      test<number, string>(10, "hello");
      
      ```
  - 使用泛型时，完全可以将泛型当成是一个普通的类去使用
  
- 泛型接口
  
    ```typescript
    //接收传过来的类型
    interface Ikun<T> {
      name: T
      age: number
      slogan: T
    }
    //定义类型
    const Ikun1: Ikun<string> = {
    name: "一号",
      age: 20,
    slogan: "hahahahah"
    }
    
    ```
  
  - 类中同样可以使用泛型：
  
    - ```typescript
      class MyClass<T>{
          prop: T;
      
        constructor(prop: T){
              this.prop = prop;
          }
      }
      const p1 =  new MyClass(10,20)
      const p2 =  new MyClass<number>(10,20)
      const p3:Point<number> = new MyClass(10,20)
      
      ```

### 泛型约束

- 除此之外，也可以对**泛型的**范围进行**约束**

- 使用一：

  - ```typescript
    interface MyInter{
        length: number;
    }
    
    function test<T extends MyInter>(arg: T): number{
        return arg.length;
    }
    
    ```

  - 使用T extends MyInter表示泛型T必须是MyInter的子类，不一定非要使用接口类和抽象类同样适用。
  
- 用法二：

- **在泛型约束中使用类型参数（Using Type Parameters in Generic Constraints）**

  - 你可以声明一个类型参数，这个类型参数被其他类型参数约束；

- **举个栗子：我们希望获取一个对象给定属性名的值**

  - 我们需要确保我们不会获取 obj 上不存在的属性；
  - 所以我们在两个类型之间建立一个约束；

```ts
//固定写法，使用keyOf表示获取的key必须是O类型中的key
function getObjectproperty<O, K extends keyof O>(obj: O, key: K) {
  return obj[key]
}

const obj = {
  name: "lwy",
  age: 20
}

getObjectproperty(obj, "name")
//obj中没有adress，所以会报错
//getObjectproperty(obj, "adress")


```

### 常用名称

- T：Type的缩写，类型
- K、V：key和value的缩写，键值对
-  E：Element的缩写，元素
- O：Object的缩写，对象

### 映射类型（Mapped Types）

- **有的时候，一个类型需要基于另外一个类型，但是你又不想拷贝一份，这个时候可以考虑使用映射类型。**
  - 大部分内置的工具都是通过映射类型来实现的；
  - 大多数类型体操的题目也是通过映射类型完成的；
- **映射类型建立在索引签名的语法上：**
  - 映射类型，就是使用了 PropertyKeys 联合类型的泛型；
  - 其中 PropertyKeys 多是通过 keyof 创建，然后循环遍历键名创建一个类型；

```ts
interface Iperson {
  name: string
  age: number
}
//定义映射
type MapType<T> = {
  //映射类型写法
  //keyof 获取T中所有的key
  //返回布尔值
  //property变量代表要映射类型的key,名字任意
  [property in keyof T]: T[property]
  //这里相当于，对传来的<T>类型依次进行遍历，并放进来进行映射操作
    
    //相当于 T = Iperson
 // name = Iperson[name]
// age = Iperson[age]
}

//利用映射实现拷贝
type mapIperson = MapType<Iperson>

```

- 在使用映射类型时，有两个额外的修饰符可能会用到：
  - 一个是 readonly，用于设置属性只读；
  -  一个是 ? ，用于设置属性可选；

- 你可以通过前缀 - 或者 + 删除或者添加这些修饰符，如果没有写前缀，相当于使用了 + 前缀。

  ```ts
  interface Iperson {
    name: string
    age: number
    height?: number
  }
  
  type MapType<T> = {
    //可选和只读修饰符
    readonly [property in keyof T]?: T[property]
    // 如果前面一个-号，表示把原类型中可选类型给去掉变成必填，默认是+号保留
     [property in keyof T]-?: T[property]
  }
  
  type mapPerson = MapType<Iperson>
  
  ```

  

# 其他类型补充

### 联合类型

**满足多种类型中的一个**

- **TypeScript的类型系统允许我们使用多种运算符，从现有类型中构建新类型。**
  - 联合类型是**由两个或者多个其他类型组成的类型**；
  - 表示**可以是这些类型中的任何一个值；**
  - 联合类型中的每一个类型被称之为**联合成员（union's members）**

```ts
function printId(id: number | string) {

  console.log("你的Id是", id)

}

printId(12325)
printId("1121212")

```

- 但是当我们调用一些类型上特有的方法时，可以拿会报错
  - 这时候我们需要使用**缩小联合**
  - TypeScript可以根据我们缩小的代码结构，推断出更加具体的类型；

```ts
function printId(id: number | string) {

  console.log("你的Id是", id)
   //对类型进行判断，进行缩小联合
  if (typeof id === "string") {
    console.log(id.length)
  }

}

printId(12325)
printId("1121212")
```

### 交叉类型

**需要满足所有条件，使用 & 符号**

```ts
type myType = string & number
```

表达的含义是**number和string要同时满足；**

但是**有同时满足是一个number又是一个string的值吗？**其实是没有的，所以MyType其实是一个never类型；

- 在实际开发中**通常对对象类型使用交叉类型**

  ```ts
  
  interface colorful {
    color: string
  }
  interface Irun {
    running: () => void
  }
  
  type newType = colorful & Irun
  
  const obj: newType = {
    color: "red",
    running() {
  
    }
  }
  
  export { }
  ```

### 类型缩小

- **什么是类型缩小呢？**
  - 类型缩小的英文是 **Type Narrowing**（也有人翻译成类型收窄）；
  - 我们可以通过类似于 **typeof padding === "number"** 的判断语句，来**改变TypeScript的执行路径；**
  - 在给定的执行路径中，我们可以**缩小比声明时更小的类型**，这个过程称之为 **缩小（ Narrowing ）**;
  - 而我们编写的 **typeof padding === "number** 可以称之为 **类型保护（type guards）；**
- **常见的类型保护有如下几种：**
  - typeof
  - 平等缩小（比如===、!==）
  - instanceof
  - in
  - 等等...

#### 平等缩小

- **我们可以使用Switch或者相等的一些运算符来表达相等性（比如===, !==, ==, and != ）：**

```ts
type Direction = 'left'|'right'|'center'

function turnDirection(direction:Direction){
    switch (direction) {
            case 'left'
        console.Log("调用left方法")
          break
            case 'right':
       console.Log("调用right方法")
          break
           case  'center'
       console.Log("调用center方法")
        break
       default:
      console.Log("调用默认方法")
    }
}
```

### 函数类型

函数表达式：

```ts
//声明了一个函数类型，返回值为void
type MyFn = () => void

//声明了一个函数类型，返回值为string
type MyFn = () => string

//声明了一个函数类型，返回值为number
type MyFn = () => number
```

使用type声明的叫做类型别名

在ts中报错不报错取决与ts内部制定的规则

#### 调用签名(Call Signatures)

- **在 JavaScript 中，函数除了可以被调用，自己也是可以有属性值的。**
  - 的函数类型表达式并不能支持声明属性
  - 如果我们想描述一个带有属性的函数，我们可以在一个对象类型中写一个**调用签名（call signature）；**

```ts

interface Ibar {
  name: string,
  age: number,
      //如果一个函数支持属性，那么函数类型需要写成这个样子
  (参数列表): number
}

const bar: Ibar = (num): number => {

  const name = "kobe"
  const age = 20
  return age
}

bar.name = "aa"
bar.age = 20
bar(20)
```

- **注意这个语法跟函数类型表达式稍有不同，在参数列表和返回的类型之间用的是 : 而不是 =>。**

> 只声明函数本身使用函数类型表达式
>
> 如果描述函数作为对象被调用，同时又有其他属性时，使用函数调用签名

#### 构造签名 （Construct Signatures）

- **JavaScript 函数也可以使用 new 操作符调用，当被调用的时候，TypeScript 会认为这是一个构造函数(constructors)，因为他们会产生一个新对象。**
  - 可以写一个**构造签名（ Construct Signatures ）**，方法是在调用签名前面加一个 new 关键词；

```ts

class Person {

}

interface IctPerson {
  //声明一个类类型的写法
  new(): Person
}

function factory(fn: IctPerson) {
  return new fn()
}

factory(Person)
```

#### 默认参数

- **从ES6开始，JavaScript是支持默认参数的，TypeScript也是支持默认参数的：**

```ts
//有默认值时参数的类型注解可以省略
function sum(x: number, y: number = 6) {
  console.log(x, y)
}
//有默认值时，可以接收undefined
sum(2，undefined)

```

- **这个时候y的类型其实是 undefined 和 number 类型的联合。**

#### 剩余参数

- **从ES6开始，JavaScript也支持剩余参数，剩余参数语法允许我们将一个不定数量的参数放到一个数组中。**

```ts
function sum(...arg: number[]) {
  console.log(arg)
}

sum(10, 20, 30, 40)
```

#### 函数的重载

- **在TypeScript中，如果我们编写了一个add函数，希望可以对字符串和数字类型进行相加，应该如何编写呢？**
  - 使用直接相加的方法时会报错
  - 在TypeScript中，我们可以去**编写不同的重载签名（overload signatures）**来表示函数可以**以不同的方式进行调用；**
  - 一般是**编写两个或者以上的重载签名**，再去**编写一个通用的函数以及实现；**

```ts
//编写不同类型的重载签名
function sum(num1: string, num2: string): string
function sum(num1: number, num2: number): number
//在编写一个通用的
function sum(sum1: any, sum2: any) {
  console.log(sum1 + sum2)
  return sum1 + sum2
}

sum(10, 20)
sum("aaa", "bbbb")
```

**在我们调用sum的时候，它会根据我们传入的参数类型来决定执行函数体时，到底执行哪一个函数的重载签名；**

- 但是注意，有实现体的函数，是不能直接被调用的：

```ts
//没有被实现
sum({ name: "lwiwi" }, { age: 20 })
```

> 在开发中如果用到需要使用2种类型的场景，通常使用联合类型实现

#### ts中的this类型

- TypeScript在编译时，认为我们的this是可以正确去使用的：
  - 这是因为在没有指定this的情况，this默认情况下是any类型的；

- **VSCode在检测我们的TypeScript代码时，默认情况下运行不确定的this按照any类型去使用。**
  - 但是我们可以**创建一个tsconfig.json文件**，并且在其中告知VSCodethis必须明确执行（不能是隐式的）

- **在设置了noImplicitThis为true时， TypeScript会根据上下文推导this，但是在不能正确推导时，就会报错，需要我们明确的指定this**。

```ts
"noImplicitThis": true
```

- **在开启noImplicitThis的情况下，我们必须指定this的类型。**
- **如何指定呢？函数的第一个参数类型：**
  - 函数的第一个参数我们可以根据该函数之后被调用的情况，用于声明this的类型（名词必须叫this）；
  - 在后续调用函数传入参数时，从第二个参数开始传递的，this参数会在编译后被抹除；

```ts
//第一个参数必须是this，第二个参数才是传入的参数
function foo(this: { name: string }, age: number) {
  console.log(this, age)
}
//显示绑定
foo.apply({ name: "lwy" }, [20])
```

#### this相关的内置工具

- **Typescript 提供了一些工具类型来辅助进行常见的类型转换，这些类型全局可用。**
- **ThisParameterType：**
  - 用于提取一个函数类型Type的this (opens new window)参数类型；
  - 如果这个函数类型没有this参数返回unknown；

```ts
function foo(this: { name: string }, age: number) {
  console.log(this, age)
}
type ThisType = ThisParameterType<typeof foo>
```

- **OmitThisParameter：**
  - 用于移除一个函数类型Type的this参数类型, 并且返回当前的函数类型

```ts
type FnType = OmitThisParameter<typeof foo>

```

##### this相关的内置工具 - ThisType

- 这个类型不返回一个转换过的类型，它被用作**标记一个上下文的this类型**。（官方文档）

```ts

interface Istate {
  name: string,
  age: number
}

interface Istroe {
  state: Istate
  eating?: () => void
  running?: () => void
}
   //使用thisType指定this上下文类型
const store: Istroe & ThisType<Istate> = {
  state: {
    name: "lwy",
    age: 20
  },
  eating() {
      //如果不知道上下文类型为Istate,这里只有通过this.satate.name,才可以访问到name
    console.log(this.name)
  }
}


store.eating?.call(store.state)


export { }
```

### 鸭子类型

ts中一种实现思想

只关心属性和行为，不关心是什么类型，只要你是实现了对应的行为，不管你是什么类型，不会进行报错

> typescript矿于类型检测的时候使用的鸭子类型
> 鸭子类型：如果一只鸟，走起来像鸭子，游起来像鸭子，看起来像鸭子，那么尔可以以为它是一只鸭子
> 鸭子类型，只关心属性和行为，不关心你具体是不是对应的类型

### 索引签名（Index Signatures）

- **什么是索引签名呢？**
  - 有的时候，你不能提前知道一个类型里的所有属性的名字，但是**你知道这些值的特征；**
  - 这种情况，你就可以**用一个索引签名 (index signature) 来描述可能的值的类型；**

```ts

interface Icollection {
    //索引签名写法
  //index:number规定使用什么类型获取索引，:string规定获取索引后的返回值类型
  [index: number]: string

  length: number
}

function iteractorCollect(collection: Icollection) {
  //使用number类型获取索引，返回值为string
  collection[0]
  collection[1]
}


const tuple: [string, string] = ["200", "200"]

iteractorCollect(tuple)
// iteractorCollect({ name: "lwy", age: 20, length: 20 })

```

- **一个索引签名的属性类型必须是 string 或者是 number。**
  - 虽然 TypeScript 可以同时支持 string 和 number 类型，但数字索引的返回类型一定要是字符索引返回类型的子类型；（了解)
  - ts内部会帮我们进行转换

### 严格的字面量赋值检测

```ts

interface Iperson {
  name: string
  age: number
}
//在ts中这样书写会报错
const obj: Iperson = {
  name: "lwy",
  age: 20,
  height: 1.88
}

-------------
  //但是这样就不会报错
 const obj = {
  name: "lwy",
  age: 20,
  height: 1.88
}
//二次使用，不是新鲜的了
const info: Iperson = obj
```

- 为什么会出现这种情况呢？
  - 解释现象
  - 第一次创建的对家字面量，称之为fresh,新鲜的
  - 对于新鲜的字面量，会进行严格的类型检测，必须完全满足类型前要求（不能有多余的属性）
  - 但是当类型断言或对象字面量的类型扩大时，新鲜度会消失。

# 内置工具和类型体操

- **类型系统其实在很多语言里面都是有的，比如Java、Swift、C++等等，但是相对来说TypeScript的类型非常灵活：**
  - 这是因为TypeScript的目的是为JavaScript**添加一套类型校验系统**，因为JavaScript本身的灵活性，也让**TypeScript类型系统不得不增加更附加的功能**以适配JavaScript的灵活性；
  - 所以TypeScript是一种可以**支持类型编程的类型系统；**
- **这种类型编程系统为TypeScript增加了很大的灵活度，同时也增加了它的难度：**
  - 如果你不仅仅在开发业务的时候为自己的JavaScript代码增加上类型约束，那么基本不需要太多的类型编程能力；
  - 但是如果**你在开发一些框架、库，或者通用性的工具，为了考虑各种适配的情况，就需要使用类型编程；**
- **TypeScript本身为我们提供了类型工具，帮助我们辅助进行类型转换（前面有用过关于this的类型工具）。**
- **很多开发者为了进一步增强自己的TypeScript编程能力，还会专门去做一些类型体操的题目**
  - https://github.com/type-challenges/type-challenges
  - https://ghaiklor.github.io/type-challenges-solutions/en/

## 条件类型（Conditional Types）

- 很多时候，日常开发中我们需要基于**输入的值来决定输出的值**，同样我们**也需要基于输入的值的类型来决定输出的值的类型。**

- **条件类型（Conditional types）**就是用来帮助我们描述**输入类型和输出类型之间**的关系。

  - 条件类型的写法有点类似于 JavaScript 中的条件表达式（condition ? trueExpression : falseExpression ）：

    `SomeType extends OtherType ? TrueType : FalseType;`

```ts
//使用条件类型判断返回值类型
function sum<T extends number | string>(num1: T, num2: T): T extends number ? number : string
function sum(num1: any, num2: any) {
  return num1 + num2
}


const res = sum(20, 30)
const res1 = sum("abc", "cba")

```

### 在条件类型中推断（infer）

- **在条件类型中推断（Inferring Within Conditional Types）**
  - 条件类型提供了 infer 关键词，可以从正在比较的类型中推断类型，然后在 true 分支里引用该推断结果；
- **比如我们现在有一个函数类型，想要获取到一个函数的参数类型和返回值类型：**

```ts

type myFn = (...arg: any[]) => number

function foo(...arg: any[]) {
  return "123"
}

//ReturnType为ts内置工具，可以帮我们获取函数返回值类型
type myFooType = ReturnType<typeof foo>
type myFnType = ReturnType<myFn>

//我们这里封装个自己的returnType工具，因为我们需要传入函数类型，所以T继承与函数类型
//使用infer进行函数返回值类型推断，推断出什么类型，把类型返回
type wyReturnType<T extends (...arg: any[]) => any> = T extends (...any: any[]) => infer R ? R : false

//这里就可以正确的推导出函数返回值类型
type myFooType2 = wyReturnType<typeof foo>


export { }
```

### 联合分发条件类型

- **当在泛型中使用条件类型的时候，如果传入一个联合类型，就会变成 分发的（distributive）**

```ts

//这里把传入的联合类型，给分发了，变成 string[]|number[]类型
//如果没有分发它是sting|number[]类型
type toArray<T> = T extends any ? T[] : never

type arr1 = toArray<number>
type arr2 = toArray<string | number>

```

- **如果我们在 ToArray 传入一个联合类型，这个条件类型会被应用到联合类型的每个成员：**
  -  当传入string | number时，会遍历联合类型中的每一个成员；
  - 相当于ToArray | ToArray
  - 所以最后的结果是：string[] | number[]；

## 内置工具

### Partial<type>

- 用于构造一个Type下面的所有属性都设置为可选的类型

```ts

interface person {
  name: string,
  age: number,
  adress: string
}
//把person中的属性全部变成可选的
type myPartial = Partial<person>

const obj: myPartial = {
}


//本质,使用映射并且使用?修饰符，把全部属性变成可选
type Wypartial<T> = {
  [k in keyof T]?: T[k]
}
```

### Required<type>

- 用于构造一个Type下面的所有属性全都设置为必填的类型，这个工具类型跟 Partial 相反。

  ```ts
  //与partial相反
  //本质,使用-把所有可选类型都去掉，变成必选
  type Wypartial<T> = {
    [k in keyof T]-?: T[k]
  }
  ```

### Readonly<type>

- **用于构造一个Type下面的所有属性全都设置为只读的类型，意味着这个类型的所有的属性全都不可以重新赋值。**

```ts
//本质
type Wypartial<T> = {
  readonly [k in keyof T]: T[k]
}
```

### Record<keys, value>

- **用于构造一个对象类型，它所有的key(键)都是Keys类型，它所有的value(值)都是Type类型。**

```ts
//本质
type WyRecord<K extends keyof any, T> = {
  [P in K]: T
}
interface IPerson {
  name: string
  age: number
}
const p1: IPerson = { name: "why", age: 18 }
const p2: IPerson = { name: "kobe", age: 30 }
type CityType = "上海" | "洛杉矶"
const data: WyRecord<CityType, IPerson> = {
  "上海": p1,
  "洛杉矶": p2
}
```

### Pick<type, keys>

- **用于构造一个类型，它是从Type类型里面挑了一些属性Keys**

```ts
//本质
type WyPick<T, K extends keyof T> = {
  [P in K]: T[P]
}
interface IPerson {
  name: string
  age: number
  height: number
}

type IKun = Pick<IPerson, "name" | "age">

```

### Omit<Type, keys>

- **用于构造一个类型，它是从Type类型里面过滤了一些属性Keys**

```ts
//如果每次都如ick可能类型太多了
//本质
type WyOmit<T, K> = {
  [P in keyof T as P extends K ? never : P]: T[P]
}
interface IPerson {
  name: string
  age: number
  height: number
}
//少了hright
type IKun = Omit<IPerson, "height">

```

### Exclude<UnionType, ExcludedMembers>

- **用于构造一个类型，它是从UnionType联合类型里面排除了所有可以赋给ExcludedMembers的类型。**

```ts
//本质
type WyExclude<T, U> = T extends U ? never : T
type HYOmit<T, K> = Pick<T, WyExclude<keyof T, K>>

type PropertyTypes = "name" | "age" | "height"
//把height给排除了
type PropertyTypes2 = WyExclude<PropertyTypes, "height">
```

- 有了WyExclude，我们可以使用它来实现HYOmit。

### Extract<Type,Union>

- **用于构造一个类型，它是从Type类型里面提取了所有可以赋给Union的类型。**

```ts
//本质
type WyExtract<T, U> = T extends U ? T : never
type PropertyTypes = "name" | "age" | "height"
//获取"name|"age
type PropertyTypes2 = WyExtract<PropertyTypes, "name" | "age">

```

### NonNullable<Type>

- **用于构造一个类型，这个类型从Type中排除了所有的null、undefined的类型。**

```ts
//本质
type WyNonNullable<T> = T extends undefined | null ? never : T
type unionType = string | number | undefined | null
type unionType2 = WyNonNullable<unionType>
```

### ReturnType<type>

- **用于构造一个含有Type函数的返回值的类型。**

  ```ts
  
  type myFn = (...arg: any[]) => number
  
  function foo(...arg: any[]) {
    return "123"
  }
  
  //ReturnType为ts内置工具，可以帮我们获取函数返回值类型
  type myFooType = ReturnType<typeof foo>
  type myFnType = ReturnType<myFn>
  
                              //本质
  //我们这里封装个自己的returnType工具，因为我们需要传入函数类型，所以T继承与函数类型
  //使用infer进行函数返回值类型推断，推断出什么类型，把类型返回
  type wyReturnType<T extends (...arg: any[]) => any> = T extends (...any: any[]) => infer R ? R : false
  
  //这里就可以正确的推导出函数返回值类型
  type myFooType2 = wyReturnType<typeof foo>
  
  
  export { }
  ```

### InstanceType<type>

- **用于构造一个由所有Type的构造函数的实例类型组成的类型。**

# TypeScript知识扩展

## 模块的使用

- **我们需要先理解 TypeScript 认为什么是一个模块。**
  - JavaScript 规范声明任何**没有 export 的 JavaScript 文件都应该被认为是一个脚本，而非一个模块**。
  - 在一个脚本文件中，**变量和类型会被声明在共享的全局作用域**，将多个输入文件合并成一个输出文件，或者在 HTML使用多个<script>标签加载这些模块
- **如果你有一个文件，现在没有任何 import 或者 export，但是你希望它被作为模块处理，添加这行代码：**

```ts
export {}
```

- **这会把文件改成一个没有导出任何内容的模块，这个语法可以生效，无论你的模块目标是什么。**

- **ts中的模块化遵循ESModule模块化**

- 如果导入的是一个类型的化，ts推荐我们在前面加上type，说明导入的是类型

  ```ts
  import { type IFoo,type IDType } from "./foo"
  ```

  - **这些可以让一个非 TypeScript 编译器比如 Babel、swc 或者 esbuild 知道什么样的导入可以被安全移除。**

## 类型的查找

- **之前我们所有的typescript中的类型，几乎都是我们自己编写的，但是我们也有用到一些其他的类型：**

  ```ts
const imageEl = document.getElementById("image") as HTMLImageElement;
  ```

- **大家是否会奇怪，我们的HTMLImageElement类型来自哪里呢？甚至是document为什么可以有getElementById的方法呢？**

  - 其实这里就涉及到**typescript对类型的管理和查找规则**了。

- **有一种typescript文件：.d.ts文件**

  - 我们之前编写的typescript文件都是 .ts 文件，这些文件最终会输出 .js 文件，也是我们通常编写代码的地方；
  - 还有另外一种文件 **.d.ts 文件**，它是用来做类型的声明(declare)，称之为**类型声明（Type Declaration）**或者**类型定义（Type Definition）**文件。
  - 它仅仅用来做类型检测，告知typescript我们有哪些类型；

- **那么typescript会在哪里查找我们的类型声明呢？**

  - **内置类型声明；**
    - **内置类型声明是typescript自带的、帮助我们内置了JavaScript运行时的一些标准化API的声明文件；**
      - 包括比如Function、String、Math、Date等内置类型；
      - 也包括运行环境中的DOM API，比如Window、Document等；
    - **TypeScript 使用模式命名这些声明文件lib.[something].d.ts。**
    - **内置类型声明通常在我们安装typescript的环境中会带有的；**
      - https://github.com/microsoft/TypeScript/tree/main/lib

  - **外部定义类型声明；**

    - **外部类型声明通常是我们使用一些库（比如第三方库）时，需要的一些类型声明。**
    - **这些库通常有两种类型声明方式：**
    - 方式一：在**自己库中进行类型声明（编写.d.ts文件）**，比如axios
    - 方式二：通过**社区的一个公有库DefinitelyTyped存放类型声明文件**
      - 该库的GitHub地址：https://github.com/DefinitelyTyped/DefinitelyTyped/
      - 该库查找声明安装方式的地址：https://www.typescriptlang.org/dt/search?search=
      - 比如我们安装react的类型声明： `npm i @types/react --save-dev`

  - **自己定义类型声明**

    - 什么情况下需要自己来定义声明文件呢？
    - 情况一：我们**使用的第三方库是一个纯的JavaScript库**，没有对应的声明文件；比如lodash
      - 情况二：我们**给自己的代码中声明一些类型**，方便在其他地方直接进行使用

    **declare 声明模块**

    - **我们也可以声明模块，比如lodash模块默认不能使用的情况，可以自己来声明这个模块：**

      - 在ts中使用第三方库如果没有对应的ts文件，会报错，这时候需要自己声明
    
      ```ts
      declare module "Lodash" {
          export function join(args:any[])："any;
  }
      ```
  
    - 声明模块的语法: **declare module '模块名' {}。**
  
      - 在**声明模块的内部**，我们**可以通过 export 导出对应库的类、函数等；**

    **declare 声明文件**

    - **在某些情况下，我们也可以声明文件：**
    
    - 比如**在开发vue的过程中，默认是不识别我们的.vue文件**的，那么**我们就需要对其进行文件的声明；**
    - 比如**在开发中我们使用了 jpg 这类图片文件，默认typescript也是不支持的，也需要对其进行声明；**
    
    ```ts
      declare module '*vue'{
    import { DefineComponent } from 'vue'
      const component: DefineComponent
      
    export default component
          
     }
          
      declare module '*jpg' {
          const src:string
         export default src
        
      }
    ```
  
  **declare 命名空间**
  
- **比如我们在index.html中直接引入了jQuery：**
  
  - 通过cdn引入
  
  - CDN地址： https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.js
    
    - 我们可以进行命名空间的声明：
    
      ```ts
      declare namespace ${
    function ajax(settings:any):void
      }
      ```
    - 在main.ts中就可以使用了：
    
      ```ts
      $.ajax({
      url:"http://123.207.32.32:8000/home/multidata",
    success:(res:any)=> {
      console.log(res);
    }
    });
      ```
    
    

