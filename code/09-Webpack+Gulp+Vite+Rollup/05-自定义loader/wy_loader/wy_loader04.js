const { validate } = require("schema-utils");
const schema01 = require("../loaderSchema/schama01.json");

module.exports = function (content) {
  const options = this.getOptions();
  console.log(options);
  //第一个参数是校验的规则，第二个参数是校验的信息
  validate(schema01, options);

  return content;
};
