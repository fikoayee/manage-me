export interface UserService {
  getUser(userId: string): Promise<unknown>;
}
