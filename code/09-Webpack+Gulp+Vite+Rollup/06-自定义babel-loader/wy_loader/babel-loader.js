const { validate } = require("schema-utils");
const schema01 = require("../loaderSchema/schama01.json");

const babel = require("@babel/core");
module.exports = function (content) {
  const options = this.getOptions();
  const callback = this.async();
  console.log(options);
  //第一个参数是校验的规则，第二个参数是校验的信息
  // validate(schema01, options);

  babel.transform(content, options, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result.code);
    }
  });

  return content;
};
