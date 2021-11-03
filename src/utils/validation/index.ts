import { nanoid } from "nanoid"

export const isString = (value: string) => {
        if (!/[^a-zA-Z]/.test(value)) {
                return true;
        } else {
                return false;
        }
};

export const stringNotEmpty = (name: string) => {
        const message = {
                id: nanoid(),
                message: `${name} must not be empty`,
                type: "error",
        }
        return message
}

export const stringNotNumber = (name: string) => {
        const message = {
                id: nanoid(),
                message: `${name} must be string`,
                type: "error",
        }
        return message
}