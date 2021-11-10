import { Field, InputType } from "type-graphql"

@InputType()
export class GetMessagesInput {
        @Field()
        roomId: number
}

@InputType()
export class GetMessageInput {
        @Field()
        messageId: number
}

@InputType()
export class SearchInput {
        @Field()
        query: string
}

enum UsersType {
        ALL = "ALL",
        SELECTED = "SELECTED"
}

@InputType()
export class UsersInput {
        @Field({ nullable: true })
        type: UsersType
}

@InputType()
export class UserInput {
        @Field({ nullable: true })
        id: number
}


@InputType()
export class CheckRoomUserInput {
        @Field()
        userId: number
}
