
export class ContactoEntity{

    constructor(
        public id:number,
        public nombre:string,       
        public telefono:string,      
        public cargo:string,
        public clienteId:number
    ){}
 
    public static fromObject(object:{[key:string]:any}):ContactoEntity{

        const {id,nombre,telefono,cargo,clienteId} = object;

        if (!id) throw 'Id es requerido';
        if (!nombre) throw 'nombre es requerido';
        if (!telefono) throw 'telefono es requerido';
        if (!cargo) throw 'cargo es requerido';
        if (!clienteId) throw 'clienteId es requerido';

        return new ContactoEntity(id,nombre,telefono,cargo,clienteId)
    }


}