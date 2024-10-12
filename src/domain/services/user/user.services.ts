import type { IUserLogin } from "@/domain/useCases/userLogin/user-login.use-case";

export interface IUserService {
	loginBy(email: string, password: string): Promise<IUserLogin.Response>;
}
