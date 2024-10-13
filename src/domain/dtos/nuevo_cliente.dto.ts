import { regularExps } from "../../config/regular-exp";

export class ClienteNuevoDto{

    private constructor(
        public readonly nombre:string,        
        public readonly telefonoPrincipal:string,        
        public readonly tipoCliente:string,        
        public readonly horario?:string,
    ){}

    static create (props:{[key:string]:any}):[string?,ClienteNuevoDto?]{

        const {nombre,telefonoPrincipal,tipoCliente,horario} = props;

        if (!nombre) return ['nombre es requerido',undefined];
        if (!telefonoPrincipal) return ['telefono es requerido',undefined];
        if (!regularExps.telefono.test(telefonoPrincipal)) return ['telefono no valido',undefined];
        if (!tipoCliente||!['PROSPECTO','PRECLIENTE','CLIENTE'].includes(tipoCliente)) return ['Debe ser un tipo de cliente valido']

        return [undefined,new ClienteNuevoDto(nombre,telefonoPrincipal,tipoCliente,horario)]

    }
}