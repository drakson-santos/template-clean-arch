import { UserService } from "@/data/services/user/user.service";
import type { IUserService } from "@/domain/services/user/user.services";
import type { IUserLogin } from "@/domain/useCases/userLogin/user-login.use-case";
import { UserLoginUseCase } from "./user-login.use-case";

type SutInstances = {
	sut: UserLoginUseCase;
	service: IUserService;
	UserSpyWithoutEmail: IUserLogin.User;
	UserSpyWithoutPassword: IUserLogin.User;
};

const sutFactory = (): SutInstances => {
	const service = new UserService();
	const sut = new UserLoginUseCase(service);

	const UserSpyWithoutEmail: IUserLogin.User = {
		email: "", // Invalid email
		password: "abcd@123",
	};

	const UserSpyWithoutPassword: IUserLogin.User = {
		email: "user-spy@gmail.com",
		password: "", // Invalid password
	};

	return {
		sut,
		service,
		UserSpyWithoutEmail,
		UserSpyWithoutPassword,
	};
};

describe("UserLogin", () => {
	test("It should not be possible to login without email and password", async () => {
		const { sut, UserSpyWithoutEmail, UserSpyWithoutPassword } = sutFactory();
		await expect(sut.loginBy(UserSpyWithoutEmail)).rejects.toThrow(
			"Email is required.",
		);
		await expect(sut.loginBy(UserSpyWithoutPassword)).rejects.toThrow(
			"Password is required.",
		);
	});
});
