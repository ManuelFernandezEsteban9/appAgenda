
export class DireccionEntity{

    constructor(
        public id:number,
        public calle:string,       
        public numero:number,      
        public codigoPostal:number,
        public poblacionId:number,  
        public provinciaId:number,  
        public clienteId:number
    ){}
 
    public static fromObject(object:{[key:string]:any}):DireccionEntity{

        const {id,calle,numero,codigoPostal,poblacionId,provinciaId,clienteId} = object;

        if (!id) throw 'Id es requerido';
        if (!calle) throw 'calle es requerido';
        if (!numero) throw 'numero es requerido';
        if (!codigoPostal) throw 'codigoPostal es requerido';
        if (!poblacionId) throw 'poblacionId es requerido';
        if (!provinciaId) throw 'provinciaId es requerido';
        if (!clienteId) throw 'clienteId es requerido';

        return new DireccionEntity(id,calle,numero,codigoPostal,poblacionId,provinciaId,clienteId)
    }


}