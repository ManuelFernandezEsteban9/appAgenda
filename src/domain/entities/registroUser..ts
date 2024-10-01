import { regularExps } from "../../config/regular-exp";

export class RegistroUser {

  constructor(
    public id :number,
    public nombre: string,
    public telefono: string,
    public email: string,    
    public token: string,
    public emailValidated?: boolean,
    public avatar?: string,
  ) { }

  public static fromObject(object: { [key: string]: any }): RegistroUser {

    const { id, nombre, email, telefono, token, emailValidated, avatar } = object;

    if (!id) throw 'id es requerido'
    if (!nombre) throw 'nombre es requerido';
    if (!token) throw 'token es requerido';
    if (!telefono) throw 'telefono es requerido';
    if (!regularExps.telefono.test(telefono)) throw 'telefono no valido';    
    if (!email) throw 'email es requerido';
    if (!regularExps.email.test(email)) throw 'email no valido';
    if (emailValidated === undefined) throw 'emailValidated es requerido';

    return new RegistroUser(nombre, telefono, email, token, emailValidated, avatar)
  }
}
