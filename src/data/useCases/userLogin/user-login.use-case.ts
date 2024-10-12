import type { IUserService } from "@/domain/services/user/user.services";
import type { IUserLogin } from "@/domain/useCases/userLogin/user-login.use-case";

export class UserLoginUseCase {
	constructor(private readonly userService: IUserService) {}

	private validateEmail(email: string): void {
		if (!email) throw new Error("Email is required.");

		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailPattern.test(email)) throw new Error("Invalid email format.");
	}

	private validatePassword(password: string): void {
		if (!password) throw new Error("Password is required.");

		const strongPasswordPattern =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
		if (!strongPasswordPattern.test(password)) {
			throw new Error(
				"Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.",
			);
		}
	}

	private validateUser(user: IUserLogin.User) {
		this.validateEmail(user.email);
		this.validatePassword(user.password);
	}

	async login(user: IUserLogin.User): Promise<IUserLogin.Response> {
		this.validateUser(user);
		return this.userService.loginBy(user.email, user.password);
	}
}
