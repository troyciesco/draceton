import "reflect-metadata"
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  ResolveField,
  Root,
  InputType,
  Field,
} from "@nestjs/graphql"
import { Inject } from "@nestjs/common"
import { Note } from "@/models/note.model"
import { User } from "@/models/user.model"
import { PrismaService } from "@/prisma.service"
import { NoteCreateInput } from "@/resolvers/note.resolvers"

@InputType()
class UserUniqueInput {
  @Field({ nullable: true })
  id: number

  @Field({ nullable: true })
  email: string
}

@InputType()
class UserCreateInput {
  @Field()
  email: string

  @Field({ nullable: true })
  name: string

  @Field((type) => [NoteCreateInput], { nullable: true })
  notes: [NoteCreateInput]
}

@Resolver(User)
export class UserResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  @ResolveField()
  async notes(@Root() user: User): Promise<Note[]> {
    return this.prismaService.user
      .findUnique({
        where: {
          id: user.id,
        },
      })
      .notes()
  }

  @Mutation((returns) => User)
  async signUpUser(@Args("data") data: UserCreateInput): Promise<User> {
    const noteData = data.notes?.map((note) => {
      return { content: note.content || undefined }
    })

    return this.prismaService.user.create({
      data: {
        email: data.email,
        name: data.name,
        notes: {
          create: noteData,
        },
      },
    })
  }

  @Query((returns) => User, { nullable: true })
  findUserByEmail(@Args("email") email: string) {
    return this.prismaService.user.findUnique({
      where: { email },
    })
  }

  @Query((returns) => [User], { nullable: true })
  async allUsers() {
    return this.prismaService.user.findMany()
  }
}
