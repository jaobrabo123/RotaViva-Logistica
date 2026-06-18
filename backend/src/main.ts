import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { UnprocessableEntityException, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
    // * Criando o App
    const app = await NestFactory.create(AppModule);

    // * Adicionando o cookie-parser para poder acessar os cookies
    app.use(cookieParser());

    // * Adicionando o helmet para proteção básica da API
    app.use(
        helmet({
            // * Desabilitando Content-Security-Policy para o Swagger funcionar
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

    // * Configurando Swagger
    const config = new DocumentBuilder()
        .setTitle("RotaViva API")
        .setDescription("The API for the RotaViva project")
        .setVersion("1.0")
        .addBearerAuth()
        .addSecurityRequirements("bearer")
        .build();

    // * Criando o documento baseado no app
    const document = SwaggerModule.createDocument(app, config);

    // * Fazendo setup do documento e definindo rota para a documentção
    SwaggerModule.setup("api-docs", app, document);

    // * Configurando porta do servidor
    await app.listen(process.env.PORT ?? 3000, () =>
        console.log("Servidor rodando em: http://localhost:3000"),
    );
}

// * Chamando a função de inicialização
void bootstrap();
