import { ContactoEntity } from "./contacto.entity";
import { DireccionEntity } from "./direccion.entity";


enum Tipos{
    PROSPECTO,
    PRECLIENTE,
    CLIENTE,
}

export class ClienteEntity{

    constructor(
        public id:number,
        public nombre:string,
        public tipoCliente:string,
        public telefonoPrincipal:string,
        public direccion:DireccionEntity[],
        public contacto:ContactoEntity[],
        public horario?:string,
    ){}

    public static fromObject(object:{[key:string]:any}):ClienteEntity{

        const {id,nombre,tipoCliente,telefonoPrincipal,direccion=[],contacto=[],horario} = object;

        if (!id) throw 'Id es requerido';
        if (!nombre) throw 'nombre es requerido';
        if (!telefonoPrincipal) throw 'telefonoPrincipal es requerido';
        if (!tipoCliente || !['PROSPECTO','CLIENTE','PRECLIENTE'].includes(tipoCliente)) throw 'Tipo de cliente debe ser valido';

        return new ClienteEntity(id,nombre,tipoCliente,telefonoPrincipal,direccion,contacto,horario)
    }

}