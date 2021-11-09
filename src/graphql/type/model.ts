import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class User {
        @Field()
        id: number


        @Field()
        firstname: string

        @Field()
        lastname: string

        @Field()
        email: string

        @Field()
        password: string

        @Field()
        profileImage: string

        @Field()
        createdAtIso: string

        @Field()
        createdAt: Date

        @Field({ nullable: true })
        lastOnlineAt: bigint
}

@ObjectType()
export class UserForMessage {
        @Field({ nullable: true })
        id: number

        @Field({ nullable: true })
        firstname: string

        @Field({ nullable: true })
        lastname: string

        @Field({ nullable: true })
        profileImage: string
}


@ObjectType()
export class UserForUserLastOnline {
        @Field({ nullable: true })
        id: number

        @Field({ nullable: true })
        lastOnlineAt: bigint
}

enum IStatus {
        SEND = "SEND",
        DELIVERED = "DELIVERED",
        READ = "READ"
}

@ObjectType()
export class Message {
        @Field()
        id: number

        @Field()
        userID: number


        @Field({ nullable: true })
        content: string

        @Field({ nullable: true })
        image: string

        @Field()
        status: IStatus

        @Field()
        chatRoomID: number

        @Field({ nullable: true })
        replyToMessageID: number

        @Field({ nullable: true })
        forUserId: number

        @Field()
        createdAtIso: string

        @Field()
        createdAt: Date

        @Field(type => UserForMessage, { nullable: true })
        User: UserForMessage

        @Field({ nullable: true })
        chatRoomId: number

        @Field({ nullable: true })
        userId: number
}

@ObjectType()
export class ChatRoom {
        @Field()
        id: number

        @Field()
        newMessages: number

        @Field(type => User, { nullable: true })
        Admin: User

        @Field({ nullable: true })
        name: string

        @Field({ nullable: true })
        imageUrl: string

        @Field()
        createdAtIso: string

        @Field()
        createdAt: Date

        @Field(type => [Message])
        Messages: Message[]

        @Field(type => Message, { nullable: true })
        lastMessage: Message

        @Field({ nullable: true })
        userId: number

        @Field({ nullable: true })
        messageId: number
}

@ObjectType()
export class ChatRoomUser {
        @Field()
        id: number

        @Field(type => User, { nullable: true })
        user: User

        @Field(type => ChatRoom, { nullable: true })
        chatRoom: ChatRoom

        @Field()
        createdAtIso: string

        @Field()
        createdAt: Date

        @Field({ nullable: true })
        chatRoomId: number

        @Field({ nullable: true })
        userId: number
}
