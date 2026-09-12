'use client';
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useAuth from '@/features/auth/hooks/useAuth'

const LogOut = () => {
  const router = useRouter(); const { logout, loading, error } = useAuth();
  useEffect(() => { logout().then(() => router.push('/')).catch(() => router.push('/')); }, [logout, router]);
  return <div className="container pt-43 pb-25 text-center">{loading ? 'Logging out...' : error || 'Logged out'}</div>
}

export default LogOut
