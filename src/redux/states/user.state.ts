import { UserModels } from '@/models'
import { tokenEntity, userEntity } from '@/services'
import { createSlice } from '@reduxjs/toolkit'

const userEmptyState: UserModels.FullData = {
  id: 0,
  name: '',
  lastName: null,
  email: '',
  role: UserModels.ROLE.employee,
  createdAt: '',
  updatedAt: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState: (() => {
    const user = userEntity.get()

    return user ? user : userEmptyState
  })(),
  reducers: {
    createUser: (state, action) => {
      const { payload } = action

      userEntity.set(payload)
      return payload
    },

    updateUser: (state, action) => {
      const newUser = { ...state, ...action.payload }

      userEntity.set(newUser)
      return newUser
    },

    resetUser: () => {
      tokenEntity.delete()
      userEntity.delete()
      return userEmptyState
    },
  },
})

export const { createUser, updateUser, resetUser } = userSlice.actions

export default userSlice.reducer
