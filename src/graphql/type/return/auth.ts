import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class RegisterReturn {
        @Field()
        token: string
}

@ObjectType()
export class LoginReturn {
        @Field()
        token: string
}

