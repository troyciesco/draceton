import "reflect-metadata"
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Root,
  Context,
  InputType,
  Field,
  registerEnumType,
} from "@nestjs/graphql"
import { Inject } from "@nestjs/common"
import { Note } from "@/models/note.model"
import { User } from "@/models/user.model"
import { PrismaService } from "@/prisma.service"
import { UserInputError } from "apollo-server-express"

@InputType()
export class NoteCreateInput {
  @Field({ nullable: true })
  content: string

  @Field({ nullable: true })
  textColor: string

  @Field({ nullable: true })
  cardColor: string
}

@InputType()
export class NoteUpdateInput {
  @Field({ nullable: true })
  content: string

  @Field({ nullable: true })
  textColor: string

  @Field({ nullable: true })
  cardColor: string
}

@Resolver(Note)
export class NoteResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  @ResolveField()
  user(@Root() note: Note): Promise<User | null> {
    return this.prismaService.note
      .findUnique({
        where: {
          id: note.id,
        },
      })
      .user()
  }

  @Query((returns) => Note, { nullable: true })
  noteById(@Args("id") id: number) {
    return this.prismaService.note.findUnique({
      where: { id },
    })
  }

  @Query((returns) => [Note], { nullable: true })
  myNotes(
    @Args("searchString", { nullable: true }) searchString: string,
    // TODO: this is basically fake auth currently
    @Args("email", { nullable: false }) email: string,
    @Context() ctx,
  ) {
    const or = searchString
      ? {
          OR: [{ content: { contains: searchString } }],
        }
      : {}

    return this.prismaService.note.findMany({
      where: { ...or, user: { email: { equals: email } } },
    })
  }

  @Mutation((returns) => Note)
  createNote(
    @Args("data") data: NoteCreateInput,
    @Args("userEmail") userEmail: string,
    @Context() ctx,
  ): Promise<Note> {
    if (data.content.length < 20 || data.content.length > 300) {
      throw new UserInputError("Note must be between 20 and 300 characters.")
    }

    return this.prismaService.note.create({
      data: {
        content: data.content,
        textColor: data.textColor,
        cardColor: data.cardColor,
        user: {
          connect: { email: userEmail },
        },
      },
    })
  }

  @Mutation((returns) => Note)
  editNote(
    @Args("noteId") id: number,
    @Args("data") data: NoteUpdateInput,
  ): Promise<Note> {
    if (data.content.length < 20 || data.content.length > 300) {
      throw new UserInputError("Note must be between 20 and 300 characters.")
    }

    return this.prismaService.note.update({
      where: { id: id || undefined },
      data: {
        content: data.content,
        textColor: data.textColor,
        cardColor: data.cardColor,
      },
    })
  }

  @Mutation((returns) => Note, { nullable: true })
  async deleteNote(
    @Args("noteId") id: number,
    // TODO: this is basically fake auth currently
    @Args("userEmail", { nullable: false }) email: string,
    @Context() ctx,
  ): Promise<Note | null> {
    const note = await this.prismaService.note.findMany({
      where: { id: id || undefined, user: { email: { equals: email } } },
      select: {
        id: true,
      },
    })

    if (!note) {
      return
    }

    return this.prismaService.note.delete({
      where: {
        id,
      },
    })
  }
}
