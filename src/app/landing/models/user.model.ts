export class GetUser {
  uuid: string;
  username: string;
  firstName: string;
  lastName: string;
  role: {
    name: string,
    uuid: string
  };
  createdAt: string;
}

export class PostUser {
  email: string;
  password: string;
}
