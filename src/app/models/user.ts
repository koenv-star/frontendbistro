export class User {
  constructor(private username: string, private email: string,  private role: string) {
    this.username = username;
    this.email = email;
    this.role = role;
  }
}
