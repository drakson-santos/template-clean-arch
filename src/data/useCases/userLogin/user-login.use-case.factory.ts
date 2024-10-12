import { UserService } from "@/data/services/user/user.http.service";
import { UserLoginUseCase } from "./user-login.use-case";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export default class UserLoginUseCaseFactory {
	static execute(): UserLoginUseCase {
		const service = new UserService();
		return new UserLoginUseCase(service);
	}
}
