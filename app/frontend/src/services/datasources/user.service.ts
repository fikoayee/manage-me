export interface UserService {
  getUser(userId: string): Promise<unknown>;
  getUsers(): Promise<unknown>;
}
