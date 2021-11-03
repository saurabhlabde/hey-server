
export interface IError {
        id: string
        message: string
        type: string
}

export interface IValidateRegisterInput {
        firstname: string
        lastname: string
        email: string
        password: string
        profileImage: string
}

export interface IValidateLoginInput {
        email: string
        password: string
}