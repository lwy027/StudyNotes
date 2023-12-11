# Webpack

了解真相，你才能获得真正的自由!

## 模块化原理 - source-map

### 回顾

- webpack是什么?

  - 官方解释

    `webpack is a static module bundler for modern JavaScript applications.`

- **webpack是一个静态的模块化打包工具，为现代的JavaScript应用程序；**
- 我们来对上面的解释进行拆解：
  - **打包bundler**：webpack可以将帮助我们进行打包，所以它是一个打包工具
  - **静态的static**：这样表述的原因是我们最终可以将代码打包成最终的静态资源（部署到静态服务器）；
  - **模块化module**：webpack默认支持各种模块化开发，ES Module、CommonJS、AMD等；
  - **现代的modern**：我们前端说过，正是因为现代前端开发面临各种各样的问题，才催生了webpack的出现和发展

基本配置:

```js
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/main.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
    clean: true,
  },
  resolve: {
    extensions: [".js", ".json", ".vue", ".ts", ".jsx"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  devServer: {
    //默认为true
    hot: true,
    //更改端口号
    port: 8000,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "css-loader",
          "style-loader",
          {
            loader: "posscss-loader",
          },
        ],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.(png svg|jpg|jpeg gif)s/i,
        type: "asset",
        generator: {
          filename: "img/[name].[hash:6][ext]",
        },
        parser: {
          dataUrlCondition: {
            maxSize: 100 * 1024,
          },
        },
      },
      {
        test: /\.js$/,
        use: ["babel-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "webpack练习",
      template: "./index.html",
    }),
  ],
};

```

### Mode配置

- **Mode配置选项，可以告知webpack使用相应模式的内置优化：**
  - 默认值是**production（什么都不设置的情况下）；**
  - 可选值有：**'none' | 'development' | 'production'；**
- 这几个选项有什么样的区别呢？

| 选项        | 描述                                                         |
| ----------- | ------------------------------------------------------------ |
| development | 会将DefinePlugin中process.env.NODE_ENV的值设置为development.为模块和chunk启用有效的名。 |
| production  | 会将DefinepPlugin中process.env.NODE_ENv的值设置为production。为模块和chunk启用确定性的混淆名<br/>FlagDependencyusageplugin,FlagIncludedchunksPlugin,ModuleconcatenationPlugin,NoEmitonErrorsPlugin<br/>TerserPlugin。 |
| none        | 不使用任何默认优化选项                                       |

#### Mode配置代表更多

![Mode](../../00_image/09_前端工程化高级/Mode.png)

> webpack会根据mode配置环境的不同添加不同的属性进行操作

> **devtool 用来设置source-map**

### 认识source-map

- 我们的代码通常运行在浏览器上时，是通过**打包压缩**的：
  - 也就是**真实跑在浏览器上的代码**，和**我们编写的代码其实是有差异**的；
  - 比如**ES6的代码**可能被转换成**ES5**；
  - 比如**对应的代码行号、列号**在经过编译后肯定会不一致；
  - 比如代码进行**丑化压缩**时，会将**编码名称**等修改；
  - 比如我们使用了**TypeScript**等方式编写的代码，最终转换成**JavaScript**；
- 但是，当代码报错需要**调试时（debug）**，调试**转换后的代码**是很困难的
- 但是我们能保证代码不出错吗？**不可能。**
- 那么如何可以**调试这种转换后不一致**的代码呢？答案就是**source-map**
  - source-map是从**已转换的代码**，映射到**原始的源文件；**
  - 使浏览器可以**重构原始源**并在调试器中**显示重建的原始源**

### 如何使用source-map

把mode模块设置为production

```js
  mode: "production",
```

> webpack在生产环境会对我们打包之后的代码进行丑化

```js
(() => {
  "use strict";
  console.log("webpack exec"),
    console.log(50),
    console.log(110),
    console.log(adress),
    console.log("foo函数执行");
})();
//# sourceMappingURL=bundle.js.map
```

> 丑化之后的代码在浏览器中不会映射到正确文件的位置，只会映射到打包文件的位置

那么我们怎么可以让浏览器映射到正确文件中代码的位置呢？

**答案是使用source-map**

需要在webpack配置文件中添加 

` devtool: "source-map"`

```js
module.exports = {
  mode: "production",
  entry: "./src/main.js",
  devtool: "source-map", # 添加这段代码，打包之后会生成build的映射文件
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "bundle.js",
  },
};
```

![source-map映射文件](../../00_image/09_前端工程化高级/source-map映射文件.png)

- **第一步**：根据源文件，生成source-map文件，webpack在打包时，可以通过配置生成source-map；
- **第二步**：在转换后的代码，最后添加一个注释，它指向sourcemap；

> //# sourceMappingURL=bundle.js.map  注释代码

- **浏览器会根据我们的注释，查找相应的source-map，并且根据source-map还原我们的代码，方便进行调试。**
- **在Chrome中，我们可以在控制台中的设置选项打开source-map**

### 分析source-map

- 最初source-map生成的文件大小是原始文件的10倍，第二版减少了约50%，第三版又减少了50%，所以目前一个133kb的文件，
  最终的source-map的大小大概在300kb。
- **目前的source-map长什么样子呢？**
  - **version**：当前使用的版本，也就是最新的第三版；
  - **sources**：从哪些文件转换过来的source-map和打包的代码（最初始的文件）；
  - **names**：转换前的变量和属性名称（因为我目前使用的是development模式，所以不需要保留转换前的名称）；
  - **mappings**：source-map用来和源文件映射的信息（比如位置信息等），一串base64 VLQ（veriable-length quantity可变
    长度值）编码；
  - **file**：打包后的文件（浏览器加载的文件）；
  - **sourceContent**：转换前的具体代码信息（和sources是对应的关系）；
  - **sourceRoot**：所有的sources相对的根目录；

生成的映射文件

```js
{
  "version": 3,
  "file": "bundle.js",
  "mappings": "mBAIAA,QAAQC,IAFQ,gBAIhBD,QAAQC,ICFCC,IDGTF,QAAQC,ICNCC,KDWTF,QAAQC,IAAIE,QAHVH,QAAQC,IAAI,U",
  "sources": [
    "webpack://source-map/./src/main.js",
    "webpack://source-map/./src/utils/math.js"
  ],
  "sourcesContent": [
    "import { sub, sum } from \"./utils/math\";\r\n\r\nconst message = \"webpack exec\";\r\n\r\nconsole.log(message);\r\n\r\nconsole.log(sub(80, 30));\r\nconsole.log(sum(80, 30));\r\nconst foo = () => {\r\n  console.log(\"foo函数执行\");\r\n};\r\n\r\nconsole.log(adress);\r\nfoo();\r\n",
    "const sum = (num1, num2) => {\r\n  return num1 + num2;\r\n};\r\nconst sub = (num1, num2) => {\r\n  return num1 - num2;\r\n};\r\nexport { sub, sum };\r\n"
  ],
  "names": [
    "console",
    "log",
    "num1",
    "adress"
  ],
  "sourceRoot": ""
}

```

### 生成source-map

- **如何在使用webpack打包的时候，生成对应的source-map呢？**
  - webpack为我们提供了非常多的选项（目前是**26**个），来处理source-map；
  - https://webpack.docschina.org/configuration/devtool/
  - 选择不同的值，生成的source-map会稍微有差异，打包的过程也会有**性能的差异**，可以根据不同的情况进行选择；
- **下面几个值不会生成source-map**
- **false**：不使用source-map，也就是没有任何和source-map相关的内容。
- **none**：production模式下的默认值（什么值都不写） ，不生成source-map。
- **eval**：development模式下的默认值，不生成source-map
  - 但是它会在eval执行的代码中，添加 **//# sourceURL=；**
  - 它会被浏览器在执行时解析，并且在调试面板中生成对应的一些文件目录，方便我们调试代码；

> 使用eval的效果,在development模式下的默认值

```js
 /******/ var __webpack_modules__ = {
    /***/ "./src/main.js":
      /*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/math */ "./src/utils/math.js");\n\r\n\r\nconst message = "webpack exec";\r\n\r\nconsole.log(message);\r\n\r\nconsole.log((0,_utils_math__WEBPACK_IMPORTED_MODULE_0__.sub)(80, 30));\r\nconsole.log((0,_utils_math__WEBPACK_IMPORTED_MODULE_0__.sum)(80, 30));\r\nconst foo = () => {\r\n  console.log("foo函数执行");\r\n};\r\n\r\nconsole.log(adress);\r\nfoo();\r\n\n\n//# sourceURL=webpack://source-map/./src/main.js?'                                                                # 映射文件URL
        );

        /***/
      },

```

webpack配置

```js
const path = require("path");
module.exports = {
  mode: "development",
  entry: "./src/main.js",
  // devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "bundle.js",
  },
};

```

### eval-source-map值(了解)

- **eval-source-map**：会生成sourcemap，但是source-map是以**DataUrl添加到eval函数的后面**
  - **也就是说映射信息直接在eval函数后面，不会单独生成一个映射文件**

```js
(() => {
  "use strict";
  var __webpack_modules__ = {
      424: () => {
        eval(
          '\n;// CONCATENATED MODULE: ./src/utils/math.js\nconst sum = (num1, num2) => {\r\n  return num1 + num2;\r\n};\r\nconst sub = (num1, num2) => {\r\n  return num1 - num2;\r\n};\r\n\r\n\n;// CONCATENATED MODULE: ./src/main.js\n\r\n\r\nconst message = "webpack exec";\r\n\r\nconsole.log(message);\r\n\r\nconsole.log(sub(80, 30));\r\nconsole.log(sum(80, 30));\r\nconst foo = () => {\r\n  console.log("foo函数执行");\r\n};\r\n\r\nconsole.log(adress);\r\nfoo();\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNDI0LmpzIiwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ29COzs7QUNOb0I7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksR0FBRztBQUNmLFlBQVksR0FBRztBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3NvdXJjZS1tYXAvLi9zcmMvdXRpbHMvbWF0aC5qcz9lZGMwIiwid2VicGFjazovL3NvdXJjZS1tYXAvLi9zcmMvbWFpbi5qcz81NmQ3Il0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHN1bSA9IChudW0xLCBudW0yKSA9PiB7XHJcbiAgcmV0dXJuIG51bTEgKyBudW0yO1xyXG59O1xyXG5jb25zdCBzdWIgPSAobnVtMSwgbnVtMikgPT4ge1xyXG4gIHJldHVybiBudW0xIC0gbnVtMjtcclxufTtcclxuZXhwb3J0IHsgc3ViLCBzdW0gfTtcclxuIiwiaW1wb3J0IHsgc3ViLCBzdW0gfSBmcm9tIFwiLi91dGlscy9tYXRoXCI7XHJcblxyXG5jb25zdCBtZXNzYWdlID0gXCJ3ZWJwYWNrIGV4ZWNcIjtcclxuXHJcbmNvbnNvbGUubG9nKG1lc3NhZ2UpO1xyXG5cclxuY29uc29sZS5sb2coc3ViKDgwLCAzMCkpO1xyXG5jb25zb2xlLmxvZyhzdW0oODAsIDMwKSk7XHJcbmNvbnN0IGZvbyA9ICgpID0+IHtcclxuICBjb25zb2xlLmxvZyhcImZvb+WHveaVsOaJp+ihjFwiKTtcclxufTtcclxuXHJcbmNvbnNvbGUubG9nKGFkcmVzcyk7XHJcbmZvbygpO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///424\n'
        );
      },
    },
    __webpack_exports__ = {};
  __webpack_modules__[424]();
})();

```

### inline-source-map值

- **inline-source-map**：会生成sourcemap，但是source-map是以**DataUrl**添加到bundle文件的后面
  - **也就是说映射信息直接在bundle文件后面，不会单独生成一个映射文件**

```js
(() => {
  "use strict";
  console.log("webpack exec"),
    console.log(50),
    console.log(110),
    console.log(adress),
    console.log("foo函数执行");
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiJtQkFJQUEsUUFBUUMsSUFGUSxnQkFJaEJELFFBQVFDLElDRkNDLElER1RGLFFBQVFDLElDTkNDLEtEV1RGLFFBQVFDLElBQUlFLFFBSFZILFFBQVFDLElBQUksVSIsInNvdXJjZXMiOlsid2VicGFjazovL3NvdXJjZS1tYXAvLi9zcmMvbWFpbi5qcyIsIndlYnBhY2s6Ly9zb3VyY2UtbWFwLy4vc3JjL3V0aWxzL21hdGguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc3ViLCBzdW0gfSBmcm9tIFwiLi91dGlscy9tYXRoXCI7XHJcblxyXG5jb25zdCBtZXNzYWdlID0gXCJ3ZWJwYWNrIGV4ZWNcIjtcclxuXHJcbmNvbnNvbGUubG9nKG1lc3NhZ2UpO1xyXG5cclxuY29uc29sZS5sb2coc3ViKDgwLCAzMCkpO1xyXG5jb25zb2xlLmxvZyhzdW0oODAsIDMwKSk7XHJcbmNvbnN0IGZvbyA9ICgpID0+IHtcclxuICBjb25zb2xlLmxvZyhcImZvb+WHveaVsOaJp+ihjFwiKTtcclxufTtcclxuXHJcbmNvbnNvbGUubG9nKGFkcmVzcyk7XHJcbmZvbygpO1xyXG4iLCJjb25zdCBzdW0gPSAobnVtMSwgbnVtMikgPT4ge1xyXG4gIHJldHVybiBudW0xICsgbnVtMjtcclxufTtcclxuY29uc3Qgc3ViID0gKG51bTEsIG51bTIpID0+IHtcclxuICByZXR1cm4gbnVtMSAtIG51bTI7XHJcbn07XHJcbmV4cG9ydCB7IHN1Yiwgc3VtIH07XHJcbiJdLCJuYW1lcyI6WyJjb25zb2xlIiwibG9nIiwibnVtMSIsImFkcmVzcyJdLCJzb3VyY2VSb290IjoiIn0=

```

### cheap-source-map

- **cheap-source-map：**
  - 会生成sourcemap，**但是会更加高效一些**（cheap低开销），因为**它没有生成列映射**（Column Mapping）
  - 因为在开发中，我们只需要行信息通常就可以定位到错误了

### cheap-module-source-map值

- **cheap-module-source-map：**
  - 会生成sourcemap，类似于cheap-source-map，但是对**源自loader的sourcemap处理会更好**。
- **这里有一个很模糊的概念**：对源自loader的sourcemap处理会更好，官方也没有给出很好的解释
  - 其实是**如果loader对我们的源码进行了特殊的处理**，比如babel；

> 和cheap-source-map的主要区别就是，有没有生成映射列，在浏览器中映射时，**cheap-source-map不会对文件中的空格进行映射cheap-module-source-map会对空格进行映射**

### hidden-source-map

- **hidden-source-map：**
  - 会生成sourcemap，但是**不会对source-map文件进行引用**；
  - 相当于**删除了打包文件中对sourcemap的引用注释**

```js
// 被删除掉的
//# sourceMappingURL=bundle.js.map
```

- **如果我们手动添加进来，那么sourcemap就会生效了**

> 默认会隐藏对映射文件的引用注释，需要自己手动开启

### nosources-source-map值

- **nosources-source-map：**
  - 会生成sourcemap，但是生成的sourcemap**只有错误信息的提示，不会生成源代码文件**

### 多个值的组合

- **事实上，webpack提供给我们的26个值，是可以进行多组合的。**

- **组合的规则如下：**

  - **inline-|hidden-|eval**：三个值时三选一；
  - **nosources**：可选值；
  - **cheap**可选值，并且可以跟随**module**的值；

  ```js
  [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map
  ```

- **那么在开发中，最佳的实践是什么呢？**

  - **开发阶段**：推荐使用 source-map或者**cheap-module-source-map**
    - 这分别是vue和react使用的值，可以获取调试信息，方便快速开发；
  - **测试阶段**：推荐使用 source-map或者cheap-module-source-map
    - 测试阶段我们也希望在浏览器下看到正确的错误提示；
  - **发布阶段**：false、缺省值（不写）

总结：

