export type AuthState = {
  isLoading: boolean;
  isAuthenticated: boolean;
  accessToken: string | null;
};

export type AuthAction =
  | {type: 'LOGIN'; token: string}
  | {type: 'LOGOUT'}
  | {type: 'RESTORE_TOKEN'; token: string | null};

export type AuthContextType = {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
};
