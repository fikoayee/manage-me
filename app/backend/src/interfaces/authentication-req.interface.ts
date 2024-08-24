export interface AuthRequest extends Request {
    user?: {
      userId: string;
      email: string;
      iat: number;
      exp: number;
    };
  }