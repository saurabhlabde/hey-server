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
import { SearchResolver } from './resolver/main/query/search'
import { GetUserResolver } from './resolver/main/query/user'
import { GetUsersResolver } from './resolver/main/query/users'
import { CheckRoomUserResolver } from './resolver/main/query/checkRoomUser'
import { UpdateMessageStatusResolver } from './resolver/main/mutation/updateMessageStatus'

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
        SearchResolver,
        GetUserResolver,
        GetUsersResolver,
        CheckRoomUserResolver,
        UpdateMessageStatusResolver,

        // subscribe
        MessageSubscriptionResolver,
] as const