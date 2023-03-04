import "reflect-metadata"
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Root,
  Context,
  Int,
  InputType,
  Field,
  registerEnumType,
} from "@nestjs/graphql"
import { Inject } from "@nestjs/common"
import { Note } from "@/models/note.model"
import { User } from "@/models/user.model"
import { Tag } from "@/models/tag.model"
import { PrismaService } from "@/prisma.service"

@InputType()
export class TagCreateInput {
  @Field()
  name: string
}

@Resolver(Tag)
export class TagResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  @ResolveField()
  user(@Root() tag: Tag): Promise<User | null> {
    return this.prismaService.tag
      .findUnique({
        where: {
          id: tag.id,
        },
      })
      .user()
  }

  @ResolveField()
  async notes(@Root() tag: Tag, @Context() ctx): Promise<Note[]> {
    return this.prismaService.tag
      .findUnique({
        where: {
          id: tag.id,
        },
      })
      .notes()
  }

  @Query((returns) => Tag, { nullable: true })
  tagById(@Args("id") id: number) {
    return this.prismaService.tag.findUnique({
      where: { id },
    })
  }
}
