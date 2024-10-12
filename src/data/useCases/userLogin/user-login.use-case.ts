import type { IUserService } from "@/domain/services/user/user.services";
import type { IUserLogin } from "@/domain/useCases/userLogin/user-login.use-case";

export class UserLoginUseCase {
	constructor(private readonly userService: IUserService) {}

	login(user: IUserLogin.User): Promise<IUserLogin.Response> {
		return this.userService.loginBy(user.email, user.password);
	}
}
