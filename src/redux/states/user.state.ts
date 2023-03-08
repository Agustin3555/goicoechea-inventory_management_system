import { LocalStorageEntities, User, UserRole } from '@/models'
import { LocalStorageEntity } from '@/tools'
import { createSlice } from '@reduxjs/toolkit'

const userEntity = new LocalStorageEntity<User>(LocalStorageEntities.USER)
const tokenEntity = new LocalStorageEntity<string>(LocalStorageEntities.TOKEN)

const userEmptyState: User = {
  id: 0,
  name: '',
  lastName: null,
  email: '',
  role: UserRole.EMPLOYEE,
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
