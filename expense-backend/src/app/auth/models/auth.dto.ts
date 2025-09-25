export class RegisterDto {
  email: string;
  password: string;
}

export class LoginDto {
  email: string;
  password: string;
}

export class AuthResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
  };
}
