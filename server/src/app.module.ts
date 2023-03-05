import { Module } from "@nestjs/common"
import { GraphQLModule } from "@nestjs/graphql"
import { PrismaService } from "./prisma.service"
import { NoteResolver } from "@/resolvers/note.resolvers"
import { UserResolver } from "@/resolvers/user.resolvers"
import { join } from "path"
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo"
import { ConfigModule } from "@nestjs/config"

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      buildSchemaOptions: { dateScalarMode: "timestamp" },
    }),
  ],
  controllers: [],
  providers: [PrismaService, UserResolver, NoteResolver],
})
export class AppModule {}
