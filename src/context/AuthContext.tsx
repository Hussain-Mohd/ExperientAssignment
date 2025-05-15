// src/context/AuthContext.tsx
import React, {createContext, useReducer, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {username: string; [key: string]: any};

type AuthState = {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: User | null;
};

type AuthAction =
  | {type: 'LOGIN'; payload: {user: User}}
  | {type: 'LOGOUT'}
  | {type: 'RESTORE_TOKEN'; payload: {user: User | null}};

const initialState: AuthState = {
  isLoading: true,
  isAuthenticated: false,
  user: null,
};

export const AuthContext = createContext<{
  state: AuthState;
  login: (user: User) => Promise<void>;
  logout: () => Promise<void>;
}>({
  state: initialState,
  login: async () => {},
  logout: async () => {},
});

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN':
      return {...state, isAuthenticated: true, user: action.payload.user};
    case 'LOGOUT':
      return {...state, isAuthenticated: false, user: null};
    case 'RESTORE_TOKEN':
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: !!action.payload.user,
        isLoading: false,
      };
    default:
      return state;
  }
}

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const userData = await AsyncStorage.getItem('user');

        console.log('▶️ Access Token on app launch:', accessToken);

        dispatch({
          type: 'RESTORE_TOKEN',
          payload: {user: userData ? JSON.parse(userData) : null},
        });
      } catch (e) {
        console.log('Failed to restore session:', e);
        dispatch({type: 'RESTORE_TOKEN', payload: {user: null}});
      }
    };

    bootstrapAsync();
  }, []);

  const login = async (user: User) => {
    await AsyncStorage.setItem('user', JSON.stringify(user));
    dispatch({type: 'LOGIN', payload: {user}});
  };

  const logout = async () => {
    await AsyncStorage.clear();
    dispatch({type: 'LOGOUT'});
  };

  return (
    <AuthContext.Provider value={{state, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};
