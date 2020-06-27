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

export class User {
  uuid: string;
  token: string;
  refreshToken: string;
  expiresAt: string;
}


export class PostUser {
  email: string;
  password: string;
  role: string;
}