> source-map可以把打包的文件和源文件的进行一个映射
>
> 通过webpack中devtool这个选项可以开启使用source-map进行文件映射
>
> 在生产环境source-map默认是关闭的，我们需要手动指定source-map才可以查看代码在开发环境中的位置
>
> 在开发环境时默认值是eval,它会被浏览器在执行时解析，并且在调试面板中生成对应的一些文件目录，方便我们调试代码；

## 深入解析Babel - polyfill

### 为什么需要babel？

- **事实上，在开发中我们很少直接去接触babel，但是babel对于前端开发来说，目前是不可缺少的一部分：**
  - 开发中，我们想要使用ES6+的语法，想要使用TypeScript，开发React项目，它们都是离不开Babel的；
  - 所以，学习Babel对于我们理解代码从编写到线上的转变过程直至关重要；
  - 了解真相，你才能获得真知的自由！
- **那么，Babel到底是什么呢？**
  - Babel是一个工具链，主要用于旧浏览器或者缓解中将ECMAScript 2015+代码转换为向后兼容版本的JavaScript；
  - 包括：语法转换、源代码转换、Polyfill实现目标环境缺少的功能等；

### Babel命令行使用

- **babel本身可以作为一个独立的工具（和postcss一样），不和webpack等构建工具配置来单独使用。**
- **如果我们希望在命令行尝试使用babel，需要安装如下库：**
  - **@babel/core**：babel的核心代码，必须安装；
  - **@babel/cli**：可以让我们在命令行使用babel

```js
npm install @babel/cli @babel/core -D
```

- **使用babel来处理我们的源代码：**
  - **src**：是源文件的目录；
  - **--out-dir**：指定要输出的文件夹dist

```js
$ npx babel src --out-dir dist
```

### 插件的使用

- **比如我们需要转换箭头函数，那么我们就可以使用箭头函数转换相关的插件：**

```js
npm install @babel/plugin-transform-arrow-functions -D
```

```js
npx babel src --out-dir dist --plugins=@babel/plugin-transform-arrow-functions
```

- **查看转换后的结果：我们会发现 const 并没有转成 var**
  - 这是因为 plugin-transform-arrow-functions，并没有提供这样的功能；
  - 我们需要使用 plugin-transform-block-scoping 来完成这样的功能；

```js
npm install @babel/plugin-transform-block-scoping -D 
```

```js
npx babel  src --out-dir dist --plugins=@babel/plugin-transform-block-scoping,@babel/plugin-transform-arrow-functions
```

### Babel的预设preset

- **但是如果要转换的内容过多，一个个设置是比较麻烦的，我们可以使用预设（preset）：**
  - 后面我们再具体来讲预设代表的含义；
- **安装@babel/preset-env预设：**

```js
npm install @babel/preset-env -D
```

- **执行如下命令：**

```js
npx babel src --out-dir dist --presets=@babel/preset-env
```

### Babel的底层原理

- **babel是如何做到将我们的一段代码（ES6、TypeScript、React）转成另外一段代码（ES5）的呢？**
  - 从一种**源代码（原生语言）**转换成**另一种源代码（目标语言）**，这是什么的工作呢？
  - 就是**编译器**，事实上我们可以**将babel看成就是一个编译器。**
  - Babel编译器的作用就是将**我们的源代码**，转换成浏览器可以直接识别的**另外一段源代码**；
- **Babel也拥有编译器的工作流程：**
  - **解析阶段（Parsing）**
  - **转换阶段（Transformation）**
  - **生成阶段（Code Generation）**
- **小型编译器参考**
  
- https://github.com/jamiebuilds/the-super-tiny-compiler
  
- babel编译器执行原理

  ![babel编译器执行原理](../../00_image/09_前端工程化高级/Babel编译执行原理.png)

### babel-loader

- **在实际开发中，我们通常会在构建工具中通过配置babel来对其进行使用的，比如在webpack中。**
- **那么我们就需要去安装相关的依赖：**
  - 如果之前已经安装了@babel/core，那么这里不需要再次安装；

```js
npm install babel-loader @babel/core
```

- 我们可以设置一个规则，在加载js文件时，使用我们的babel：
  - 我们必须指定使用的插件才会生效
  - **如果我们一个个去安装使用插件，那么需要手动来管理大量的babel插件，我们可以直接给webpack提供一个preset，
    webpack会根据我们的预设来加载对应的插件列表，并且将其传递给babel。**
  - 比如常见的预设有三个：
    - **env**
    - **react**
    - **TypeScript**
  - **安装preset-env：**

```js
npm install @babel/preset-env
```

**babel与webpack结合配置文件:**

```js
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "bundle.js",
    clean: true, //每次执行时，自动删除以前的打包文件
  },
  //配置loader选项
  module: {
    rules: [
      {
        test: /\.js$/,
          //use有很多写法，可以在官网查看
        use: {
          loader: "babel-loader",
          options: {
            //使用babel中的插件，如果使用了presets这些插件可以不进行配置
            plugins: [
              "@babel/plugin-transform-block-scoping",
              "@babel/plugin-transform-arrow-functions",
            ],
            //使用预设 
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};

```

> 这样在执行webpack进行打包时，就会执行babel对我们的代码进行转化

### 浏览器兼容性

- 我们来思考一个问题：**开发中，浏览器的兼容性问题，我们应该如何去解决和处理？**
  - 当然这个问题很笼统，这里我说的兼容性问题**不是指屏幕大小的变化适配；**
  - 我这里指的兼容性是**针对不同的浏览器支持的特性**：比如css特性、js语法之间的兼容性；
- **我们知道市面上有大量的浏览器：**
  - 有Chrome、Safari、IE、Edge、Chrome for Android、UC Browser、QQ Browser等等；
  - 它们的**市场占率是多少**？我们**要不要兼容它们**呢？
- **其实在很多的脚手架配置中，都能看到类似于这样的配置信息：**
  - 这里的百分之一，就是指市场占有率

```js
> 1%
last 2 versions
not dead
```

- **但是在哪里可以查询到浏览器的市场占有率呢？**
  - 这个最好用的网站，也是我们工具通常会查询的一个网站就是caniuse；
  - https://caniuse.com/usage-table

### 认识browserslist工具

- **但是有一个问题，我们如何可以在css兼容性和js兼容性下共享我们配置的兼容性条件呢？**
  - 就是当我们**设置了一个条件： > 1%；**
  - 我们表达的意思是**css要兼容市场占有率大于1%的浏览器，js也要兼容市场占有率大于1%的浏览器；**
  - 如果我们是**通过工具来达到这种兼容性**的，比如**我们讲到的postcss-preset-env、babel、autoprefixer等**
- **如何可以让他们共享我们的配置呢？**
  
  - 这个问题的答案就是**Browserslist**；
- **Browserslist**是什么？Browserslist是一个**在不同的前端工具之间**，共享**目标浏览器和Node.js版本的配置：**
  - Autoprefixer
  - Babel
  - postcss-preset-env
  - eslint-plugin-compat
  - stylelint-no-unsupported-browser-features
  - postcss-normalize
  - obsolete-webpack-plugin

- **浏览器查询过程**

  - 我们可以编写类似于这样的配置：

  ```js
  > 1%
  last 2 versions
  not dead
  ```

  - **那么之后，这些工具会根据我们的配置来获取相关的浏览器信息，以方便决定是否需要进行兼容性的支持：**
    - 条件查询使用的是caniuse-lite的工具，这个工具的数据来自于caniuse的网站上

#### Browserslist编写规则一：

- **那么在开发中，我们可以编写的条件都有哪些呢？（加粗部分是最常用的）**
- **defaults：Browserslist的默认浏览器（> 0.5%, last 2 versions, Firefox ESR, not dead）。**
- **5%：通过全局使用情况统计信息选择的浏览器版本。 >=，<和<=工作过。**
  - `>`5% in US：使用美国使用情况统计信息。它接受两个字母的国家/地区代码。
  - `>` 5% in alt-AS：使用亚洲地区使用情况统计信息。有关所有区域代码的列表，请参见caniuse-lite/data/regions
  - `>` 5% in my stats：使用自定义用法数据。
  - `>` 5% in browserslist-config-mycompany stats：使用 来自的自定义使用情况数据browserslist-config-mycompany/browserslist-stats.json。
  - cover 99.5%：提供覆盖率的最受欢迎的浏览器。
  - cover 99.5% in US：与上述相同，但国家/地区代码由两个字母组成。
  - cover 99.5% in my stats：使用自定义用法数据。
- **dead：24个月内没有官方支持或更新的浏览器。现在是IE 10，IE_Mob 11，BlackBerry 10，BlackBerry 7， Samsung 4和OperaMobile 12.1。**
- **last 2 versions：每个浏览器的最后2个版本。**
  - last 2 Chrome versions：最近2个版本的Chrome浏览器。
  - last 2 major versions或last 2 iOS major versions：最近2个主要版本的所有次要/补丁版本

#### Browserslist编写规则二：

不重要的规则：

- **node 10和node 10.4：选择最新的Node.js10.x.x 或10.4.x版本。**
  - current node：Browserslist现在使用的Node.js版本。
  - maintained node versions：所有Node.js版本，仍由 Node.js Foundation维护。
- **iOS 7：直接使用iOS浏览器版本7。**
  - Firefox > 20：Firefox的版本高于20 >=，<并且<=也可以使用。它也可以与Node.js一起使用。
  - ie 6-8：选择一个包含范围的版本。
  - Firefox ESR：最新的[Firefox ESR]版本。
  - PhantomJS 2.1和PhantomJS 1.9：选择类似于PhantomJS运行时的Safari版本。
- **extends browserslist-config-mycompany：从browserslist-config-mycompanynpm包中查询 。**
- **supports es6-module：支持特定功能的浏览器。**
  - es6-module这是“我可以使用” 页面feat的URL上的参数。有关所有可用功能的列表，请参见 。caniuse-lite/data/features
- **browserslist config：在Browserslist配置中定义的浏览器**。在差异服务中很有用，可用于修改用户的配置，例如 browserslist config and supports es6-module。
- **since 2015或last 2 years**：自2015年以来发布的所有版本（since 2015-03以及since 2015-03-10）。
- **unreleased versions或unreleased Chrome versions**：Alpha和Beta版本。
- **not ie <= 8：排除先前查询选择的浏览器**

#### 命令行使用browserslist

- **在安装babel时因为babel会依赖browerslist,所以默认会帮我们安装**

- **我们可以直接通过命令来查询某些条件所匹配到的浏览器：**

```js
npx browserslist ">1%, last 2 version, not dead"
```

```js
npx browserslist ">1%, last 2 version, not dead"
and_chr 119
and_ff 119
and_qq 13.1
and_uc 15.5
android 119
chrome 119
chrome 118
chrome 117
chrome 116
chrome 109
edge 119
edge 118
edge 117
firefox 120
firefox 119
firefox 118
ios_saf 17.1
ios_saf 17.0
ios_saf 16.6-16.7
kaios 3.0-3.1
kaios 2.5
op_mini all
op_mob 73
opera 104
opera 103
opera 102
safari 17.1
safari 17.0
safari 16.6
samsung 23
samsung 22
```

#### 配置browserslist

- **我们如何可以配置browserslist呢？两种方案：**
  - 方案一：在package.json中配置；
  - 方案二：单独的一个配置文件.browserslistrc文件；

方案一：

```js
  "browserslist": [
    "last 2 version",
    "> 5%",
    "not dead"
  ],
```

方案二：

```js
last 2 version
not dead 
> 10%
```

> 这时候就会对目标浏览器进行适配

#### 默认配置和条件关系

- 如果没有配置，那么也会有一个默认配置：

  ```js
  //Default browsers query
  browserslist.defaults =[
   '1>0.5%',
  'last 2 versions',
  'Firefox ESR',
  'not dead'   
  ]
  ```

  在配置中还可以写and ,or这些关系语句

  - **babel在对代码转化时，会根据browserslist中的配置对我们的代码进行转化**

- **在开发中我们也可以在babel配置中手动配置目标浏览器**···

```js
 rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            //使用babel中的插件
            plugins: [
              "@babel/plugin-transform-block-scoping",
              "@babel/plugin-transform-arrow-functions",
            ],
            //使用预设 ,把使用的预设写成数组形式，通过targets来进行配置
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: "> 5%",  //对目标浏览器的配置
                },
              ],
            ],
          },
        },
      },
    ]
```

- **那么，如果两个同时配置了，哪一个会生效呢？**
  - 配置的targets属性会覆盖browserslist；
  - 但是在开发中，更推荐通过browserslist来配置，因为类似于postcss工具，也会使用browserslist，进行统一浏览器的适配

> **总结：**
>
> browserslist可以决定babel会把我们的代码转换成什么代码对浏览器进行适配
>
> **如何使用？：**
>
> 1.在package.json中设置"browserslist"属性进行配置
>
> 2.在文件.browserslist中进行设置
>
> 3.可以在babe-loader的预设中设置targets属性进行对目标浏览器的适配(不推荐)

### Stage-X的preset

- **要了解Stage-X，我们需要先了解一下TC39的组织：**
  - TC39是指技术委员会（Technical Committee）第 39 号；
  - 它是 ECMA 的一部分，ECMA 是 “ECMAScript” 规范下的 JavaScript 语言标准化的机构；
  - ECMAScript 规范定义了 JavaScript 如何一步一步的进化、发展；
- **TC39 遵循的原则是：分阶段加入不同的语言特性，新流程涉及四个不同的 Stage**
  - **Stage 0**：strawman（稻草人），任何尚未提交作为正式提案的讨论、想法变更或者补充都被认为是第 0 阶段的"稻草人"；
  - **Stage 1**：proposal（提议），提案已经被正式化，并期望解决此问题，还需要观察与其他提案的相互影响；
  - **Stage 2**：draft（草稿），Stage 2 的提案应提供规范初稿、草稿。此时，语言的实现者开始观察 runtime 的具体实现是否
    合理；
  - **Stage 3**：candidate（候补），Stage 3 提案是建议的候选提案。在这个高级阶段，规范的编辑人员和评审人员必须在最终
    规范上签字。Stage 3 的提案不会有太大的改变，在对外发布之前只是修正一些问题；
  - **Stage 4**：finished（完成），进入 Stage 4 的提案将包含在 ECMAScript 的下一个修订版中；

#### Babel的Stage-X设置

- **在babel7之前（比如babel6中），我们会经常看到这种设置方式：**
  - 它表达的含义是使用对应的 babel-preset-stage-x 预设；
  - 但是从babel7开始，已经不建议使用了，建议使用preset-env来设置；

```js
module.exports ={
    "presets":["stage-0"]
}
```

### Babel的配置文件

- **像之前一样，我们可以将babel的配置信息放到一个独立的文件中，babel给我们提供了两种配置文件的编写：**
  - **babel.config.json**（或者.js，.cjs，.mjs）文件；
  - **.babelrc.json**（或者.babelrc，.js，.cjs，.mjs）文件；
- **它们两个有什么区别呢？目前很多的项目都采用了多包管理的方式（babel本身、element-plus、umi等）；**
  - **.babelrc.json**：早期使用较多的配置方式，但是对于配置Monorepos项目是比较麻烦的；
  - **babel.config.json**（babel7）：可以直接作用于Monorepos项目的子包，更加推荐；

直接写在webpack.config.js文件中

```js
 rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",babel
          options: {
            //使用babel中的插件
            plugins: [
              "@babel/plugin-transform-block-scoping",
              "@babel/plugin-transform-arrow-functions",
            ],
            //使用预设
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: "> 5%",
                },
              ],
            ],
          },
        },
      },
    ],
```

写在babel.config.js文件中，它的作用和上面写法一致

```js
module.exports = {
  //使用babel中的插件
  // plugins: [
  //   "@babel/plugin-transform-block-scoping",
  //   "@babel/plugin-transform-arrow-functions",
  // ],
  //使用预设
  presets: [
    [
      "@babel/preset-env",
      {
        targets: "> 5%",
      },
    ],
  ],
};

```

> **也就是说webpack会自动检查babel.config.js文件并且把里面的配置添加到babel-loader的options中**

### 认识polyfill

- **Polyfill是什么呢？**
  - 翻译：一种用于衣物、床具等的聚酯填充材料, 使这些物品更加温暖舒适；
  - 理解：更像是应该填充物（垫片），一个补丁，可以帮助我们更好的使用JavaScript；
