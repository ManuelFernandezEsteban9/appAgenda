export class UserResponse {

  constructor(
    public id: number,
    public nombre: string,
    public telefono: string,
    public email: string,
    public password: string,
    public token: string,
    public emailValidated?: boolean,
    public avatar?: string,
  ) { }

  public static fromObject(object: { [key: string]: any }): UserResponse {

    const { id, nombre, email, telefono, password, token, emailValidated, avatar } = object;
    if (!id) throw 'id es requerido';
    if (!nombre) throw 'nombre es requerido';
    if (!token) throw 'token es requerido';
    if (!telefono) throw 'telefono es requerido';

    if (!password) throw 'password es requerido';
    if (!email) throw 'email es requerido';

    if (emailValidated === undefined) throw 'emailValidated es requerido';

    return new UserResponse(id, nombre, telefono, email, password, token, emailValidated, avatar)
  }

}
