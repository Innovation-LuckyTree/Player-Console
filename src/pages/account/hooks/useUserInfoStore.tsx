import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { AccountResponse } from '../models/responses/AccountResponse';

interface UserInfoState {
  userInfo: AccountResponse | null;
  setUserInfo: ( userInfo: AccountResponse) => void;
}

export const useUserInfoStore = create<UserInfoState>()(
  devtools(
    persist(
      (set) => ({
        userInfo: null,
        setUserInfo: (userInfo) =>
          set({ userInfo }, false, 'setUserInfo'),
      }),
      {
        name: 'user-storage',
        partialize: (state) => ({ userInfo: state.userInfo}),
      }
    ),
    { name: 'UserInfoStore' }
  )
);