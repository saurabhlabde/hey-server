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
