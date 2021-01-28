// class definition for User entity
export default class User {
  constructor(id, firstName, lastName, email) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }

  getUser() {
    return this.id;
  }
}
