import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { UserInfoResponse } from '../models/responses/UserInfoResponse';

interface UserInfoState {
  userInfo: UserInfoResponse | null;
  setUserInfo: ( userInfo: UserInfoResponse) => void;
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