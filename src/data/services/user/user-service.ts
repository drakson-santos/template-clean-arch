import type { IUserService } from "@/domain/services/user/user-services";

export class UserService implements IUserService {
	async loginBy(email: string, password: string): Promise<void> {
		if (!email) throw new Error("Email is required.");
		if (!password) throw new Error("Password is required.");
		throw new Error("Method not implemented.");
	}
}
