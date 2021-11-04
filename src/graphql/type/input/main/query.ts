import { Field, InputType } from "type-graphql"

@InputType()
export class GetMessageInput {
        @Field()
        roomId: number
}