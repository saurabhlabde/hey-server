import { Field, InputType } from "type-graphql"

@InputType()
export class CrateRoomInput {
        @Field()
        userId: number
}

@InputType()
export class CrateMessageInput {
        @Field({ nullable: true })
        content: string

        @Field({ nullable: true })
        image: string

        @Field()
        chatRoomId: number

        @Field({ nullable: true })
        messageReplyId: number
}

@InputType()
export class UpdateMessageStatusInput {
        @Field()
        type: "SEND" | "DELIVERED" | "READ"

        @Field()
        messageId: number
}
