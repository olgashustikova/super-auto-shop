import { createContext, useState } from 'react'

export const ShopContext = createContext(null)
export const ShopProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [currentPassword, setCurrentPassword] = useState(null)

  return (
    <ShopContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        currentPassword,
        setCurrentPassword,
      }}
    >
      {children}
    </ShopContext.Provider>
  )
}
