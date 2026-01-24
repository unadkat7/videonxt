"use client";
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'

function LoginPage() {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result  = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });
        if (result?.ok) {
            router.push('/');
        }
    }

  return <div> 
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>

    <div>
        <button onClick={() => signIn('github')}>Login with GitHub</button>
    </div>
    <div>
        Don't have an account? <a href="/register">Register</a>
    </div>

  </div>

}

export default LoginPage;