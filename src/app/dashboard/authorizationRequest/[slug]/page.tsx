import AuthorizationRequest from '@/components/AuthorizationRequest/AuthorizationRequest'
import RequireAuth from '@/hooks/RequireAuth'
import React from 'react'

const authorizationRequest = () => {
  return (
    <>
      <AuthorizationRequest />
    </>
  )
}

export default RequireAuth(authorizationRequest)