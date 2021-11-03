import { nanoid } from "nanoid";

// util
import { stringNotEmpty } from './index'

// type
import { IError, IValidateRegisterInput } from "@src/types/utils/validation";

export const validateRegisterInput = ({
        firstname, lastname, email, password, profileImage
}: IValidateRegisterInput) => {
        let messages: Array<IError> = [];

        //   firstname
        if (firstname?.trim() === "") {
                messages.push(stringNotEmpty("firstname"));
        }

        //   lastname
        if (lastname?.trim() === "") {
                messages.push(stringNotEmpty("lastname"));
        }

        //   profile image
        if (profileImage?.trim() === "") {
                messages.push(stringNotEmpty("profile image"));
        }

        // email
        if (email?.trim() === "") {
                messages.push(stringNotEmpty("email id"));
        } else {
                const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])^@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
                if (email.match(regEx)) {
                        messages.push({
                                id: nanoid(),
                                message: "invalid email address",
                                type: "error",
                        });
                }
        }

        //   password
        const passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,125}$/;

        if (password === "") {
                messages.push(stringNotEmpty("password"));
        } else if (password?.length < 6) {
                messages.push({
                        id: nanoid(),
                        message: "Password must be 6 or more charter",
                        type: "error",
                });
        } else if (!password?.match(passRegex)) {
                messages.push({
                        id: nanoid(),
                        message: "Password must contain one spacial charter ex: abc@123",
                        type: "error",
                });
        } else if (password?.trim() === "abc@123") {
                messages.push({
                        id: nanoid(),
                        message: "To common password take anther password",
                        type: "error",
                });
        } else if (password.includes(email)) {
                messages.push({
                        id: nanoid(),
                        message: "Inside password can't contain email id",
                        type: "error",
                });
        }

        return {
                messages,
                valid: messages.length < 1,
        };
};
