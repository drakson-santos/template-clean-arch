import { MESSAGES } from "@/constants/messages.enum";
import { REGEX_PATTERNS } from "@/constants/regex.enum";
import type { IUserService } from "@/domain/services/user/user.services";
import type { IUserLogin } from "@/domain/useCases/userLogin/user-login.use-case";

export class UserLoginUseCase {
	constructor(private readonly userService: IUserService) {}

	private validateEmail(email: string): void {
		if (!email) throw new Error(MESSAGES.EMAIL_REQUIRED);

		if (!REGEX_PATTERNS.EMAIL.test(email))
			throw new Error(MESSAGES.INVALID_EMAIL_FORMAT);
	}

	private validatePassword(password: string): void {
		if (!password) throw new Error(MESSAGES.PASSWORD_REQUIRED);

		if (!REGEX_PATTERNS.STRONG_PASSWORD.test(password)) {
			throw new Error(MESSAGES.WEAK_PASSWORD);
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
