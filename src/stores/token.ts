import { defineStore } from 'pinia'

import { getStorageItem } from './utils'

interface TokenState {
  token: string | null
  tokenType: string | null
}

export const useTokenStore = defineStore({
  id: 'token',
  state: (): TokenState => ({
    token: getStorageItem<string>('token', null),
    tokenType: getStorageItem<string>('tokenType', null),
  }),
  getters: {
    isAuthenticated: (state: TokenState) => state.token != null,
  },
  actions: {
    clearData() {
      // TODO: implement this action
    },
  },
})
