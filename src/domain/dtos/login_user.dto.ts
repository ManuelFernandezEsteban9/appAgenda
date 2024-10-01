import { regularExps } from "../../config/regular-exp";

export class LoginUserDto{

    private constructor(
        public readonly email:string,
        public readonly password:string
    ){}

    static create (props:{[key:string]:any}):[string?,LoginUserDto?]{

        const {email,password} = props;

        if (!email) return ['email es requerido',undefined];
        if (!regularExps.email.test(email)) return ['email no valido',undefined];
        if (!password) return ['password es requerido',undefined];
        if (!regularExps.password.test(password)) return ['password no valido',undefined];

        return [undefined,new LoginUserDto(email,password)]
    }
}