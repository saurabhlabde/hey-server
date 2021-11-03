import { stringNotEmpty } from './index'

// type
import { IError, IValidateLoginInput } from '@src/types/utils/validation';

export const validateLoginInput = ({ email, password }: IValidateLoginInput) => {
        const messages: Array<IError> = [];

        // username
        if (email?.trim() === "") {
                messages.push(stringNotEmpty("email"));
        }

        // password

        if (password?.trim() === "") {
                messages.push(stringNotEmpty("password"));
        }

        return {
                messages,
                valid: messages.length < 1,
        };
};
