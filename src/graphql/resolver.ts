// auth
import { RegisterResolver } from './resolver/auth/register'
import { LoginResolver } from './resolver/auth/login'
import { TokenCheckResolver } from './resolver/main/query/tokenCheck'
import { UserAuthResolver } from './resolver/main/query/userAuth'

// main 
import { CreateChatRoomResolver } from './resolver/main/mutation/createChatRoom'
import { CratedMessageResolver } from './resolver/main/mutation/cratedMessage'
import { GetChatRoomResolver } from './resolver/main/query/getChatRoom'
import { GetMessagesResolver } from './resolver/main/query/getMessages'

// subscribe
import { MessageSubscriptionResolver } from './resolver/main/subscription/message'

export const resolvers = [

        // auth
        RegisterResolver,
        LoginResolver,
        TokenCheckResolver,
        UserAuthResolver,

        // main
        CreateChatRoomResolver,
        CratedMessageResolver,
        GetChatRoomResolver,
        GetMessagesResolver,

        // subscribe
        MessageSubscriptionResolver,
] as const