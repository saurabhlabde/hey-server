import { nanoid } from "nanoid";

// type
import { IThrowMessage } from "@src/types/utils/jwt";

export const generateMessage = ({ messages, message, type }: IThrowMessage) => {
        return messages?.push({
                id: nanoid(),
                message,
                type,
        });
};
