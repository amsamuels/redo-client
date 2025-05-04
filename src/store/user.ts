import {create} from "zustand";

export type BackendUser = {
  id: string;
  auth0_sub: string;
  role: string;
  created_at: string;
};

type UserStore = {
  backendUser: BackendUser | null;
  setBackendUser: (user: BackendUser) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  backendUser: null,
  setBackendUser: (user) => set({ backendUser: user }),
}));
