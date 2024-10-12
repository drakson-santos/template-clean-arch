export interface IUserLogin {
	loginBy: (user: IUserLogin.User) => Promise<void>;
}

export namespace IUserLogin {
	export type User = {
		email: string;
		password: string;
	};
}
