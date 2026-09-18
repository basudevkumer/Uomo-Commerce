'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/axios';

export default function VerifyEmailPage() {
  const { token } = useParams();
  const router = useRouter();
  const hasSubmitted = useRef(false);
  const [message, setMessage] = useState('Verifying your email...');
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (!token || hasSubmitted.current) return;

    // React Strict Mode-এ development-এর সময় effect দুইবার চলা আটকায়।
    hasSubmitted.current = true;

    api
      .post(`/auth/verify-email/${token}`)
      .then(({ data }) => {
        setMessage(data.message);
        setIsVerified(true);
      })
      .catch((error) => {
        setMessage(error.response?.data?.message || 'Verification failed');
      });
  }, [token]);

  return (
    <section>
      <div className="container pt-43 pb-25 text-center">
        <p className={isVerified ? 'text-green-700' : 'text-second'}>
          {message}
        </p>
        <button
          type="button"
          onClick={() => router.push('/login-register')}
          className="mt-6 underline"
        >
          Go to login
        </button>
      </div>
    </section>
  );
}