- **什么时候会用到polyfill呢？**
  - 比如我们使用了一些语法特性（例如：Promise, Generator, Symbol等以及实例方法例如Array.prototype.includes等）
  - 但是某些浏览器压根不认识这些特性，必然会报错；
  - 我们可以使用polyfill来填充或者说打一个补丁，那么就会包含该特性了；

#### 如何使用polyfill？

- **babel7.4.0之前，可以使用 @babel/polyfill的包，但是该包现在已经不推荐使用了：**
- **babel7.4.0之后，可以通过单独引入core-js和regenerator-runtime来完成polyfill的使用：**

```js
npm install core-js regenerator-runtime --save
```

```js
  {
        test: /\.js$/,
        exclude: /node_module/, //表示babel不对node_module下的代码进行转换
        use: {
          loader: "babel-loader",
        },
      },
```

#### 配置babel.config.js

- **我们需要在babel.config.js文件中进行配置，给preset-env配置一些属性：**
- **useBuiltIns**：设置以什么样的方式来使用polyfill；
- **corejs**：设置corejs的版本，目前使用较多的是3.x的版本，比如我使用的是3.8.x的版本；
  - 另外corejs可以设置是否对提议阶段的特性进行支持；
  - 设置 proposals属性为true即可

#### useBuiltIns属性设置

- **useBuiltIns属性有三个常见的值**
- **第一个值：false**
  - 打包后的文件不使用polyfill来进行适配；
  - 并且这个时候是不需要设置corejs属性的；
- **第二个值：usage**
  - 会根据源代码中出现的语言特性，自动检测所需要的polyfill；
  - 这样可以确保最终包里的polyfill数量的最小化，打包的包相对会小一些；
  - 可以设置corejs属性来确定使用的corejs的版本；

babel.config.js文件

```js
module.exports = {
  //使用预设
  presets: [
    [
      "@babel/preset-env",
      {
        //设置polyfill
        corejs: 3,
        useBuiltIns: "usage",
      },
    ],
  ],
};

```

- **第三个值：entry**
  - 如果我们依赖的某一个库本身使用了某些polyfill的特性，但是因为我们使用的是usage，所以之后用户浏览器可能会报错；
  - 所以，如果你担心出现这种情况，可以使用 entry；
  - 并且需要在入口文件中添加 `import 'core-js/stable'; import 'regenerator-runtime/runtime';
  - 这样做会根据 browserslist 目标导入所有的polyfill，但是对应的包也会变大

入口文件引入

```js
import "core-js/stable";
import "regenerator-runtime/runtime";
```

babel.config.js配置

```js
module.exports = {
  //使用预设
  presets: [
    [
      "@babel/preset-env",
      {
        //设置polyfill
        corejs: 3,
        useBuiltIns: "entry",
      },
    ],
  ],
};
```

### React的jsx支持

- **在我们编写react代码时，react使用的语法是jsx，jsx是可以直接使用babel来转换的。**
- **对react jsx代码进行处理需要如下的插件：**
  - @babel/plugin-syntax-jsx
  - @babel/plugin-transform-react-jsx
  - @babel/plugin-transform-react-display-name
- **但是开发中，我们并不需要一个个去安装这些插件，我们依然可以使用preset来配置：**

```js
npm install @babel/preset-react -D
```

react组件

```js
import React, { memo, useState } from "react";

const App = memo(() => {
  const [counter, setCounter] = useState(0);

  const add = (num) => {
    setCounter(counter + num);
  };
  return (
    <div>
      <span>当前计数:{counter}</span>
      <button onClick={(e) => add(1)}>+1</button>
    </div>
  );
});

export default App;

```

入口文件

```js
// import "core-js/stable";
// import "regenerator-runtime/runtime";
import React from "react";
import ReactDom from "react-dom/client";
import App from "./react/App";

const root = ReactDom.createRoot(document.querySelector("#root"));

root.render(<App />);

```

babel.config.js配置

```js
module.exports = {
  //使用预设
  presets: [
    [
      "@babel/preset-env",
    ],
    "@babel/preset-react", //使用@babel/preset-react预设
  ],
};

```

### TypeScript的编译

- **在项目开发中，我们会使用TypeScript来开发，那么TypeScript代码是需要转换成JavaScript代码。**
- **可以通过TypeScript的compiler来转换成JavaScript：**

```js
npm install typescript -D
```

如果安装了ts-loader会自动安装typescript

```js
npm install ts-loader -D
```

- **另外TypeScript的编译配置信息我们通常会编写一个tsconfig.json文件：**

```js
tsc --init # 运行这个命令会生成tsconfig.json配置文件
```

- **之后我们可以运行 npx tsc来编译自己的ts代码：**

```js
npx tsc
```

- **如果我们希望在webpack中使用TypeScript，那么我们可以使用ts-loader来处理ts文件：**

```js
npm install ts-loader -D
```

- **配置ts-loader：**

```js
  { test: /\.ts$/, use: "ts-loader" },
```

- **之后，我们通过npm run build打包即可。**

#### 使用babel-loader

- **除了可以使用TypeScript Compiler来编译TypeScript之外，我们也可以使用Babel：**
  - Babel是有对TypeScript进行支持；
  - 我们可以使用插件： @babel/tranform-typescript；
  - 但是更推荐直接使用preset：@babel/preset-typescript；
- **我们来安装@babel/preset-typescript：**

```js
npm install @babel/preset-typescript -D
```

```js
module.exports = {
  //使用预设
  presets: [
    [
      "@babel/preset-env",
      // {
      //   //设置polyfill
      //   corejs: 3,
      //   useBuiltIns: "entry",
      // },
    ],
    "@babel/preset-react",
     [
      "@babel/preset-typescript",
      {
        corejs: 3,
        useBuiltIns: "usage",
      },
    ],
  ],
};

```

```js
    { test: /\.ts$/, exclude: /node_module/, use: "babel-loader" },
```

#### ts-loader和babel-loader选择

- **那么我们在开发中应该选择ts-loader还是babel-loader呢？**
- **使用ts-loader（TypeScript Compiler）**
  - 来直接编译TypeScript，那么只能将ts转换成js；
  - 如果我们还希望在这个过程中添加对应的polyfill，那么ts-loader是无能为力的；
  - 我们需要借助于babel来完成polyfill的填充功能；
- **使用babel-loader（Babel）**
  - 来直接编译TypeScript，也可以将ts转换成js，并且可以实现polyfill的功能；
  - 但是babel-loader在编译的过程中，不会对类型错误进行检测；
- **那么在开发中，我们如何可以同时保证两个情况都没有问题呢？**

在ts官方文档中也有说明

> 在转换代码时使用babel,在类型检测时使用tsc

- **也就是说我们使用Babel来完成代码的转换，使用tsc来进行类型的检查。**
- **但是，如何可以使用tsc来进行类型的检查呢？**
  - 在这里，可以在scripts中添加了两个脚本，用于类型检查；
  - 我们执行 npm run type-check可以对ts代码的类型进行检测；
  - 我们执行 npm run type-check-watch可以实时的检测类型错误；

```js
  "scripts": {
    "ts-check": "tsc --noEmit",  //noEmit说明只是做类型校验，不做输出
    "ts-check-watch": "tsc --noEmit --watch"
  },
```

## webpack开发服务器配置

### 为什么要搭建本地服务器？

- **目前我们开发的代码，为了运行需要有两个操作：**
  - 操作一：npm run build，编译相关的代码；
  - 操作二：通过live server或者直接通过浏览器，打开index.html代码，查看效果；
- **这个过程经常操作会影响我们的开发效率，我们希望可以做到，当文件发生变化时，可以自动的完成 编译 和 展示**；
- **为了完成自动编译，webpack提供了几种可选的方式：**
  - webpack watch mode；
  - **webpack-dev-server（常用）；**
  - webpack-dev-middleware；

### webpack-dev-server

- **上面的方式可以监听到文件的变化，但是事实上它本身是没有自动刷新浏览器的功能的：**
  - 当然，目前我们可以在VSCode中使用live-server来完成这样的功能；
  - 但是，我们希望在不适用live-server的情况下，可以具备live reloading（实时重新加载）的功能；
- **安装webpack-dev-server**

```js
npm install webpack-dev-server -D
```

-  **修改配置文件，启动时加上serve参数：**

```js
  devServer: {},
```

```js
    "serve": "webpack serve --config webpack.config.js"   # --config是指定读取的webpack配置文件
```

- **webpack-dev-server 在编译之后不会写入到任何输出文件，而是将 bundle 文件保留在内存中：**
  - 事实上webpack-dev-server使用了一个库叫memfs（memory-fs webpack自己写的）

> webpack-dev-server将编译文件保存在内存中，然后帮我们开启一个本地服务器，浏览器访问服务器展示页面

### devServer的static

- **devServer中static对于我们直接访问打包后的资源其实并没有太大的作用，它的主要作用是如果我们打包后的资源，又依赖于**
  **其他的一些资源，那么就需要指定从哪里来查找这个内容：**

  - 比如在index.html中，我们需要依赖一个 abc.js 文件，这个文件我们存放在 public文件 中；

  - 在index.html中，我们应该如何去引入这个文件呢？

    - 比如代码是这样的：

      ```js
      <script src="./public/abc.js"></script>	
      ```

    - 但是这样打包后浏览器是无法通过相对路径去找到这个文件夹的；

    - 所以代码是这样的：

      ```js
      script src="/abc.js"></script>; # 设置了static指定了文件目录，这里就不要在写目录
      ```

    - 但是我们如何让它去查找到这个文件的存在呢？ 设置static即可；

```js
  devServer: {
    static: ["public", "content"], //默认是public
  },
```

> 如果在index.html中又引入了其他静态资源，我们的devServer是不知道从哪里找的，我们需要设置static属性，指定寻找的目录，默认是public

### hotOnly、host配置

- **hotOnly是当代码编译失败时，是否刷新整个页面：（已废弃）**
  - 默认情况下当代码编译失败修复后，我们会重新刷新整个页面；
  - 如果不希望重新刷新整个页面，可以设置hotOnly为true；
- **host设置主机地址：**
  - 默认值是localhost；
  - 如果希望其他地方也可以访问，可以设置为 0.0.0.0；
- **localhost 和 0.0.0.0 的区别：**
  - localhost：本质上是一个域名，通常情况下会被解析成127.0.0.1;
  - 127.0.0.1：回环地址(Loop Back Address)，表达的意思其实是我们主机自己发出去的包，直接被自己接收;
    - 正常的数据库包经常 应用层 - 传输层 - 网络层 - 数据链路层 - 物理层 ;
    - 而回环地址，是在网络层直接就被获取到了，是不会经常数据链路层和物理层的;
    - 比如我们监听 127.0.0.1时，在同一个网段下的主机中，通过ip地址是不能访问的;
  - 0.0.0.0：监听IPV4上所有的地址，再根据端口找到不同的应用程序;
    - 比如我们监听 0.0.0.0时，在同一个网段下的主机中，通过ip地址是可以访问的;

### port、open、compress

- **port设置监听的端口，默认情况下是8080**
- **open是否打开浏览器：**
  - 默认值是false，设置为true会打开浏览器；
  - 也可以设置为类似于 Google Chrome等值；
- **compress是否为静态文件开启gzip compression：**
  - 默认值是false，可以设置为true

```js
  devServer: {
    static: ["public", "content"], //默认是public 指定静态资源文件
    // host: "0.0.0.0",   // 设置主机地址
    port: 8000, //端口号
    open: true, //是否打开浏览器
    compress: true, //是否对文件进行压缩  可以在请求头中查看文件格式
  },
```

### Proxy代理

- **proxy是我们开发中非常常用的一个配置选项，它的目的设置代理来解决跨域访问的问题：**
  - 比如我们的一个api请求是 http://localhost:8888，但是本地启动服务器的域名是 http://localhost:8080，这个时候发送网络请求就会出现跨域的问题；
  - 那么我们可以将请求先发送到一个代理服务器，代理服务器和API服务器没有跨域的问题，就可以解决我们的跨域问题了；
- **我们可以进行如下的设置：**
  - **target**：表示的是代理到的目标地址，比如 /api-hy/moment会被代理到 http://localhost:8888/api-hy/moment；
  - **pathRewrite**：默认情况下，我们的 /api-hy 也会被写入到URL中，如果希望删除，可以使用pathRewrite；
  - **changeOrigin**：它表示是否更新代理后请求的headers中host地址；

前端请求配置

```js
   axios.get("/api/users/list").then((res) => { 
       console.log(res.data)
    });
```

> 如果请求路径是/开头 其实默认会携带当前的请求地址  http://localhost:8000/api

devServe.proxy配置

```js
  devServer: {
    static: ["public", "content"], //默认是public 指定静态资源文件
    // host: "0.0.0.0",   // 设置主机地址
    port: 8000, //端口号
    open: true, //是否打开浏览器
    compress: true, //是否对文件进行压缩
    proxy: {
      "/api": { //把/api替换为target
        target: "http://localhost:9000",
        pathRewrite: {
          "^/api": "",   //把/api替换为空
        },
       changeOrigin: true,
      },
    },
  },
```

后端服务器配置

```js
const express = require("express");

const app = express();
const userRouter = express.Router();
app.use("/", (req, res, next) => {
  console.log("请求成功");
  next();
});

userRouter.get("/list", (req, res) => {
  console.log(req.headers);
  res.json([
    {
      name: "james",
      age: 20,
    },
    {
      name: "curry",
      age: 52,
    },
    {
      name: "tom",
      age: 30,
    },
  ]);
});
app.use("/users", userRouter);

app.listen(9000, () => {
  console.log("express");
});

```

changeOrigin的解析:

- **这个 changeOrigin官方说的非常模糊，通过查看源码我发现其实是要修改代理请求中的headers中的host属性：**
  - 因为我们真实的请求，其实是需要通过 http://localhost:9000来请求的；
  - 但是因为使用了proxy代理，默认情况下它的值是 http://localhost:8000；
  - 如果我们需要修改，那么可以将changeOrigin设置为true即可；

请求默认值

```js
{
  'if-none-match': 'W/"4d-AUG0IE54ixz+kcePBZi54C+vY9Y"',
  cookie: 'Idea-6c423b14=c4e547ca-e81e-452f-a4c1-ad820b3a7453; Hm_lvt_f3cd8238138d11b92f82f00e78961aa9=1700727401',
  'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
  'accept-encoding': 'gzip, deflate, br',
  referer: 'http://localhost:8000/',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-origin',
  'sec-ch-ua-platform': '"Windows"',
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 
Safari/537.36',
  'sec-ch-ua-mobile': '?0',
  accept: 'application/json, text/plain, */*',
  'sec-ch-ua': '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
  connection: 'close',
  host: 'localhost:8000' # host默认为8000 为代理服务器的地址
}
```

设置了changeOrigin之后的host:

```js
{
  'if-none-match': 'W/"4d-AUG0IE54ixz+kcePBZi54C+vY9Y"',
  cookie: 'Idea-6c423b14=c4e547ca-e81e-452f-a4c1-ad820b3a7453; Hm_lvt_f3cd8238138d11b92f82f00e78961aa9=1700727401',
  'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
  'accept-encoding': 'gzip, deflate, br',
  referer: 'http://localhost:8000/',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-origin',
  'sec-ch-ua-platform': '"Windows"',
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 
Safari/537.36',
  'sec-ch-ua-mobile': '?0',
  accept: 'application/json, text/plain, */*',
  'sec-ch-ua': '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
  connection: 'close',
  host: 'localhost:9000' # 设置了changeOrigin host的值与请求地址一致
}
```

> 设置changeOrigin的原因主要是为了防止后端对请求host进行限制，你只能请求它的地址
>
> **changeOrigin的本质就是修改代理请求中的headers中的host属性**

### historyApiFallback

- **historyApiFallback是开发中一个非常常见的属性，它主要的作用是解决SPA页面在路由跳转之后，进行页面刷新时，返回404**
  **的错误。**
- **boolean值：默认是false**
  - 如果设置为true，那么在刷新时，返回404错误时，会自动返回 index.html 的内容；
- **object类型的值，可以配置rewrites属性：**
  - 可以配置from来匹配路径，决定要跳转到哪一个页面；
- **事实上devServer中实现historyApiFallback功能是通过connect-history-api-fallback库的：**
  - 可以查看看[connect-history-api-fallback](https://github.com/bripkens/connect-history-api-fallback) 文档

```js
  devServer: {
    static: ["public", "content"], //默认是public 指定静态资源文件
    // host: "0.0.0.0",   // 设置主机地址
    port: 8000, //端口号
    open: true, //是否打开浏览器
    compress: true, //是否对文件进行压缩
    proxy: {
      "/api": {
        target: "http://localhost:9000",
        pathRewrite: {
          "^/api": "",
        },
        changeOrigin: true,
      },
    },
    historyApiFallback: true,
  },
