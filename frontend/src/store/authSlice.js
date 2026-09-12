import { create } from 'zustand'
const useAuthStore = create(
  (set) => ({
      user: null,
      accessToken: null,
      setAuth: ({ user, accessToken }) => set({ user, accessToken }),
      setUser: (user) => set({ user }),
      setAccessToken: (accessToken) => set({ accessToken }),
      clearUser: () => set({ user: null, accessToken: null }),
    })
)

export const useLoginModalStore = create((set) => ({
  showLoginModal: false,
  openLoginModal: () => set({ showLoginModal: true }),
  closeLoginModal: () => set({ showLoginModal: false }),
}))

export default useAuthStore
