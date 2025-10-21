export class User {
  private constructor(
    public id: string,
    public name: string,
    public role: "reader" | "admin",
    private _password: string
  ) {}

  static create(props: { id: string; name: string; role: "reader" | "admin"; password: string }): User {
    return new User(props.id, props.name, props.role, props.password);
  }

  get password(): string {
    return this._password;
  }
}
