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
