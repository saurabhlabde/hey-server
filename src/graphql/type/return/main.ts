import { Field, ObjectType } from "type-graphql";

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
        @Field()
        id: number

        @Field()
        chatRoomId: number

        @Field()
        userId: number
}
