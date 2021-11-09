import { Field, ObjectType } from "type-graphql";
import { Message, UserForUserLastOnline } from "../model";

@ObjectType()
export class UserAuthReturn {
        @Field()
        id: number

        @Field()
        firstname: string

        @Field()
        lastname: string

        @Field()
        profileImage: string
}


@ObjectType()
export class CreateChatRoomReturn {
        @Field({ nullable: true })
        id: number

        @Field({ nullable: true })
        chatRoomId: number

        @Field({ nullable: true })
        userId: number
}

@ObjectType()
export class CheckRoomUserReturn {
        @Field({ nullable: true })
        isValid: boolean

        @Field({ nullable: true })
        chatRoomId: number

        @Field({ nullable: true })
        userId: number
}


// subscription
@ObjectType()
export class MessageSubscriptionReturn {
        @Field(type => Message)
        message: Message

        @Field()
        type: String
}

@ObjectType()
export class UserLastOnlineSubscriptionReturn {
        @Field(type => UserForUserLastOnline)
        user: UserForUserLastOnline
}