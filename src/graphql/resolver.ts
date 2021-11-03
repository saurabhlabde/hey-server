// hello
import { HelloResolver } from './resolver/hello'

// auth
import { RegisterResolver } from './resolver/auth/register'
import { LoginResolver } from './resolver/auth/login'
import { TokenCheckResolver } from './resolver/main/query/tokenCheck'
import { UserAuthResolver } from './resolver/main/query/userAuth'


export const resolvers = [
        //  test
        HelloResolver,

        // auth
        RegisterResolver,
        LoginResolver,
        TokenCheckResolver,
        UserAuthResolver,
] as const
