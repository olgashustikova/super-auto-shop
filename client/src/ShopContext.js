import { createContext, useState } from 'react'

import { Buffer } from 'buffer'

export const ShopContext = createContext(null)
export const ShopProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [currentPassword, setCurrentPassword] = useState(null)

  const prepareBasicHeader = () => {
    const encodedCredentials = Buffer.from(
      `${currentUser}:${currentPassword}`
    ).toString('base64')
    return `Basic ${encodedCredentials}`
  }

  return (
    <ShopContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        currentPassword,
        setCurrentPassword,
        prepareBasicHeader,
      }}
    >
      {children}
    </ShopContext.Provider>
  )
}