```

> 在项目中如果是通过点页面的方式进行路由的跳转，会根据对应的路由映射到对应的组件进行跳转
>
> 但是如果直接更改请求路径的话，其实本质会向游览器请求对应的html文件，如果没有这个html文件，那么就会报错
>
> 比如请求xxx/about路由，浏览器会请求对应的about.html页面，没有就会报错
>
> 在实际开发中一般都会开启historyApiFallback选项，就算直接更改请求路径，也不会报错，会返回index.html文件

## webpack性能优化方案

### 如何使用webpack性能优化？

- **webpack作为前端目前使用最广泛的打包工具，在面试中也是经常会被问到的。**
- **比较常见的面试题包括：**
  - 可以配置哪些属性来进行**webpack性能优化**？
  - **前端有哪些常见的性能优化**？（问到前端性能优化时，除了其他常见的，也完全可以从webpack来回答）
- **webpack的性能优化较多，我们可以对其进行分类：**
  - 优化一：**打包后的结果**，上线时的性能优化。（比如分包处理、减小包体积、CDN服务器等）
  - 优化二：**优化打包速度**，开发或者构建时优化打包速度。（比如exclude、cache-loader等）
- **大多数情况下，我们会更加侧重于优化一，这对于线上的产品影响更大。**
- **在大多数情况下webpack都帮我们做好了该有的性能优化**：
  - 比如配置mode为production或者development时，默认webpack的配置信息；
  - 但是我们也可以针对性的进行自己的项目优化；
- **接下来，我们来学习一下webpack性能优化的更多细节**

### 性能优化 - 代码分离

- **代码分离（Code Splitting）是webpack一个非常重要的特性：**
  - 它主要的目的是将**代码分离到不同的bundle**中，之后我们可以**按需加载**，或者**并行加载这些文件；**
  - 比如**默认情况**下，**所有的JavaScript代码（业务代码、第三方依赖、暂时没有用到的模块）在首页全部都加载**，就会影响首页
    的加载速度；
  - 代码分离可以**分出更小的bundle**，以及**控制资源加载优先级，提供代码的加载性能；**
- **Webpack中常用的代码分离有三种：**
  - **多入口起点**：使用entry配置手动分离代码；
  - **防止重复**：使用Entry Dependencies或者SplitChunksPlugin去重和分离代码；
  - **动态导入**：通过模块的内联函数调用来分离代码（import("某一个文件")）

#### 多入口起点

- 入口起点的含义非常简单，就是配置多入口：
  - 比如配置一个index.js和main.js的入口；
  - 他们分别有自己的代码逻辑；

```js
  entry: {  //打包二个文件
    index: "./src/index.js",
    main: "./src/main.js",
  },
  // devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "[name]-bundle.js", //[name]是占位作用 多入口文件的名字
    clean: true,
  },
```

打包之后的文件：

![多入口打包文件](../../00_image/09_前端工程化高级/入口分包生成文件.png)

#### 防止重复

- **假如我们的index.js和main.js都依赖两个库：lodash、dayjs**
  - 如果我们单纯的进行入口分离，那么打包后的两个bunlde都有会有一份lodash和dayjs；
  - 事实上我们可以对他们进行共享；

```js
 entry: {
    index: {
      import: "./src/index.js",
      dependOn: "shared",
    },
    main: {
      //对象写法
      import: "./src/main.js", //指定路径
      dependOn: "shared", //共享依赖
    },
    shared: ["axios"], //指定共享第三方库
  },
```

共享依赖生成文件:

![共享依赖生成文件](../../00_image/09_前端工程化高级/共享依赖生成文件.png)

#### 动态导入(dynamic import)

- **另外一个代码拆分的方式是动态导入时，webpack提供了两种实现动态导入的方式：**
  - 第一种，使用ECMAScript中的 **import() 语法**来完成，也是目前推荐的方式；
  - 第二种，使用webpack遗留的 **require.ensure**，目前已经不推荐使用；
- **比如我们有一个模块 bar.js：**
  - 该模块我们希望**在代码运行过程中来加载它**（比如判断一个条件成立时加载）；
  - 因为我们**并不确定这个模块中的代码一定会用到**，所以**最好拆分成一个独立的js文件**；
  - 这样可以保证不用到该内容时，**浏览器不需要加载和处理该文件的js代码；**
  - 这个时候我们就**可以使用动态导入**；
- **注意：使用动态导入bar.js：**
  - 在webpack中，通过**动态导入获取到一个对象；**
  - 真正导出的内容，**在该对象的default属性**中，所以我们**需要做一个简单的解构；**

> 比如路由懒加载用过import()函数实现，返回的是个promise

模拟路由文件:

```js
const Hel = document.createElement("h1");
Hel.textContent = "About Page";

document.body.append(Hel);
```

使用路由

```js
//没有使用import方式啊，webpack在打包时会打包到一个文件中
// import "./router/about";
// import "./router/category";

const btn1 = document.createElement("button");
const btn2 = document.createElement("button");

btn1.textContent = "关于";
btn2.textContent = "分类";

document.body.append(btn1);
document.body.append(btn2);

btn1.onclick = () => {
    //使用import()进行分包处理，可以实现只要在按钮点击时才会加载这个文件，减少首屏加载速度
    /*webpackChunkName:"about"*/   魔法注释，指定打包之后的文件名
    //如果不指定名字会根据webpack默认的配置进行命名
  import(/*webpackChunkName:"about"*/ "./router/about");
};
btn2.onclick = () => {
  import(/*webpackChunkName:"category"*/ "./router/category");
};

```

在配置文件中也可以针对分包的文件进行命名

```js
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "[name]-bundle.js", //[name]是占位作用 多入口文件的名字
    //单独针对分包的文件进行命名  name会与魔法注释的名称相匹配
    chunkFilename: "[name]_chunk.js",
    clean: true,
  },
```

#### SplitChunks

- **另外一种分包的模式是splitChunk，它底层是使用SplitChunksPlugin来实现的：**
  - 因为**该插件webpack已经默认安装和集成**，所以我们**并不需要单独安装和直接使用该插件**；
  - 只需要**提供SplitChunksPlugin相关的配置信息**即可；
- **Webpack提供了SplitChunksPlugin默认的配置，我们也可以手动来修改它的配置：**
  - 比如默认配置中，chunks仅仅针对于异步（async）请求(import函数)抽离单独文件，我们可以设置为initial或者all；

```js
//优化配置 
optimization: {
    splitChunks: { 
      chunks: "all",   //设置为all时，意味着 chunk 可以在异步和非异步 chunk 之间共享，比之前只处理异步请求做的使用更多
                         //比如可以对node-module模块进行分包处理
    },  
  },
```

##### SplitChunks自定义拆包配置解析

- **Chunks:**
  - 默认值是async
  - 另一个值是initial，表示对通过的代码进行处理
  - all表示对同步和异步代码都进行处理
- **minSize：**
  - 拆分包的大小, 至少为minSize；
  - 如果一个包拆分出来达不到minSize,那么这个包就不会拆分；
- **maxSize：**
  - 将大于maxSize的包，拆分为不小于minSize的包；
- **cacheGroups：**
  - 用于对拆分的包就行分组，比如一个lodash在拆分之后，并不会立即打包，而是会等到有没有其他符合规则的包一起来打包；
  - test属性：匹配符合规则的包；
  - name属性：拆分包的name属性；
  - filename属性：拆分包的名称，可以自己使用placeholder属性；

```js
 optimization: {
     //optimization.chunkIds配置用于告知webpack模块的id采用什么算法生成。
    chunkIds: "deterministic",
    splitChunks: {
      chunks: "all",
      //拆分包的最小体积
      //如果一个包拆分出来达不到minSize,·那么这个包就不会拆分（会被合并到其他包中）
      minSize: 20,
      //将大于maxSize的包，拆分成不小于minSize的包()
      maxSize: 10000,
      //对于拆分包进行分组
      cacheGroups: {
        //key 文件名称 test匹配规则 filename生成文件名
        venders: {
          test: /node_module/,
          filename: "[id]_vendors.js",
        },
        router: {
          test: /router/,
          filename: "[id]_router.js",
        },
      },
    },
  },
```

> mode在development模式下，使用splitChunks生成的打包文件名字很长，但是在production模式下生成的名字会很简洁

##### optimization.chunkIds配置

- **optimization.chunkIds配置用于告知webpack模块的id采用什么算法生成。**
- **有三个比较常见的值：**
  - **natural**：按照数字的顺序使用id；
  -  **named**：development下的默认值，一个可读的名称的id；
  - **deterministic**：确定性的，在不同的编译中不变的短数字id
    - 在webpack4中是没有这个值的；
    - 那个时候如果使用natural，那么在一些编译发生变化时，就会有问题；
- **最佳实践：**
  - 开发过程中，我们推荐使用named；
  - 打包过程中，我们推荐使用deterministic；

##### optimization.runtimeChunk配置

- **配置runtime相关的代码是否抽取到一个单独的chunk中：**

  - runtime相关的代码指的是在运行环境中，对**模块进行解析、加载、模块信息相关的代码；**
  - 比如**我们的about、category两个通过import函数相关的代码加载**，就是**通过runtime代码完成**的；

- **抽离出来后，有利于浏览器缓存的策略：**

  - 比如我们**修改了业务代码（main）**，那么**runtime和about、category的chunk是不需要重新加载**的；
  - 比如**我们修改了about、category的代码**，那么**main中的代码是不需要重新加载**的；

- 设置的值：

  - true/multiple：针对每个入口打包一个runtime文件；
  - single：打包一个runtime文件；
  - 对象：name属性决定runtimeChunk的名称；

  ```js
    optimization: {
      chunkIds: "deterministic",
      runtimeChunk: {
        name: "runtime",
      },
     }
  ```

> 就是把对模块进行解析、加载、模块信息相关的代码，抽离成一个单独的文件，不影响其他文件

### Prefetch和Preload

- **webpack v4.6.0+ 增加了对预获取和预加载的支持。**
- **在声明 import 时，使用下面这些内置指令，来告知浏览器：**
  - **prefetch**(预获取)：将来某些导航下可能需要的资源
  - **preload**(预加载)：当前导航下可能需要资源

```js

btn1.onclick = () => {
  import(
    /*webpackChunkName:"about"*/ /*webpackPrefetch:true*/ "./router/about"
  );
};
btn2.onclick = () => {
  import(
    /*webpackChunkName:"category"*/ /*webpackPreload:true*/ "./router/category"
  );
};
```

- **与 prefetch 指令相比，preload 指令有许多不同之处：**
  - **preload chunk** 会在父 chunk 加载时，以**并行方式开始加载**。**prefetch chunk** 会在父 chunk 加载**结束后开始加载。**
  - **preload chunk** 具有**中等优先级**，并立即下载。**prefetch chunk 在浏览器闲置时下载。**
  - preload chunk 会在父 chunk 中立即请求，用于当下时刻。prefetch chunk 会用于未来的某个时刻

### 什么是CDN？

- **CDN称之为内容分发网络（Content Delivery Network或Content Distribution Network，缩写：CDN）**
  - 它是指通过相互连接的网络系统，利用最靠近每个用户的服务器；
  - 更快、更可靠地将音乐、图片、视频、应用程序及其他文件发送给用户；
  - 来提供高性能、可扩展性及低成本的网络内容传递给用户

![CDN](../../00_image/04_前端工程化/CDN图解.png)

- 在开发中，我们使用CDN主要是两种方式：
  - 方式一：打包的所有静态资源，放到CDN服务器，用户所有资源都是通过CDN服务器加载的；
  - 方式二：一些第三方资源放到CDN服务器上；

- **如果所有的静态资源都想要放到CDN服务器上，我们需要购买自己的CDN服务器；**
  - 目前阿里、腾讯、亚马逊、Google等都可以购买CDN服务器；
  - 我们可以直接修改publicPath，在打包时添加上自己的CDN地址；

```js
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "[name]-bundle.js", //[name]是占位作用 多入口文件的名字
    //单独针对分包的文件进行命名
    chunkFilename: "[name]_chunk.js",
    clean: true,
    publicPath: "http://liweiyeCdn/", //配置了这个选项，在打包时，会自动添加在打包文件的前面
  },
```

```js
    <script defer="defer" src="http://liweiyeCdn/runtime-bundle.js"></script>
    <script defer="defer" src="http://liweiyeCdn/index-bundle.js"></script>
    <script defer="defer" src="http://liweiyeCdn/main-bundle.js"></script>
```

#### 第三方库的CDN服务器

- **通常一些比较出名的开源框架都会将打包后的源码放到一些比较出名的、免费的CDN服务器上：**
  - 国际上使用比较多的是unpkg、JSDelivr、cdnjs；
  - 国内也有一个比较好用的CDN是bootcdn；
- **在项目中，我们如何去引入这些CDN呢？**
  - 第一，在打包的时候我们不再需要对类似于lodash或者dayjs这些库进行打包；
  - 第二，在html模块中，我们需要自己加入对应的CDN服务器地址；
- **第一步，我们可以通过webpack配置，来排除一些库的打包：**

```js
  //排除某些包不需要进行打包
  externals: {
    react: "React",
    //key属性名：排除的框架的名称
    //value值：从CDN地址请求下来的js中提供对应的名称
    axios: "axios",
  },
```

- **第二步，在html模块中，加入CDN服务器地址：**

```js
    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.6.2/axios.min.js"></script>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
```

### 认识shimming

- **shimming是一个概念，是某一类功能的统称：**
  - shimming翻译过来我们称之为 垫片，相当于给我们的代码填充一些垫片来处理一些问题；
  - 比如我们现在依赖一个第三方的库，这个第三方的库本身依赖lodash，但是默认没有对lodash进行导入（认为全局存在
    lodash），那么我们就可以通过ProvidePlugin来实现shimming的效果；
- **注意：webpack并不推荐随意的使用shimming**
  - Webpack背后的整个理念是使前端开发更加模块化；
  - 也就是说，需要编写具有封闭性的、不存在隐含依赖（比如全局变量）的彼此隔离的模块；

#### Shimming预支全局变量

- **目前我们的lodash、dayjs都使用了CDN进行引入，所以相当于在全局是可以使用_和dayjs的**
  - 假如一个文件中我们使用了axios，但是没有对它进行引入，那么下面的代码是会报错的；

```js
axios.get("http://123.207.32.32:8000/recommend").then((res)=>{
                  console.log(res);
);
get("http://123.207.32.32:8000/home/multidata").then((res)=>
                  console.Log(res);
});
```

- **我们可以通过使用ProvidePlugin来实现shimming的效果：**
  - **ProvidePlugin**能够帮助我们在每个模块中，通过一个变量来获取一个package；
  - 如果webpack看到这个模块，它将在最终的bundle中引入这个模块；
  - 另外ProvidePlugin是**webpack默认的一个插件**，所以不需要专门导入；
- **这段代码的本质是告诉webpack：**
  - 如果你遇到了至少一处用到 axios变量的模块实例，那请你将 axios package 引入进来，并将其提供给需要用到它的模块

```js
 plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new ProvidePlugin({
     axios:"axios",
      get:["axios","get"]
    }) 
  ],
```

### MiniCssExtractPlugin

- **MiniCssExtractPlugin可以帮助我们将css提取到一个独立的css文件中，该插件需要在webpack4+才可以使用。**

- **首先，我们需要安装 mini-css-extract-plugin：**

  ```js
  npm install mini-css-extract-plugin -D
  ```

- **配置rules和plugins：**

```js
 {
        test: /\.css$/,
        use: [
          //"style-loader",     //style-loader 以内联样式的方式添加css
          MiniCssExtractPlugin.loader, //miniCss以link标签的方式引入css
          "css-loader", //webpack中loader生效是以下往上的  css负责处理css文件 style-loader负责展示样式
        ],
      },
