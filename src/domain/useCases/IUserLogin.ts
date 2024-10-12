export interface IUserLogin {
	loginBy: (params: IUserLogin.Params) => Promise<void>;
}

namespace IUserLogin {
	export type Params = {
		email: string;
		password: string;
	};
}
