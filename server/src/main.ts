import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(process.env.PORT || 3001, () => {
    console.log(`
🚀 Server ready at: http://localhost:${process.env.PORT || 3001}/graphql
⭐️ See sample queries: http://pris.ly/e/ts/graphql-nestjs#using-the-graphql-api
`)
  })
  console.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap()
