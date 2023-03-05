import { Module } from "@nestjs/common"
import { GraphQLModule } from "@nestjs/graphql"
import { PrismaService } from "./prisma.service"
import { NoteResolver } from "@/resolvers/note.resolvers"
import { UserResolver } from "@/resolvers/user.resolvers"
import { TagResolver } from "@/resolvers/tag.resolvers"
import { join } from "path"
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo"
import { ConfigModule } from "@nestjs/config"

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      cors: {
        origin: process.env.CLIENT_URL,
      },
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      buildSchemaOptions: { dateScalarMode: "timestamp" },
    }),
  ],
  controllers: [],
  providers: [PrismaService, UserResolver, NoteResolver, TagResolver],
})
export class AppModule {}
