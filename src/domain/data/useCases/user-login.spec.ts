import type { IUserLogin } from "@/domain/useCases/IUserLogin";

class UserLogin {
	constructor(private readonly userService: IUserService) {}

	loginBy(user: IUserLogin.User): Promise<void> {
		return this.userService.loginBy(user.email, user.password);
	}
}

interface IUserService {
	loginBy(email: string, password: string): Promise<void>;
}

class UserService implements IUserService {
	async loginBy(email: string, password: string): Promise<void> {
		if (!email) throw new Error("Email is required.");
		if (!password) throw new Error("Password is required.");
		throw new Error("Method not implemented.");
	}
}

type SutInstances = {
	sut: UserLogin;
	service: IUserService;
	UserSpyWithoutEmail: IUserLogin.User;
	UserSpyWithoutPassword: IUserLogin.User;
};

const sutFactory = (): SutInstances => {
	const service = new UserService();
	const sut = new UserLogin(service);

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
