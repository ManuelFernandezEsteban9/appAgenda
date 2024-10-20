import { regularExps } from "../../config/regular-exp";

export class UpdateClienteDto{

    private constructor(
        public readonly id:number,
        public readonly nombre:string,        
        public readonly telefonoPrincipal:string,        
        public readonly tipoCliente:string,        
        public readonly horario?:string,
    ){}

    static create (props:{[key:string]:any}):[string?,UpdateClienteDto?]{

        const {id,nombre,telefonoPrincipal,tipoCliente,horario} = props;
        if (!id) return ['id es requerido',undefined];
        if (!nombre) return ['nombre es requerido',undefined];
        if (!telefonoPrincipal) return ['telefono es requerido',undefined];
        if (!regularExps.telefono.test(telefonoPrincipal)) return ['telefono no valido',undefined];
        if (!tipoCliente||!['PROSPECTO','PRECLIENTE','CLIENTE'].includes(tipoCliente)) return ['Debe ser un tipo de cliente valido']

        return [undefined,new UpdateClienteDto(id,nombre,telefonoPrincipal,tipoCliente,horario)]

    }
}