```

插件：

```js
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",   # css/的意思是生成css文件夹  这个是对css文件分包处理
      chunkFilename: "css/[name].css",  //对动态导入的css单独分包 import()
    }),
  ],
```

### Hash、ContentHash、ChunkHash

- **在我们给打包的文件进行命名的时候，会使用placeholder，placeholder中有几个属性比较相似：**
  - hash、chunkhash、contenthash
  -  hash本身是通过MD4的散列函数处理后，生成一个128位的hash值（32个十六进制）；
- **hash值的生成和整个项目有关系：**
  - 比如我们现在有两个入口index.js和main.js；
  - 它们分别会输出到不同的bundle文件中，并且在文件名称中我们有使用hash；
  - 这个时候，如果修改了index.js文件中的内容，那么hash会发生变化；
  - 那就意味着两个文件的名称都会发生变化；
- **chunkhash可以有效的解决上面的问题，它会根据不同的入口进行借来解析来生成hash值：-** 
  - 比如我们修改了index.js，那么main.js的chunkhash是不会发生改变的；

- **contenthash表示生成的文件hash名称，只和内容有关系：**
  - 比如我们的index.js，引入了一个style.css，style.css有被抽取到一个独立的css文件中；
  - 这个css文件在命名时，如果我们使用的是chunkhash；
  - 那么当index.js文件的内容发生变化时，css文件的命名也会发生变化；
  - 这个时候我们可以使用contenthash

### 认识DLL库（了解）

- **DLL是什么呢？**
  - DLL全程是动态链接库（Dynamic Link Library），是为软件在Windows中实现共享函数库的一种实现方式；
  - 那么webpack中也有内置DLL的功能，它指的是我们可以将**能够共享，并且不经常改变的代码，抽取成一个共享的库；**
  - 这个库**在之后编译的过程中，会被引入到其他项目的代码**中；
- **DDL库的使用分为两步:**
  - 第一步：打包一个DLL库；
  - 第二步：项目中引入DLL库；
- **注意：在升级到webpack4之后，React和Vue脚手架都移除了DLL库（下面的vue作者的回复），所以知道有这么一个概念即**
  **可。**

### Terser介绍和安装

- **什么是Terser呢？**
  - Terser是一个JavaScript的解释（Parser）、Mangler（绞肉机）/Compressor（压缩机）的工具集；
  - 早期我们会使用 uglify-js来压缩、丑化我们的JavaScript代码，但是目前已经不再维护，并且不支持ES6+的语法；
  -  Terser是从 uglify-es fork 过来的，并且保留它原来的大部分API以及适配 uglify-es和uglify-js@3等；
- **也就是说，Terser可以帮助我们压缩、丑化我们的代码，让代码更加简单，让我们的bundle变得更小。**
- **因为Terser是一个独立的工具，所以它可以单独安装**

```js
# 全局安装
npm install terser -g
# 局部安装
npm install terser -D
```

- **我们可以在命令行中使用Terser：**

```js
terser [input files] [options]
# 举例说明
terser js/file1.js -o foo.min.js -c -m
```

- **我们这里来讲解几个Compress option和Mangle(乱砍) option：**
  - 因为他们的配置非常多，我们不可能一个个解析，更多的查看文档即可；
  - https://github.com/terser/terser#compress-options
  - https://github.com/terser/terser#mangle-options

#### Compress和Mangle的options

- **Compress option：**
  - **arrows**：class或者object中的函数，转换成箭头函数；
  - **arguments**：将函数中使用 arguments[index]转成对应的形参名称；
  - **dead_code**：移除不可达的代码（tree shaking）；
  - 其他属性可以查看文档；

- **Mangle option**
  - **toplevel**：默认值是false，顶层作用域中的变量名称，进行丑化（转换）；
  -  **keep_classnames**：默认值是false，是否保持依赖的类名称；
  - **keep_fnames**：默认值是false，是否保持原来的函数名称；
  - 其他属性可以查看文档；

```js
npx terser ./src/abc.js -o abc.min.js -c
arrows,arguments=true,dead_code -m
toplevel=true,keep_classnames=true,keep_fnames=true
```

#### Terser在webpack中配置

- **真实开发中，我们不需要手动的通过terser来处理我们的代码，我们可以直接通过webpack来处理：**
  - 在webpack中有一个minimizer属性，在production模式下，默认就是使用TerserPlugin来处理我们的代码的；
  - 如果我们对默认的配置不满意，也可以自己来创建TerserPlugin的实例，并且覆盖相关的配置；
- **首先，我们需要打开minimize，让其对我们的代码进行压缩（默认production模式下已经打开了）**
- **其次，我们可以在minimizer创建一个TerserPlugin：**
  - **extractComments**：默认值为true，表示会将注释抽取到一个单独的文件中；
    - 在开发中，我们不希望保留这个注释时，可以设置为false；
  -  **parallel**：使用多进程并发运行提高构建的速度，默认值是true
    - 并发运行的默认数量： os.cpus().length - 1；
    - 我们也可以设置自己的个数，但是使用默认值即可；
  - **terserOptions**：设置我们的terser相关的配置
    - compress：设置压缩相关的选项；
    - mangle：设置丑化相关的选项，可以直接设置为true；
    - toplevel：顶层变量是否进行转换；
    -  keep_classnames：保留类的名称；
    - keep_fnames：保留函数的名称

```js
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terseroptions: {
          compress: {
            unused: false,
          },
          mangle: true,
          toplevel: true,
          keep_classnames: true,
          keep_fnames: true,
        },
      }),
    ],
  },
```

### CSS的压缩

- **另一个代码的压缩是CSS：**
  - CSS压缩通常是去除无用的空格等，因为很难去修改选择器、属性的名称、值等；
  -  CSS的压缩我们可以使用另外一个插件：css-minimizer-webpack-plugin；
  - css-minimizer-webpack-plugin是使用cssnano工具来优化、压缩CSS（也可以单独使用）；
- **第一步，安装 css-minimizer-webpack-plugin：**

```js
npm install css-minimizer-webpack-plugin -D
```

- **第二步，在optimization.minimizer中配置**

```js
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terseroptions: {
          compress: {
            unused: false,
          },

          mangle: true,
          toplevel: true,
          keep_classnames: true,
          keep_fnames: true,
        },
      }),
        # 对css进行压缩
      new CssMinimizerPlugin({
        parallel: true,
      }),
    ],
```

> terset有简单实现tree shaking效果

### 什么是Tree Shaking

- **什么是Tree Shaking呢？**
  - Tree Shaking是一个术语，在计算机中表示**消除死代码**（dead_code）；
  - 最早的想法**起源于LISP**，**用于消除未调用的代码**（纯函数无副作用，可以放心的消除，这也是为什么要求我们在进行函数式
    编程时，尽量使用纯函数的原因之一）；
  - 后来Tree Shaking也被应用于其他的语言，比如**JavaScript、Dart；**
- **JavaScript的Tree Shaking：**
  
  - 对JavaScript进行Tree Shaking是**源自打包工具rollup**（后面我们也会讲的构建工具）；
  
  - 这是因为Tree Shaking依赖于ES Module的静态语法分析（不执行任何的代码，可以明确知道模块的依赖关系）；
  
  - webpack2正式内置支持了ES2015模块，和检测未使用模块的能力；
  
  - 在webpack4正式扩展了这个能力，并且**通过 package.json的 sideEffects属性作为标记**，告知webpack在编译时，哪里文
    件可以安全的删除掉；
    
  - webpack5中，也提供了对部分CommonJS的tree shaking的支持；
    
    - 对esModule的支持比CommonJs支持好
    
    - https://github.com/webpack/changelog-v5#commonjs-tree-shaking

#### webpack实现Tree Shaking

- **事实上webpack实现Tree Shaking采用了两种不同的方案：**
  - **usedExports**：通过标记某些函数是否被使用，之后通过Terser来进行优化的；
  -  **sideEffects**：跳过整个模块/文件，直接查看该文件是否有副作用；

#### usedExports

- **将mode设置为development模式：**
  - 为了可以看到 usedExports带来的效果，我们需要设置为 development 模式
  -  因为在 production 模式下，webpack默认的一些优化会带来很大的影响。
- **设置usedExports为true和false对比打包后的代码：**
  - 在usedExports设置为true时，会有一段注释：unused harmony export mul；
  - 这段注释的意义是什么呢？**告知Terser在优化时，可以删除掉这段代码；**
- **这个时候，我们将 minimize设置true：**
  - usedExports设置为false时，mul函数没有被移除掉；
  - usedExports设置为true时，mul函数有被移除掉；
-  **所以，usedExports实现Tree Shaking是结合Terser来完成的。**

```js
optimization{
    //导入模块时，分析模块中的哪些函数有被使用，哪些函数没有被使用. 这样terser就会删除没有使用过的模块
    usedExports:true
}
```

#### sideEffects

- **sideEffects用于告知webpack compiler哪些模块是有副作用的：**
  - 副作用的意思是这里面的代码有执行一些特殊的任务，不能仅仅通过export来判断这段代码的意义；
  - 副作用的问题，在讲React的纯函数时是有讲过的；
- **在package.json中设置sideEffects的值：**
  - 如果我们将sideEffects设置为false，就是告知webpack可以安全的删除未用到的exports；
  - 如果有一些我们希望保留，可以设置为数组；
- **比如我们有一个format.js、style.css文件：**
  - 该文件在导入时没有使用任何的变量来接受；
  - 那么打包后的文件，不会保留format.js、style.css相关的任何代码；

在package.json文件中配置，告诉webpack

```js
//所有的文件都没有副作用
"sideEffects":false,
 
 //保留副作用文件
"sideEffects":[
"./src/util/format.js",  
"*.Css" //css使用import导入时，默认webpack会认为没有额外的副作用(没有使用export)会进行tree shaking,所以需要指定排除
]
```

- **所以，如何在项目中对JavaScript的代码进行TreeShaking呢（生成环境）？**
  - 在optimization中配置usedExports为true，来帮助Terser进行优化；
  - 在package.json中配置sideEffects，直接对模块进行优化

#### CSS实现Tree Shaking

- **上面我们学习的都是关于JavaScript的Tree Shaking，那么CSS是否也可以进行Tree Shaking操作呢？**
  - CSS的Tree Shaking需要借助于一些其他的插件；
  - 在早期的时候，我们会使用PurifyCss插件来完成CSS的tree shaking，但是目前该库已经不再维护了（最新更新也是在4年前
    了）；
  - 目前我们可以使用另外一个库来完成CSS的Tree Shaking：PurgeCSS，也是一个帮助我们删除未使用的CSS的工具；
- **安装PurgeCss的webpack插件**

```js
npm install purgecss-webpack-plugin -D
```

- **配置这个插件（生成环境）：**
  - paths：表示要检测哪些目录下的内容需要被分析，这里我们可以使用glob；
  - 默认情况下，Purgecss会将我们的html标签的样式移除掉，如果我们希望保留，可以添加一个safelist的属性；

```js
  plugins: [
      //对css进行TreeShaking
    new PurgeCSSPlugin({
      //立即获取所有的路径传递给paths传递的是一个数组    /**/* 表示的是递归的找src下的所有文件
      paths: glob.sync(`${path.resolve(__dirname, "../src")}/**/*`, {
        nodir: true, //nodir表示要找的不是文件夹
      }),
      safelist: {
        standard: ["html"],
      },
    }),
  ],
```

- **purgecss也可以对less文件进行处理（所以它是对打包后的css进行tree shaking操作）；**

### Webpack区分开发环境配置

如果在项目中把开发环境需要的配置和生产环境下需要的webpack配置都放在一个，这样会造成项目很大，不易于管理，所以我们实际使用时，可以区分当前项目的环境做不同webpack的配置

- **1.抽取开发和生产环境的配置文件**

![抽取不同环境的配置文件](../../00_image/09_前端工程化高级/抽取不同环境配置文件.png)

> common.js公共的配置
>
> dev 开发环境时webpack的配置
>
> prod 生产环境时webpack的配置

- **2.修改package.json文件配置**

```js
 "serve": "webpack serve --config ./config/common.config.js --env development",
  "build": "webpack --config ./config/common.config.js --env production"
```

> 把项目启动和打包命令读取的webpack配置修改为当前webpack配置在的目录
>
> --env 对当前环境进行配置，如果这样写在common配置文件中可以导出一个函数，在函数中可以拿到--env后的值

- **3.将配置文件导出的是一个函数，而不是一个对象**

common.config.js文件

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { merge } = require("webpack-merge");
const devConfig = require("./dev.config");
const prodConfig = require("./prod.config");

//这里写成一个函数是因为，需要获取当前的环境，对不同环境进行定制化
const commonConfig = function (isproduction) {
  return {
    //排除某些包不需要进行打包
    externals: {
      //key属性名：排除的框架的名称
      //value值：从CDN地址请求下来的js中提供对应的名称
      axios: "axios",
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
    //配置loader选项
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_module/, //表示babel不对node_module下的代码进行转换
          use: {
            loader: "babel-loader",
          },
        },
        { test: /\.ts$/, exclude: /node_module/, use: "babel-loader" },
        {
          test: /\.css$/,
          use: [
            isproduction ? "style-loader" : MiniCssExtractPlugin.loader, //对mode进行判断使用不同的css加载器
            "css-loader", //webpack中loader生效是以下往上的  css负责处理css文件 style-loader负责展示样式
          ],
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
      }),
      new MiniCssExtractPlugin({
        filename: "css/[name].css",
        chunkFilename: "css/[name].css",
      }),
    ],
  };
};

//共同配置导出一个函数，在函数可以拿到package文件配置中 --env的参数
module.exports = function (env) {
  console.log(env);
  const { production } = env;
  let mergeConfig = production ? prodConfig : devConfig; //区分当前的环境进行不同配置合并
  return merge(commonConfig(production), mergeConfig); //使用webpack-merge对公共配置和不同的开发环境配置进行合并
};

```

- 4.进行代码抽离，根据不同的环境，配置不同的配置

dev.config.js文件

```js
module.exports = {
  mode: "development",

  devServer: {
    static: ["public", "content"], //默认是public 指定静态资源文件
    // host: "0.0.0.0",   // 设置主机地址
    port: 8000, //端口号
    open: true, //是否打开浏览器
    compress: true, //是否对文件进行压缩
    proxy: {
      "/api": {
        target: "http://localhost:9000",
        pathRewrite: {
          "^/api": "",
        },
        changeOrigin: true,
      },
    },
    historyApiFallback: true,
  },
};
```

prod.config.js文件

```js
const path = require("path");

module.exports = {
  mode: "production",
  //排除某些包不需要进行打包
  entry: {
    index: {
      import: "./src/index.js",
      // dependOn: "shared",
    },
    main: {
      //对象写法
      import: "./src/main.js", //指定路径
      // dependOn: "shared", //共享依赖
    },
    // shared: ["axios"], //指定共享第三方库
  },
  // devtool: "source-map",
  output: {
    path: path.resolve("./build"),
    filename: "js/[name]-bundle.js", //[name]是占位作用 多入口文件的名字
    //单独针对分包的文件进行命名
    chunkFilename: "js/[name]_chunk.js",
    clean: true,
    // publicPath: "http://liweiyeCdn/",
  },
  optimization: {
    chunkIds: "deterministic",
    runtimeChunk: {
      name: "runtime",
    },
    splitChunks: {
      chunks: "all",
      //拆分包的最小体积
      //如果一个包拆分出来达不到minSize,·那么这个包就不会拆分（会被合并到其他包中）
      minSize: 2000,
      //将大于maxSize的包，拆分成不小于minSize的包()
      maxSize: 10000,
      //对于拆分包进行分组
      cacheGroups: {
        //key 名称 test匹配规则 filename生成文件名
        venders: {
          test: /node_module/,
          filename: "js/[id]_vendors.js",
        },
        router: {
          test: /router/,
          filename: "js/[id]_router.js",
        },
      },
    },
  },
};
```

### Scope Hoisting

- **什么是Scope Hoisting呢？**
  -  Scope Hoisting从webpack3开始增加的一个新功能；
  - 功能是对作用域进行提升，并且让webpack打包后的代码更小、运行更快；
