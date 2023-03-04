import "reflect-metadata"
import { ObjectType, Field, ID, Int } from "@nestjs/graphql"
import { Note } from "./note.model"
import { User } from "./user.model"

@ObjectType()
export class Tag {
  @Field((type) => Int)
  id: number

  @Field((type) => Date)
  createdAt: Date

  @Field((type) => Date)
  updatedAt: Date

  @Field()
  name: string

  @Field((type) => [Note], { nullable: true })
  notes?: [Note] | null

  @Field((type) => User, { nullable: true })
  user?: User | null
}
