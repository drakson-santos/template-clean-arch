export interface IUserService {
	loginBy(email: string, password: string): Promise<void>;
}
