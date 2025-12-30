export interface IAuthContext {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  getToken: () => string | null;
  getCount: () => number;
}

/**
 isAuthenticated,
      login,
      logout,
      loading,
      getToken: () => token,
			count
*/
