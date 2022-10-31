import create from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

const authStore = (set: any) => ({
  userProfile: null,

  addUser: (user: any) => set({ userProfile: user })
});

const useAuthStore = create(
  persist(authStore, {
    name: 'authStore',
  })
);

export default useAuthStore;