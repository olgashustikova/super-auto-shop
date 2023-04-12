import { createContext, useState } from 'react'

import { Buffer } from 'buffer'

// in the shop context i keep current username, password and current error
export const ShopContext = createContext(null)
export const ShopProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [currentPassword, setCurrentPassword] = useState(null)
  const [error, setError] = useState('')

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
        error,
        setError,
      }}
    >
      {children}
    </ShopContext.Provider>
  )
}
