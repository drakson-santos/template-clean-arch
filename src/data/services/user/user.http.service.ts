import type { IUserService } from "@/domain/services/user/user.services";
import type { IUserLogin } from "@/domain/useCases/userLogin/user-login.use-case";

export class UserService implements IUserService {
	async loginBy(email: string, password: string): Promise<IUserLogin.Response> {
		if (!email) throw new Error("Email is required.");
		if (!password) throw new Error("Password is required.");
		// use http client
		throw new Error("Method not implemented.");
	}
}
