import { create } from "zustand";

const store = (set) => ({
  userInfo: {},
  setUserInfo: (data) => set((store) => ({ userInfo: data })),
  clearUserInfo: (data) => set((store) => ({ userInfo: {} })),

  dealerToken: "",
  setAccessToken: (data) => set((store) => ({ dealerToken: data })),

  updateUserInfo: (key, data) =>
    set((store) => ({ userInfo: { ...store.userInfo, [key]: data } })),
 
  fcmToken: "",
  setFcmToken: (data) => set((store) => ({ fcmToken: data })),
 
  userlocation: "",
  setUserLocation: (data) => set((store) => ({ userlocation: data })),
});

export const useStore = create(store);
