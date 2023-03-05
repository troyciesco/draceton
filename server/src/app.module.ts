import { Module } from "@nestjs/common"
import { GraphQLModule } from "@nestjs/graphql"
import { PrismaService } from "./prisma.service"
import { NoteResolver } from "@/resolvers/note.resolvers"
import { UserResolver } from "@/resolvers/user.resolvers"
import { TagResolver } from "@/resolvers/tag.resolvers"
import { join } from "path"
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo"

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      cors: {
        origin: "*",
        credentials: true,
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
