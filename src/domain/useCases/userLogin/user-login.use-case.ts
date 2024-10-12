export interface IUserLogin {
	loginBy: (user: IUserLogin.User) => Promise<IUserLogin.Response>;
}

export namespace IUserLogin {
	export type User = {
		email: string;
		password: string;
	};

	export type Response = {
		token: string;
	};
}
