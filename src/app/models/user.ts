export class User {
  username: String;
  email: String;
  role: String;

  constructor(username: String, email: String, role: String) {
    this.username = username;
    this.email = email;
    this.role = role;
  }
}