- **默认情况下webpack打包会有很多的函数作用域，包括一些（比如最外层的）IIFE：**
  - 无论是从最开始的代码运行，还是加载一个模块，都需要执行一系列的函数；
  - Scope Hoisting可以将函数合并到一个模块中来运行；
- **使用Scope Hoisting非常的简单，webpack已经内置了对应的模块：**
  - 在production模式下，默认这个模块就会启用；
  - 在development模式下，我们需要自己来打开该模块；

```js
 plugins: [
    //作用域提升
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
```

### 什么是HTTP压缩？

- **HTTP压缩是一种内置在 服务器 和 客户端 之间的，以改进传输速度和带宽利用率的方式；**
- **HTTP压缩的流程什么呢？**
  - 第一步：HTTP数据在服务器发送前就已经被压缩了；（可以在webpack中完成）
  -  第二步：兼容的浏览器在向服务器发送请求时，会告知服务器自己支持哪些压缩格式；
  - 第三步：服务器在浏览器支持的压缩格式下，直接返回对应的压缩后的文件，并且在响应头中告知浏览器；

- **目前的压缩格式非常的多：**
  - compress – UNIX的“compress”程序的方法（历史性原因，不推荐大多数应用使用，应该使用gzip或deflate）；
  - deflate – 基于deflate算法（定义于RFC 1951）的压缩，使用zlib数据格式封装；
  - gzip – GNU zip格式（定义于RFC 1952），是目前使用比较广泛的压缩算法；
  - br – 一种新的开源压缩算法，专为HTTP内容的编码而设计；

#### Webpack对文件压缩

-  **webpack中相当于是实现了HTTP压缩的第一步操作，我们可以使用CompressionPlugin。**
- **第一步，安装CompressionPlugin：**

```js
npm install compression-webpack-plugin -D
```

- **第二步，使用CompressionPlugin即可：**

```js
 plugins: [
    //作用域提升
    new webpack.optimize.ModuleConcatenationPlugin(),
     //文件压缩
    new CompressionPlugin({
      test: /\.(css|js)$/, //匹配哪些文件需要压缩
      algorithm: "gzip", //采用的压缩算法
      minRatio: 0.7, //至少的压缩比例
      threshold: 500, //设置文件从多大开始压缩
      // include,
      // exclude,
    }),
  ],
```

#### HTML文件中代码的压缩

- 我们之前使用了**HtmlWebpackPlugin**插件来生成HTML的模板，事实上它还有一些其他的配置：
- **inject：设置打包的资源插入的位置**
  - true、 false 、body、head
- **cache：设置为true，只有当文件改变时，才会生成新的文件（默认值也是true）**
- **minify：默认会使用一个插件html-minifier-terser**

```js
   new HtmlWebpackPlugin({
        template: "./index.html",
        minify: isproduction
          ? {
              removeComments: true, //去除注释
              collapseWhitespace: false, //折叠空格
              removeRedundantAttributes: false, //移除多余的属性type=text
              useShortDoctype: true, //比如我们的模板是html4,那么会转htm5的文档
              removeEmptyAttributes: true, //移除空的属性id""
              removeStyleLinkTypeAttributes: true, //比如nink中的type="text/css"
              keepClosingSlash: true, //是否保持单元素的尾部
              minifycsS: false, //是否压缩css
              minifyJs: {
                mangle: {
                  toplevel: true,
                },
              },
            }
          : false,
      }),
```

### 打包分析

#### 分析一：打包的时间分析

- **如果我们希望看到每一个loader、每一个Plugin消耗的打包时间，可以借助于一个插件：speed-measure-webpack-plugin**
  - 注意：该插件在最新的webpack版本中存在一些兼容性的问题（和部分Plugin不兼容）
  - 截止2021-3-10日，但是目前该插件还在维护，所以可以等待后续是否更新；
  - 我这里暂时的做法是把不兼容的插件先删除掉，也就是不兼容的插件不显示它的打包时间就可以了；
- **第一步，安装speed-measure-webpack-plugin插件**

```js
npm install speed-measure-webpack-plugin -D
```

- **第二步，使用speed-measure-webpack-plugin插件**
  - 创建插件导出的对象 SpeedMeasurePlugin；
  - 使用 smp.wrap 包裹我们导出的webpack配置

```js
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin")
const smp = new SpeedMeasurePlugin();

const webpackConfig = smp.wrap({
plugins:[new MyPlugin(),new MyotherPlugin()],
})
```

#### 分析二：打包后文件分析

- **方案一：生成一个stats.json的文件**

```js
"buiebpack Id:stats": "w --config ./config/webpack.common.js --env production --profile --json=stats.json",
```

- **通过执行npm run build:status可以获取到一个stats.json的文件：**
  - 这个文件我们自己分析不容易看到其中的信息；
  - 可以放到 http://webpack.github.com/analyse，进行分析

- **方案二：使用webpack-bundle-analyzer工具**
  - 另一个非常直观查看包大小的工具是webpack-bundle-analyzer。
- **第一步，我们可以直接安装这个工具：**

```js
npm install webpack-bundle-analyzer -D
```

- **第二步，我们可以在webpack配置中使用该插件：**

```js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
module.exports = {
 plugins:[
    new BundleAnalyzerPlugin()   
]   
}
```

- **在打包webpack的时候，这个工具是帮助我们打开一个8888端口上的服务，我们可以直接的看到每个包的大小。**
  - 比如有一个包时通过一个Vue组件打包的，但是非常的大，那么我们可以考虑是否可以拆分出多个组件，并且对其进行懒加载；
  - 比如一个图片或者字体文件特别大，是否可以对其进行压缩或者其他的优化处理

## webpack自定义Loader

- **Loader是用于对模块的源代码进行转换（处理），之前我们已经使用过很多Loader，比如css-loader、style-loader、babelloader等。**

- **这里我们来学习如何自定义自己的Loader：**

  -  Loader本质上是一个**导出为函数的JavaScript模块；**
  -  **loader runner库**会调用这个函数，然后将上一个loader产生的结果或者资源文件传入进去；

- **编写一个wy-loader01.js模块这个函数会接收三个参数：**

  - content：资源文件的内容；

  -  map：sourcemap相关的数据；

  - meta：一些元数据；

    01_wy_loader01,js文件

```js
module.exports = function (content, map, meta) {
  console.log("wy_loader01:", content, map, meta);
  return content;
};
```

- 在加载某个模块时，引入loader

webpack.config.js文件

```js
const path = require("path");
module.exports = {
  mode: "development",
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "bundle.js",
  },
  resolveLoader: {
    modules: ["node_module", "./wy_loader"], //配置解析loder的地址文件，默认会从node_modules解析
  },
  module: {
    rules: [
      {
        test: /\.js$/, //指向顺序:从后向前、从右向左的
        // use: "./wy_loader/01_wy_loader01.js", //完整路径写法
        use: ["01_wy_loader01.js", "02_wy_loader02.js", "03_wy_loader03.js"], //因为上面配置了读取loader地址，所有这里只写文件名就可以
      },
    ],
  },
};
```

> 在webpack配置中的路径当你使用 ./相对路径时，默认是相对于启动文件

#### pitch-loader和enforce

- 事实上还有另一种Loader，称之为PitchLoader：

```js
module.exports = function (content, map, meta) {
  console.log("wy_loader01:", content, map, meta);
  return content;
};

module.exports.pitch = function () {
  console.log("loader01 pitch");
};
```

> pitchLoader会优先普通的loader执行

控制台输出结果

```js
loader01 pitch
loader02 pitch
loader03 pitch
wy_loader03: const message = "Hello World";

console.log(message);

wy_loader02: const message = "Hello World";

console.log(message);

wy_loader01: const message = "Hello World";

console.log(message);
```

##### 执行顺序和enforce

- **其实这也是为什么loader的执行顺序是相反的：**
  - run-loader先优先执行PitchLoader，在执行PitchLoader时进行loaderIndex++；
  - run-loader之后会执行NormalLoader，在执行NormalLoader时进行loaderIndex--；
- **那么，能不能改变它们的执行顺序呢？**
  - 我们可以拆分成多个Rule对象，通过enforce来改变它们的顺序
-  **enforce一共有四种方式：**
  - 默认所有的loader都是normal；
  - 在行内设置的loader是inline（import 'loader1!loader2!./test.js'）；
  - 也可以通过enforce设置 pre 和 post；
- **在Pitching和Normal它们的执行顺序分别是：**
  - post, inline, normal, pre；
  -  pre, normal, inline, post；

```js
  rules: [
      {
        test: /\.js$/,
        use: "01_wy_loader01",
      },
      {
        test: /\.js$/,
        use: "02_wy_loader02",
        enforce: "post",  //最后执行
      },
      {
        test: /\.js$/,
        use: "03_wy_loader03",
        enforce: "pre",  //优先执行
      },
    ],
```

> pitchLoader的执行顺序和normalLoader的执行顺序是相反的
>
> pitch:1,2,3
>
> normal:3,2,1

### 同步的Loader

- **什么是同步的Loader呢？**
  - 默认创建的Loader就是同步的Loader；
  - 这个Loader必须通过 return 或者 this.callback 来返回结果，交给下一个loader来处理；
  - 通常在有错误的情况下，我们会使用 this.callback；
- **this.callback的用法如下：**
  - 第一个参数必须是 Error 或者 null；
  - 第二个参数是一个 string或者Buffer；

```js
module.exports = function (content, map, meta) {
  console.log("wy_loader01:", content, map, meta);
  const callback = this.callback;

  //第一个参数是是处理错误信息,第二个参数是返回结果
  callback(null, content + "aaa");
};
```

### 异步的Loader

- **什么是异步的Loader呢？**
  - 有时候我们使用Loader时会进行一些异步的操作；
  - 我们希望在异步操作完成后，再返回这个loader处理的结果；
  - 这个时候我们就要使用异步的Loader了；
- **loader-runner已经在执行loader时给我们提供了方法，让loader变成一个异步的loader：**

```js
module.exports = function (content, map, meta) {
  console.log("wy_loader01:", content, map, meta);
  const callback = this.async();

  //第一个参数是是处理错误信息,第二个参数是返回结果

  //使用async函数，就会把当前loader变成异步的，下一个执行的loader会等待这个loader有结果之后执行
  //如果是一个同步的loader会报错
  setTimeout(() => {
    callback(null, content + "aaa");
  }, 2000);
};
```

### 传入和获取参数

- 在使用loader时，传入参数。

  - 方式一：早期时，需要单独使用Loader-utils(webpack开发)的库来获取参数

    ```js
    npm install loader-utils -D
    ```

  - 方式二：目前，已经可以直接通过this.getOptions()直接获取到参数

```js

      {
        test: /\.js$/,
        use: [
          {
            loader: "wy_loader04",
              //传入的参数为options
            options: {
              name: "lwy",
              age: 18,
            },
          },
        ],
      },
```

获取:

```js
module.exports = function (content) {
  console.log("wy_loader04:", content);
  //通过getOptions直接获取参数
  const options = this.getOptions();
  console.log(options); // name: 'lwy', age: 18 }
  return content;
};

```

### 校验参数

- **我们可以通过一个webpack官方提供的校验库 schema-utils，安装对应的库：**

```js
npm install schema-utils -D
```

规则文件

```js
{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "请输入你的名称"
    },
    "age": {
      "type": "number",
      "description": "请输入你的年龄"
    }
  },
  "additionalProperties": true
}
```

loader文件

```js
const { validate } = require("schema-utils");
const schema01 = require("../loaderSchema/schama01.json");

module.exports = function (content) {
  const options = this.getOptions();
  console.log(options);
  //第一个参数是校验的规则，第二个参数是校验的信息
  validate(schema01, options);

  return content;
};
```

### 总结

> 1.在webpack中自定义loader需要把loader导出为一个函数，这个函数的第一个参数可以获取资源文件的内容
>
> 2.在webpack配置文件中，对loader进行使用，可以使用enforce："pre"|"post"调整loader执行顺序(默认是从后向前、从右向左的)
>
> 3.使用this.callback(error,content)进行同步loaedr的使用(webpack提供)
>
> 4.使用this.async(error,content)进行异步Loader的使用(webpack的使用)
>
> 5.配置文件中使用options传入loader的参数，loader中使用getoptons()函数进行参数的接收(webpack提供)
>
> 6.使用schema-utiles可以进行参数的校验
>
> 在webpack中就是拿到文件的内容在使用babel等插件(options)对内容进行转换

## webpack自定义plugins

### Webpack和Tapable

- **我们知道webpack有两个非常重要的类：Compiler和Compilation**
  - 他们通过注入插件的方式，来监听webpack的所有生命周期；
  - 插件的注入离不开各种各样的Hook，而他们的Hook是如何得到的呢？
  - 其实是创建了Tapable库中的各种Hook的实例；
- **所以，如果我们想要学习自定义插件，最好先了解一个库：Tapable**
  - **Tapable**是官方编写和维护的一个库；
  - **Tapable**是管理着需要的Hook，这些Hook可以被应用到我们的插件中；

![topable中的hooks](../../00_image/09_前端工程化高级/tabable中的hook.png)

> - 负责整体编译流程的 Compiler 对象。
> - 负责编译 Module 的 Compilation 对象

### Tapable的Hook分类

- **同步和异步的：**

  - 以**sync**开头的，是同步的Hook；
  - 以**async**开头的，两个事件处理回调，不会等待上一次处理回调结束后再执行下一次回调；

- **其他的类别**

  - **bail**：当有返回值时，就不会执行后续的事件触发了；

  - **Loop**：当返回值为true，就会反复执行该事件，当返回值为undefined或者不返回内容，就退出事件；

  - **Waterfall**：当返回值不为undefined时，会将这次返回的结果作为下次事件的第一个参数；

  - **Parallel**：并行，会同时执行次事件处理回调结束，才执行下一次事件处理回调；

  -  **Series**：串行，会等待上一是异步的Hook，只要上一个异步任务执行完下回执行下一个(要使用callback控制)；

    ```js
       this.hooks.syncHook.tapAsync("event3", (name, age, callback) => {
          console.log("event3", name, age);
          setTimeout(() => {
            console.log("event3", name, age);
            callback();
          }, 3000);
        });
    ```

    

### Hook的使用过程

安装

```js
$ pnpm add tapable -D
```

同步hook基本使用

```js
const { SyncHook } = require("tapable");
const { SyncBailHook } = require("tapable");

class WYComplier {
  constructor() {
    //第一步：创建Hook对象
    this.hooks = {    
      syncHook: new SyncHook(["name", "age"]),
  //  syncBailHook: new SyncBailHook(["name", "age"]),
    };
    //第二步：注册Hook中的事件(自定义plugin)
    this.hooks.syncHook.tap("event1", (name, age) => {
      console.log("event1", name, age);
    });
    this.hooks.syncHook.tap("event2", (name, age) => {
      console.log("event2", name, age);
    });
     //这里还可以写成异步的
    this.hooks.syncHook.topAsync("event3", (name, age) => {
      console.log("event3", name, age);
    });
  }
}
//第三步：触发事件 ,事件触发时在syncHook中会监听事件并且执行
//调用call时，事件就会被触发，被上面事件监听到，上面的事件名称只是做一个标识而已
const myComplier = new WYComplier();
myComplier.hooks.syncHook.call("小明", 20);

//如果上面执行异步操作 这里也需要异步
//myComplier.hooks.syncHook.callAsync("小明", 20);

```

>  如果要使用其他hook导入不同的hook，并且更改hook即可

### 自定义Plugin

- **在之前的学习中，我们已经使用了非常多的Plugin：**
  - CleanWebpackPlugin
  - HTMLWebpackPlugin
  -  MiniCSSExtractPlugin
  - CompressionPlugin
  - 等等。。。
- **这些Plugin是如何被注册到webpack的生命周期中的呢？**
  - 第一：在webpack函数的createCompiler方法中，注册了所有的插件；
  - 第二：在注册插件时，会调用插件函数或者插件对象的apply方法；
  -  第三：插件方法会接收compiler对象，我们可以通过compiler对象来注册Hook的事件；
  - 第四：某些插件也会传入一个compilation的对象，我们也可以监听compilation的Hook事件；

![webpack源码和自定义Plugin流程](../../00_image/09_前端工程化高级/webpack源码和自定义Plugin流程.png)

