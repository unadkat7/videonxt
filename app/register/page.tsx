"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function RegisterPage() {

    const [username, setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmpassword,setConfirmPassword] = useState("");

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(password!==confirmpassword){
            alert("passwords do not match!");
            return
        }

        try {
            const res = await fetch("/api/auth/register",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({username,email,password})
            });

            if(!res.ok){
                throw new Error("Failed to register");
            }

            const data = await res.json();

            console.log("Registration successful:",data);
            router.push("/login");

        } catch (error) {
            alert("An error occurred during registration");
            console.error("Registration error:",error);
        }

    }
 
  return <div>
    <h1>Register</h1>
    <form onSubmit={handleSubmit}>
        <div>
            <label>Username:</label>
            <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} required />
        </div>
        <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        </div>
        <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
        </div>
        <div>
            <label>Confirm Password:</label>
            <input type="password" value={confirmpassword} onChange={(e)=>setConfirmPassword(e.target.value)} required />
        </div>
        <button type="submit">Register</button>
    </form>
    <div>
        Already have an account? <a href="/login">Login here</a>
    </div>
  </div>
  
}

export default RegisterPage