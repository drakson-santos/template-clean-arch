import { UserInMemoryService } from "@/data/services/user/user.in-memory.service";
import type { IUserService } from "@/domain/services/user/user.services";
import type { IUserLogin } from "@/domain/useCases/userLogin/user-login.use-case";
import { UserLoginUseCase } from "./user-login.use-case";

type SutInstances = {
	sut: UserLoginUseCase;
	service: IUserService;
	UserSpy: IUserLogin.User;
	UserSpyWithoutEmail: IUserLogin.User;
	UserSpyWithoutPassword: IUserLogin.User;
};

const sutFactory = (): SutInstances => {
	const service = new UserInMemoryService();
	const useCase = new UserLoginUseCase(service);

	const UserSpy: IUserLogin.User = {
		email: "xuxa@gmail.com",
		password: "Abcd@123",
	};

	const UserSpyWithoutEmail: IUserLogin.User = {
		email: "", // Invalid email
		password: UserSpy.password,
	};

	const UserSpyWithoutPassword: IUserLogin.User = {
		email: UserSpy.email,
		password: "", // Invalid password
	};

	return {
		sut: useCase,
		service,
		UserSpy,
		UserSpyWithoutEmail,
		UserSpyWithoutPassword,
	};
};

describe("UserLogin", () => {
	test("It should not be possible to login without email and password", async () => {
		const { sut, UserSpyWithoutEmail, UserSpyWithoutPassword } = sutFactory();

		await expect(sut.login(UserSpyWithoutEmail)).rejects.toThrow(
			"Email is required.",
		);
		await expect(sut.login(UserSpyWithoutPassword)).rejects.toThrow(
			"Password is required.",
		);
	});

	test("Should be possible to login with email and password", async () => {
		const { sut, UserSpy } = sutFactory();

		const response = await sut.login(UserSpy);

		expect(response).toEqual({ token: "token-memory" });
	});
});
