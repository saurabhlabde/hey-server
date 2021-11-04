import { Field, InputType } from "type-graphql"

@InputType()
export class RegisterInput {
        @Field()
        firstname: string

        @Field()
        lastname: string

        @Field()
        email: string

        @Field()
        profileImage: string

        @Field()
        password: string
}


@InputType()
export class LoginInput {
        @Field()
        email: string

        @Field()
        password: string
}