### 开发自己的插件

- 如何开发自己的插件呢？
  - 目前大部分插件都可以在社区中找到，但是推荐尽量使用在维护，并且经过社区验证的；
  - 这里我们开发一个自己的插件：**将静态文件自动上传服务器中；**
- **自定义插件的过程：**
  - 创建AutoUploadWebpackPlugin类；
  -  编写apply方法：
    - 通过ssh连接服务器；
    - 删除服务器原来的文件夹；
    - 上传文件夹中的内容；
  - 在webpack的plugins中，使用AutoUploadWebpackPlugin类；

1.注册插件

```js
class AutoUpdataPlugin {
  apply(compiler) {
    console.log("AutoUpdataPlugin被注册", compiler);
      
      //可以在写你插件的内容
  }
}

//默认导出
module.exports = AutoUpdataPlugin;
//分别导出
module.exports.AutoUpdataPlugin = AutoUpdataPlugin;

```

2.配置使用

```js

  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
      //webpack在读取这个插件时会判断是函数还是类，如果是函数直接调用，要是类的话会调用里面的apply方法并且把compiler传入
    new AutoUpdataPlugin(),
  ],
```

# 自动化工具 gulp

- **什么是Gulp？**
  - A toolkit to automate & enhance your workflow；
  - 一个工具包，可以帮你自动化和增加你的工作流；

- https://gulpjs.com/

## Gulp和Webpack

- gulp的核心理念是**task runner**
  - 可以定义自己的**一系列任务**，等待任务被执行；
  -  基于**文件Stream**的构建流；
  - 我们可以**使用gulp的插件体系**来完成某些任务；
- webpack的核心理念是**module bundler**
  - webpack是一个**模块化的打包工具；**
  - 可以使用各种各样的**loader来加载不同的模块；**
  - 可以使用各种各样的插件在**webpack打包的生命周期**完成其他的任务；
- **gulp相对于webpack的优缺点：**
  - gulp相对于webpack思想更加的**简单、易用**，更适合编写**一些自动化的任务；**
  - 但是目前对于大型项目（Vue、React、Angular）并不会使用gulp来构建，比如默认gulp是不支持模块化的；

## Gulp的基本使用

- 首先，我们需要安装gulp：

```js
# 全局安装
npm install gulp -g
# 局部安装
npm install gulp
```

- **其次，编写gulpfile.js文件，在其中创建一个任务：**

```js
const gulp = require("gulp");

const foo = (cb) => {
  console.log("foo任务被执行了~");
  //把任务关闭
  cb();
};

//导出任务foo gulp帮我们执行
module.exports = {
  foo,
};
```

- **最后，执行gulp命令：**

```js
npx gulp foo
```

- 每个gulp任务都是一个异步的JavaScript函数：
  - 此函数可以接受一个callback作为参数，调用callback函数那么任务会结束；
  - 或者是一个返回stream、promise、event emitter、child process或observable类型的函数；
- **任务可以是public或者private类型的：**
  - 公开任务（Public tasks） 从 gulpfile 中被导出（export），可以通过 gulp 命令直接调用；
  - 私有任务（Private tasks） 被设计为在内部使用，通常作为 series() 或 parallel() 组合的组成部分；
- 补充：gulp4之前, 注册任务时通过gulp.task的方式进行注册的

```js
gulp.task("bar", (cb) => {
  console.log("bar任务被执行");
  cb();
});
```

默认任务

```js
//默认任务
module.exports.default = (cb) => {
  console.log("default task exec");
  cb();
};
```

- **执行 gulp 命令：**

```js
npx gulp
```

## 任务组合series和parallel

- **通常一个函数中能完成的任务是有限的（放到一个函数中也不方便代码的维护），所以我们会将任务进行组合。**
- **gulp提供了两个强大的组合方法：**
  - **series()**：串行任务组合；
  - **parallel()**：并行任务组合；

```js
const { series } = require("gulp");
const { parallel } = require("gulp");

const foo1 = (cb) => {
  setTimeout(() => {
    console.log("foo1 exec~");
  }, 2000);
  cb();
};
const foo2 = (cb) => {
  setTimeout(() => {
    console.log("foo2 exec~");
  }, 1000);
  cb();
};
const foo3 = (cb) => {
  setTimeout(() => {
    console.log("foo3 exec~");
  }, 3000);
  cb();
};
const seriesFoo = series(foo1, foo2, foo3); //foo2,foo1,foo3
const parallelFoo = series(foo1, foo2, foo3); //foo2,foo1,foo3
module.exports = {
  seriesFoo,
  parallelFoo,
};

```

## 读取和写入文件

- **gulp 暴露了 src() 和 dest() 方法用于处理计算机上存放的文件。**
  - src() 接受参数，并从文件系统中读取文件然后生成一个**Node流（Stream）**，它将所有匹配的文件读取到**内存**中并**通过流**
    **（Stream）进行处理；**
  - 由 src() 产生的流（stream）应当从任务（task函数）中**返回**并发出异步**完成的信号**；
  - dest() 接受一个**输出目录作为参数**，并且它还会产生一个 Node流(stream)，通过该流**将内容输出到文件**中；

```js
const { src, dest } = require("gulp");

const copyFile = () => {
  //把目标文件copy到目标地址    pipe是node中的api
  return src("./src/main.js").pipe(dest("./build"));
};

module.exports = {
  copyFile,
};
```

- **流（stream）所提供的主要的 API 是 .pipe() 方法，pipe方法的原理是什么呢？**
  - pipe方法接受一个 **转换流（Transform streams）**或**可写流（Writable streams）；**
  - 那么转换流或者可写流，拿到数据之后可以**对数据进行处理**，再次传递给下一个**转换流或者可写流；**

## 对文件进行转换

- **如果在这个过程中，我们希望对文件进行某些处理，可以使用社区给我们提供的插件。**
  - 比如我们希望ES6转换成ES5，那么可以使用babel插件；
  - 如果我们希望对代码进行压缩和丑化，那么可以使用uglify或者terser插件

```js
const task function(){
   
    return src("./src/js/*.js")
.pipe(babel({presets:["@babel/preset-env"]]))
//.pipe(uglify())
.pipe(terser({mangle:{toplevel:true}}))
.pipe(dest('output/'))
    
}
```

> 上官网搜对应的插件使用

## glob文件匹配

- **src() 方法接受一个 glob 字符串或由多个 glob 字符串组成的数组作为参数，用于确定哪些文件需要被操作。**
  - glob 或 glob 数组必须至少匹配到一个匹配项，否则 src() 将报错；
- **glob的匹配规则如下：**
  - (一个星号*)：在一个字符串中，匹配任意数量的字符，包括零个匹配；

```js
"*.js"
```

-  (两个星号**)：在多个字符串匹配中匹配任意数量的字符串，通常用在匹配目录下的文件；

```js
"script/**/*.js"
```

- (取反!)：
  - 由于 glob 匹配时是按照每个 glob 在数组中的位置依次进行匹配操作的；
  - 所以 glob 数组中的取反（negative）glob 必须跟在一个非取反（non-negative）的 glob 后面；
  - 第一个 glob 匹配到一组匹配项，然后后面的取反 glob 删除这些匹配项中的一部分

```js
["script/**/*.js", "!script/vendor/"]   //表示不匹配后面的文件
```

## Gulp的文件监听

- **gulp api 中的 watch() 方法利用文件系统的监控程序（file system watcher）将 与进行关联。**

```js
const { src, dest, watch } = require("gulp");

const copyFile = () => {
  //把目标文件copy到目标地址
  return src("./src/main.js").pipe(dest("./build"));
};

//监听指定文件的变化，并且当文件发生变化时，重新执行copyFile函数
watch("./src/**/*.js", copyFile);
module.exports = {
  copyFile,
};
```

## Gulp案例

- **接下来，我们编写一个案例，通过gulp来开启本地服务和打包：**
  - 打包html文件；
    - 使用gulp-htmlmin插件；
  - 打包JavaScript文件；
    - 使用gulp-babel，gulp-terser插件；
  - 打包less文件；
    - 使用gulp-less插件；
  - html资源注入
    - 使用gulp-inject插件；
  -  开启本地服务器
    - 使用browser-sync插件；
  - 创建打包任务
  - 创建开发任务

```js
const { src, dest, watch, parallel, series } = require("gulp");
const htmlmin = require("gulp-htmlmin");
const babel = require("gulp-babel");
const terser = require("gulp-terser");
const less = require("gulp-less");
const inject = require("gulp-inject");

const browser = require("browser-sync");

//1.对html进行打包,使用 gulp-htmlmin
const htmlTask = () => {
  return src("./src/**/*.html")
    .pipe(htmlmin({ collapseWhitespace: true })) //去除空格
    .pipe(dest("./build"));
};

//2.对js进行打包,使用 pnpm add @babel/core gulp-babel @babel/preset-env -D对js代码进行转换
const jsTask = () => {
  return src("./src/**/*.js")
    .pipe(babel({ presets: ["@babel/preset-env"] })) //babel代码转换
    .pipe(terser({ mangle: { toplevel: true } })) //terser丑化代码
    .pipe(dest("./build"));
};

//3.处理less文件
const lessTask = () => {
  return src("./src/**/*.less").pipe(less()).pipe(dest("./build"));
};

//4.把css,js文件注入html文件中
const injectTask = () => {
  return src("./build/*.html")
    .pipe(
      inject(src(["./build/**/*.js", "./build/**/*.css"]), {
        relative: true, //显示的路径为相对路径
      })
    )
    .pipe(dest("./build"));
};

//开启本地服务器 browser-sync
const bs = browser.create();
const serve = () => {
  //在打开浏览器时才做监听文件变化操作
  watch("./src/**", buildTask);
  bs.init({
    port: 8080,
    open: true,
    files: "./build/*",
    server: {
      baseDir: "./build",
    },
  });
};


//这样写injectTask任务不生效
// const buildTask = series(parallel(htmlTask, jsTask, lessTask), injectTask);
const buildTask = series(parallel(htmlTask, jsTask, lessTask));
const serveTask = series(buildTask, serve);

//但是单独执行injectTask时会生效
//记得在index.html文件中加注释,只有加了这样的注释，inject才会在对应得到位置添加文件
//<!-- inject:css --> <!-- inject:js -->
//<!-- endinject --> <!-- endinject -->

module.exports = {
  buildTask,
  injectTask,
  serveTask,
};

```

> **可以看出gulp就是通过执行一个个任务(函数)利用第三方插件的方式对项目进行了打包**

# 库打包工具rollup使用

- **我们来看一下官方对rollup的定义：**
  - Rollup is a module bundler for JavaScript which compiles small pieces of code into something larger and more complex,
    such as a library or application.
  - Rollup是一个**JavaScript的模块化打包工具**，可以帮助**我们编译小的代码到一个大的、复杂的代码**中，比如**一个库或者一个应用程序；**
- **我们会发现Rollup的定义、定位和webpack非常的相似：**
  - Rollup也是**一个模块化的打包工具**，但是Rollup主要是**针对ES Module进行打包**的；
  - 另外webpack通常**可以通过各种loader处理各种各样的文件，以及处理它们的依赖关系；**
  - rollup更多时候是**专注于处理JavaScript代码**的（当然也可以处理css、font、vue等文件）；
  - 另外rollup的配置和理念**相对于webpack来说，更加的简洁和容易理解；**
  - 在早期webpack不支持tree shaking时，rollup具备更强的优势；
- **目前webpack和rollup分别应用在什么场景呢？**
  - 通常**在实际项目开发过程**中，我们都会使用webpack（比如react、angular项目都是基于webpack 的）；
  - 在**对库文件进行打包**时，我们通常会使用rollup（比如vue、react、dayjs源码本身都是基于rollup的，Vite底层使用Rollup）；

## Rollup基本使用

- **我们可以先安装rollup：**

```js
# 全局安装
npm install rollup -g
# 局部安装
npm install rollup -D
```

- **创建main.js文件，打包到bundle.js文件中：**

```js
# 打包浏览器的库
npx rollup ./src/main.js -f iife -o dist/bundle.js
# 打包AMD的库
npx rollup ./src/main.js -f amd -o dist/bundle.js
# 打包CommonJS的库
npx rollup ./src/main.js -f cjs -o dist/bundle.js
# 打包通用的库（必须跟上name）
npx rollup ./src/main.js -f umd --name mathUtil -o dist/bundle.js
```

> 上面为命令行使用

## Rollup的配置文件

- **我们可以将配置信息写到配置文件中rollup.config.js文件：**

```js
module.exports = {
  input: "./src/main.js",
  //写成数组我们可以对文件进行分别打包，打包出更多的库文件（用户可以根据不同的需求来引入）：
  output: [
    {
      format: "umd",
      name: "lwyUtils",
      file: "./build/bundle.umd.js",
    },
    {
      format: "amd",
      file: "./build/bundle.amd.js",
    },
    {
      format: "umd",
      file: "./build/bundle.cjs.js",
    },
    {
      format: "iife",
      file: "./build/bundle.iife.js",
    },
  ],
};

```

> 使用npx rollup -c 执行

## 解决commonjs和第三方库问题

比如在项目中使用loash第三方库时会报错

```shell
(!) Missing global variable names
https://rollupjs.org/configuration-options/#output-globals
Use "output.globals" to specify browser global variable names corresponding to external modules:
lodash (guessing "_")
lodash (guessing "_")
lodash (guessing "_")
(!) Unresolved dependencies
https://rollupjs.org/troubleshooting/#warning-treating-module-as-external-dependency
lodash (imported by "src/main.js")
```

- **安装解决commonjs的库：**

```js
npm install @rollup/plugin-commonjs -D
```

- **安装解决node_modules的库：**

```js
npm install @rollup/plugin-node-resolve -D
```

- 打包和排除lodash

  ```js
  const commonjs = require("@rollup/plugin-commonjs");
  const nodeResolve = require("@rollup/plugin-node-resolve");
  
  output: {
        format: "iife",
        file: "./build/bundle.iife.js",
        globals: {  //添加全局变量
          lodash: "_",
      },
    external: ["lodash"],  //标记模块lodash
    
    plugins: [commonjs(), nodeResolve()], //使用插件 函数调用方式
  
  ```

## Babel转换代码

- **如果我们希望将ES6转成ES5的代码，可以在rollup中使用babel。**
- **安装rollup对应的babel插件：**

```js
npm install @rollup/plugin-babel -D
```

- **修改配置文件：**
  - 需要配置babel.config.js文件；
  - babelHelpers

```js
  plugins: [
    commonjs(),
    nodeResolve(),
    babel({
      exclude: "node_modules/**", //排除
      babelHelpers: "bundled", //polyfill,如果添加会使用默认值
    }),
  ],
```

babel配置文件

```js
module.exports = {
  presets: ["@babel/preset-env"],
};
```

## Teser代码压缩

- **如果我们希望对代码进行压缩，可以使用@rollup/plugin-terser：**

```js
npm install @rollup/plugin-terser -D
```

- 配置terser：

```js
const terser = require("@rollup/plugin-terser");
  
plugins: [
    commonjs(),
    nodeResolve(),
    babel({
      exclude: "node_modules/**", //排除
      babelHelpers: "bundled", //polyfill,如果添加会使用默认值
    }),
    terser(),
  ],
```

## 处理css文件

- **如果我们项目中需要处理css文件，可以使用postcss：**

```js
npm install rollup-plugin-postcss postcss -D
```

- 配置postcss的插件：

```js

  plugins: [
    commonjs(),
    nodeResolve(),
    babel({
      exclude: "node_modules/**", //排除
      babelHelpers: "bundled", //polyfill,如果添加会使用默认值
    }),
    terser(),
    postcss(),
  ],
```

## 处理vue文件

- **处理vue文件我们需要使用rollup-plugin-vue插件：**
  - **但是注意：默认情况下我们安装的是vue2.x的版本，所以我这里指定了一下rollup-plugin-vue的版本；**

```js
npm install rollup-plugin-vue @vue/compiler-sfc -D
```

- 使用vue的插件：

  ```js
    plugins: [
      commonjs(),
      nodeResolve(),
      babel({
        exclude: "node_modules/**", //排除
        babelHelpers: "bundled", //polyfill,如果添加会使用默认值
      }),
      terser(),
      postcss(),
      vue(),
    ],
  ```

