"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParse = require("cookie-parser");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    app.use(cookieParse());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('test example')
        .setDescription('The API description')
        .setVersion('1.0')
        .addTag('test')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('doc', app, document);
    await app.listen(4000);
}
bootstrap();
//# sourceMappingURL=main.js.map