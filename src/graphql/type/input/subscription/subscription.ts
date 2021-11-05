import { Field, InputType, } from "type-graphql";

@InputType()
export class MessageSubscribeInput {
        @Field()
        roomId: number
}