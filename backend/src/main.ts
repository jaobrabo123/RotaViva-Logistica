import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { UnprocessableEntityException, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(cookieParser());
    app.use(
        helmet({
            contentSecurityPolicy: false,
        }),
    );

    app.useGlobalPipes(
        // * Pipe de valição para o class-validator
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            exceptionFactory: errors => new UnprocessableEntityException(errors),
        }),
    );

    const config = new DocumentBuilder()
        .setTitle("RotaViva API")
        .setDescription("The API for the RotaViva project")
        .setVersion("1.0")
        .addCookieAuth("accessToken")
        .addSecurityRequirements("accessToken")
        .build();

    // * Criando o documento baseado no app
    const document = SwaggerModule.createDocument(app, config);

    // * Fazendo setup do documento e definindo rota para a documentção
    SwaggerModule.setup("api-docs", app, document);

    await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
