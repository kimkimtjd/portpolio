import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  is_active: boolean;
  email: string | null;
  name: string | null;
  adminstate:number | null ;
  setAdminState: (value: number) => void;
  message: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  setLogin: (data: {
    email: string;
    name: string;
    is_active:boolean;
    accessToken: string;
    refreshToken: string | null;
  }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  email: null,
  name: null,
  is_active:false,
  message: null,
  accessToken: null,
  adminstate:0,
  refreshToken: null,
  setAdminState: (value) =>
    set({
      adminstate: value,
    }),
  setLogin: (data) =>
    set({
      isLoggedIn: true,
      is_active:data.is_active,
      email: data.email,
      name: data.name,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    }),
  logout: () =>
    set({
      isLoggedIn: false,
      email: null,
      name: null,
      accessToken: null,
      refreshToken: null,
    }),
}));
