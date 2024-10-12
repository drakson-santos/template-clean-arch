import type { IUserService } from "@/domain/services/user/user-services";
import type { IUserLogin } from "@/domain/useCases/userLogin/user-login";

export class UserLogin {
	constructor(private readonly userService: IUserService) {}

	loginBy(user: IUserLogin.User): Promise<void> {
		return this.userService.loginBy(user.email, user.password);
	}
}
