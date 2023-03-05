import "reflect-metadata"
import { ObjectType, Field, ID, Int } from "@nestjs/graphql"
import { User } from "./user.model"

@ObjectType()
export class Note {
  @Field((type) => Int)
  id: number

  @Field((type) => Date)
  createdAt: Date

  @Field((type) => Date)
  updatedAt: Date

  @Field((type) => String, { nullable: true })
  content: string | null

  @Field((type) => String, { nullable: true })
  textColor?: string | null

  @Field((type) => String, { nullable: true })
  cardColor?: string | null

  @Field((type) => User, { nullable: true })
  user?: User | null
}