### 打包vue报错

- 在我们打包vue项目后，运行会报如下的错误：

```js
process is not define
```

- **这是因为在我们打包的vue代码中，用到 process.env.NODE_ENV，所以我们可以使用一个插件 rollup-plugin-replace 设置**
  **它对应的值：**

```js
npm install @rollup/plugin-replace -D
```

```js

  plugins: [
    commonjs(),
    nodeResolve(),
    babel({
      exclude: "node_modules/**", //排除
      babelHelpers: "bundled", //polyfill,如果添加会使用默认值
    }),
    terser(),
    postcss(),
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    vue(),
  ],
```

## 搭建本地服务器

- **第一步：使用rollup-plugin-serve搭建服务**

```js
npm install rollup-plugin-serve -D
```

```js
serve({
//open:true,
port:8888,
contentBase:"."
}),
```

- **第二步：当文件发生变化时，自动刷新浏览器**

```js
npm install rollup-plugin-livereload -D
```

```js
livereload()
```

- **第三步：启动时，开启文件监听**

```js
npx rullup -c -w
```

## 区分开发环境

- **我们可以在package.json中创建一个开发和构建的脚本：**

```js
  "scripts": {
    "serve": "rollup-c --environment NODE_ENV:development -w",
    "build": "rollup-c:--environment NODE_ENV:production"
  },
```

> 可以根据这个配置判断当前处于什么环境，进行不同插件的配置使用

```js
const pluginsCongig = [
  commonjs(),
  nodeResolve(),
  babel({
    exclude: "node_modules/**", //排除
    babelHelpers: "bundled", //polyfill,如果添加会使用默认值
  }),
  terser(),
  postcss(),
  replace({
    "process.env.NODE_ENV": JSON.stringify("production"),
  }),
  vue(),
];

if (!isproduction) {
  pluginsCongig.push(
    serve({
      //open:true,
      p0rt: 8888,
      contentBase: ".",
    })
  );
}
module.exports = {
  input: "./src/main.js",
  //写成数组我们可以对文件进行分别打包，打包出更多的库文件（用户可以根据不同的需求来引入）：
  output: [
      format: "umd",
      name: "lwyUtils",
      file: "./build/bundle.umd.js",
      globals: {
        lodash: "_",
  ],
  external: ["lodash"],

  plugins: pluginsCongig,
};
```

# 快速开发工具 vite

## 认识vite

- **什么是vite呢？**
  - 官方的定位：下一代前端开发与构建工具；
- **如何定义下一代开发和构建工具呢？**
  - 我们知道在实际开发中，我们编写的代码往往是不能被浏览器直接识别的，比如ES6、TypeScript、Vue文件等等；
  -  所以我们必须通过构建工具来对代码进行转换、编译，类似的工具有webpack、rollup、parcel；
  - 但是随着项目越来越大，需要处理的JavaScript呈指数级增长，模块越来越多；
  - 构建工具需要很长的时间才能开启服务器，HMR也需要几秒钟才能在浏览器反应出来；
  - 所以也有这样的说法：天下苦webpack久矣；
-  **Vite (法语意为 "快速的"，发音 /vit/) 是一种新型前端构建工具，能够显著提升前端开发体验。**

## Vite的构造

- **它主要由两部分组成：**
  - **一个开发服务器**，它基于原生ES模块提供了丰富的内建功能，HMR的速度非常快速；
  - **一套构建指令**，它使用rollup打开我们的代码，并且它是预配置的，可以输出生成环境的优化过的静态资源；
- **在浏览器支持 ES 模块之前，JavaScript 并没有提供原生机制让开发者以模块化的方式进行开发。**
  - 这也正是我们对 “打包” 这个概念熟悉的原因：使用工具抓取、处理并将我们的源码模块串联成可以在浏览器中运行的文件。
  - 时过境迁，我们见证了诸如 webpack、Rollup 和 Parcel 等工具的变迁，它们极大地改善了前端开发者的开发体验。
  -  然而，当我们开始构建越来越大型的应用时，需要处理的 JavaScript 代码量也呈指数级增长。包含数千个模块的大型项目相
    当普遍。
  - 基于 JavaScript 开发的工具就会开始遇到性能瓶颈：通常需要很长时间（甚至是几分钟！）才能启动开发服务器，即使使用
    模块热替换（HMR），文件修改后的效果也需要几秒钟才能在浏览器中反映出来。
- **Vite 旨在利用生态系统中的新进展解决上述问题：**
  - 浏览器开始原生支持 ES 模块，且越来越多 JavaScript 工具使用编译型语言编写。
  - the rise of JavaScript tools written in compile-to-native languages

![vite的底层组成构造](../../00_image/09_前端工程化高级/vite的底层组成构造.png)

> vite在编译代码时只是简单的代码进行转化合并等操作，所有它的加载速度会很快，现在大部分浏览器支持es6语法，和esModule模块化所有vite认为在项目开发阶段没有必要做过多的构建操作
>
> vite在项目打包底层使用了roollup进行打包
>
> 而webpack在开发阶段就会对代码进行打包，合并等操作，所有在开发阶段构建速度会慢

## 浏览器原生支持模块化

```js
    <script src="./src/index.js" type="module"></script>
```

- **但是如果我们不借助于其他工具，直接使用ES Module来开发有什么问题呢？**
  - 首先，我们会发现在使用loadash时，加载了上百个模块的js代码，对于浏览器发送请求是巨大的消耗；
  - 其次，我们的代码中如果有TypeScript、less、vue等代码时，浏览器并不能直接识别；
  - 导入模块如果不使用后缀名时，浏览器也不会识别
- **事实上，vite就帮助我们解决了上面的所有问题。**

## Vite的安装

- **首先，我们安装一下vite工具：**

```js
npm install vite –g
npm install vite -d
```

- **通过vite来启动项目：**

```js
npx vite
```

## Vite对css的支持

- **vite可以直接支持css的处理**
  - 直接导入css即可；
- **vite可以直接支持css预处理器，比如less**
  - 直接导入less；
  - 之后安装less编译器；

```js
npm install less -D
```

- **vite直接支持postcss的转换：**
  - 只需要安装postcss，并且配置 postcss.config.js 的配置文件即可；

```js
npm install postcss postcss-preset-env -D
```

```js
module.exports:{
    plugins:[
    require('postcss-preset-env')   
]
}
```

> vite内置了一些配置帮我们解决了上面的问题

## Vite对TypeScript的支持

- **vite对TypeScript是原生支持的，它会直接使用ESBuild来完成编译：**
  - 只需要直接导入即可；
- **如果我们查看浏览器中的请求，会发现请求的依然是ts的代码：**
  - 这是因为vite中的服务器Connect会对我们的请求进行转发；
  - 获取ts编译后的代码，给浏览器返回，浏览器可以直接进行解析；
- **注意：在vite2中，已经不再使用Koa了，而是使用Connect来搭建的服务器**

> 由于大多数逻辑应该通过插件钩子而不是中间件来完成，因此对中间件的需求大大减少。内部服务器应
> 用现在是一个很好的旧版的connect实例，而不是Koa。

## Vite对vue的支持

- **vite对vue提供第一优先级支持：**
  -  Vue 3 单文件组件支持：@vitejs/plugin-vue
  - Vue 3 JSX 支持：@vitejs/plugin-vue-jsx
  - Vue 2 支持：underfin/vite-plugin-vue2
- **安装支持vue的插件：**

```js
npm install @vitejs/plugin-vue -D
```

- **在vite.config.js中配置插件：**

```js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
});
```

## Vite对react的支持

- **.jsx 和 .tsx 文件同样开箱即用，它们也是通过 ESBuild来完成的编译：**
  - 所以我们只需要直接编写react的代码即可；
  - 注意：在index.html加载main.js时，我们需要将main.js的后缀，修改为 main.jsx 作为后缀名；

## Vite打包项目

- **我们可以直接通过vite build来完成对当前项目的打包工具：**

```js
npx vite build
```

- **我们可以通过preview的方式，开启一个本地服务来预览打包后的效果：**

```js
npx vite preview 
```

## Vite脚手架工具

- **在开发中，我们不可能所有的项目都使用vite从零去搭建，比如一个react项目、Vue项目；**
  - 这个时候vite还给我们提供了对应的脚手架工具；
-  **所以Vite实际上是有两个工具的：**
  - **vite**：相当于是一个构件工具，类似于webpack、rollup；
  - **@vitejs/create-app**：类似vue-cli、create-react-app；
- **如果使用脚手架工具呢？**

```js
npm create vite
yarn create vite
pnpm create vite
```

## ESBuild解析

- **ESBuild的特点：**
  - 超快的构建速度，并且不需要缓存；
  - 支持ES6和CommonJS的模块化；
  - 支持ES6的Tree Shaking；
  - 支持Go、JavaScript的API；
  - 支持TypeScript、JSX等语法编译；
  - 支持SourceMap；
  - 支持代码压缩；
  - 支持扩展其他插件；

## ESBuild的构建速度

- **ESBuild的构建速度和其他构建工具速度对比：**

![Esbuild的构建速度与其他工具对比](../../00_image/09_前端工程化高级/Esbuild的构建速度与其他工具对比.png)

- **ESBuild为什么这么快呢？**
  - 使用Go语言编写的，可以直接转换成机器代码，而无需经过字节码；
  - ESBuild可以充分利用CPU的多内核，尽可能让它们饱和运行；
  -  ESBuild的所有内容都是从零开始编写的，而不是使用第三方，所以从一开始就可以考虑各种性能问题；
  - 等等

# 开发自己的CLI工具

## 命令行执行

1.创建一个执行文件

lib/index.js

```js
 #!/usr/bin/env node   
console.log("js执行文件执行了");
console.log("其他的业务逻辑代码");

```

2.在package.json文件中添加上bin命令行配置

```js
"bin": {
    "lwycli": "./bin/index.js"
  },
```

> key:表示在命令行使用的key,value为对应的执行文件

3.这时候在命令行执行时，会发现找不到该命令，这是因为我们并没有配置对应的环境变量，当然找不到了

3.1当npm包在线上时，执行npm install时会自动为我们添加上环境变量

3.2但是在包在本地开发时需要执行`npm link`帮我们配置环境变量，对执行文件创建一个软连接

```js
npm link
```

3.2还需要在执行文件中添加上

```js
 #!/usr/bin/env node   
这里目的是去环境变量中找一下node，并执行node
```

## 解析命令行命令

1.使用commander库解析命令行执行的命令

```js
pnpm add commander
```

2.使用commander

```js
#!/usr/bin/env node
const { program } = require("commander");

//从package.json中拿到版本号
const version = require("../package.json").version;
//处理--version操作 ,读取版本并返回，并且可以设置支持的命令
program.version(version, "-v --version");

//让commander解析process.argv参数,上面的program.version会拿到命令行的命令第一个参数是输出的结果
program.parse(process.argv);
```

> 我们从process.argv中可以拿到当前文件中的一些信息，第三个参数是命令行输入的命令

```shell
$ lwycli -v
[
  'C:\\Program Files\\nodejs\\node.exe',
  'C:\\Users\\27595\\AppData\\Roaming\\npm\\node_modules\\lwycli\\bin\\index.js',
  '-v'
]
```

## 获取额外传递的参数和自定义help

```js
#!/usr/bin/env node
const { program } = require("commander");
//1.处理version操作
//从package.json中拿到版本号
const version = require("../package.json").version;
//处理--version -v操作 ,读取版本并返回，并且可以设置支持的命令
program.version(version, "-v --version");

//2.增强其他的options的操作
//第一个参数是命令，第二个是描述
program.option("-l --lwy", "a lwy's cli");
program.option(
  "-d --dest <dest>",
  "a destination folder, 例如: -d src/components"
);
//自定义--help命令，会合并到原命令中
program.on("--help", () => {
  console.log("");
  console.log("others:");
  console.log("  xx");
  console.log("  yy");
});

//让commander解析process.argv参数,上面的program.version会拿到命令行的命令,第一个参数是输出的结果
program.parse(process.argv);

//获取命令行额外传递的参数  这一段必须放在commander解析argv之后，因为前面还没有解析完毕
//dest属性为  "-d --dest <dest>", 中的<dest>, 这样就可以获取传递的参数
console.log(program.opts().dest);

```

lwycli --help输出

```shell
lwycli --help
Usage: index [options]

Options:
  -v --version      output the version number
  -l --lwy          a lwy's cli
  -d --dest <dest>  a destination folder, 例如: -d src/components
  -h, --help        display help for command

others
  xx
  yy
```

lwycli --dest 额外参数输出

```shell
lwycli --dest src/components/xxx
src/components/xxx
```

## 支持下载项目模板

```js
const { promisify } = require("util");
//使用git-clone的插件  使用node的插件使插件promise化
const download = promisify(require("download-git-repo"));
const { commandSpawn } = require("../utils/termimal");


//2.增加具体的一些功能操作
program
  .command("create <project> [...others")
  .description("create vue project into a folder,例如:lwycli create demo")
  .action(async function (project) {
      try {
    //触发功能的函数,peojet就是项目的名称
    //1.这里要从编写的项目模板中clone下来
    //direct表示探测,#main表示下载的分支
  await  download("direct:项目git地址#main", project, { clone: true });//这样就会把项目模板下载到当前目录中
    
    //2.很多的脚手架都是在这里提示a
    console.log(`cd ${project}`);
    console.log(`npm install`);
    console.log(`npm run dev`);
    
    
     // 2.执行npm install
    const command = process.platform === "win32" ? "npm.cmd" : "npm";
    await commandSpawn(command, ["install"], { cwd: `./${project}` });

    // 3.运行npm run serve
    await commandSpawn(command, ["run", "dev"], { cwd: `./${project}` });
      }catch (error) {
       console.log(error，"github连接失败，请重试");
  }    
    
  });

```

commandSpawn函数

```js
const { spawn } = require("child_process");

const commandSpawn = (...args) => {
  return new Promise((resolve) => {
      //1.开启子进程执行命令
    const childProgress = spawn(...args);
      //2.获取子进程输出和错误信息
    childProgress.stdout.pipe(process.stdout);
    childProgress.stderr.pipe(process.stderr);
    
      //3.监听子进程执行结束，关闭掉
    childProgress.on("close", () => {
      resolve();
    });
  });
};

module.exports = {
  commandSpawn,
};

```

执行命令

```she
$ lwycli create demo
```

## 使用命令复制组件添加到指定文件夹

模板文件 component.vue.ejs

```js
<template>
  <div class="<%= name %>">
    <h2><%= name %></h2>
  </div>
</template>

<script setup></script>

<style>
  .<%= name % > {
    color: red;
  }
</style>

```

> ejs  https://ejs.bootcss.com/

1.创建对应命令行命令

```js

  program
    .command("addcpn <cpnname> [others...]")
    .description(
      "add vue component, 例如 why addcpn HelloWorld -d src/components"
    )
    .action((name) => {
      //参数一是组件的名称，参数二是输出的文件，dest是上面定义的命令,表示复制的文件会输出在使用dest命令指定的目录下
      addComponentAction(name, program.dest || "src/components");
    });
```

2.处理命令

addComponentAction函数

```js
const addComponentAction = async (cpnname, dest) => {
  // 1.编译ejs模板
  const compileResult = await compileEjs("component.vue.ejs", {
    name: cpnname,
  });

  // 2.写入文件操作  如果有d指定est会输出在指定文件夹下
  const targetPath = path.resolve(dest, `./${cpnname}.vue`);
  await writeFile(targetPath, compileResult);
};

```

3.compileEjs

```js
const compileEjs = (tempName, data) => {
  return new Promise((resolve, reject) => {
    // 1.获取到要编译模板的路径
    const tempPosition = `../template/${tempName}`;
    const tempPath = path.resolve(__dirname, tempPosition);

    // 2.对文件进行编译
    ejs.renderFile(tempPath, data, (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
```

4.文件写入操作

```js
const fs = require("fs");

const writeFile = (path, content) => {
  return fs.promises.writeFile(path, content);
};

module.exports = writeFile;

```

5.命令行使用

没有指定dest,默认输出为src/component目录下

```she
lwycli addcpn AppHeader
```

指定dest

```shell
lwycli addcpn AppHeader  --dest src/view
```

