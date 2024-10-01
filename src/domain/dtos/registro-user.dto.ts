import { regularExps } from "../../config/regular-exp";

export class RegisterUserDto{

    private constructor(
        public readonly nombre:string,        
        public readonly telefono:string,
        public readonly email:string,
        public readonly password:string,
        public readonly emailValidated?:boolean,
        public readonly avatar?:string,
    ){}

    static create (props:{[key:string]:any}):[string?,RegisterUserDto?]{

        const {nombre,telefono,email,password,emailValidated=false,avatar} = props;

        if (!nombre) return ['nombre es requerido',undefined];
        if (!telefono) return ['telefono es requerido',undefined];
        if (!regularExps.telefono.test(telefono)) return ['telefono no valido',undefined];
        if (!password) return ['password es requerido',undefined];
        if (!regularExps.password.test(password)) return ['password no valido',undefined];
        if (!email) return ['email es requerido',undefined];
        if (!regularExps.email.test(email)) return ['email no valido',undefined];
        let emailValidatedOk = false;
        if (emailValidated&&emailValidated==='true') emailValidatedOk=true;

        return [undefined,new RegisterUserDto(nombre,telefono,email,password,emailValidatedOk,avatar)]

    }
}