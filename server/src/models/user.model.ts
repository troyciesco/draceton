import "reflect-metadata"
import { ObjectType, Field, Int } from "@nestjs/graphql"
import { IsEmail } from "class-validator"
import { Note } from "./note.model"

@ObjectType()
export class User {
  @Field((type) => Int)
  id: number

  @Field()
  @IsEmail()
  email: string

  @Field((type) => String, { nullable: true })
  name?: string | null

  @Field((type) => [Note], { nullable: true })
  notes?: [Note] | null
}
