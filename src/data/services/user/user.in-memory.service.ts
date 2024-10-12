import type { IUserService } from "@/domain/services/user/user.services";
import type { IUserLogin } from "@/domain/useCases/userLogin/user-login.use-case";

export class UserInMemoryService implements IUserService {
	async loginBy(email: string, password: string): Promise<IUserLogin.Response> {
		if (!email) throw new Error("Email is required.");
		if (!password) throw new Error("Password is required.");

		const isCorrectEmail = email === "xuxa@gmail.com";
		const isCorrectPassword = password === "Abcd@123";
		const isUnauthorized = !isCorrectEmail || !isCorrectPassword;

		if (isUnauthorized) throw new Error("Unauthorized.");

		return { token: "token-memory" };
	}
}
