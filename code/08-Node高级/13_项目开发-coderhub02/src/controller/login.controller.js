const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../config/secretKey");

class LoginController {
  sign(ctx, next) {
    const { id, name } = ctx.user;

    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 60 * 24 * 30 * 10,
      algorithm: "RS256",
    });
    ctx.body = {
      code: 0,
      data: {
        id,
        name,
        token,
      },
    };
  }

  test(ctx, next) {
    //对token进行验证
    const { id, name } = ctx.user;

    ctx.body = {
      code: 0,
      data: {
        id,
        name,
      },
    };
  }
}

module.exports = new LoginController();
