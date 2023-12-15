'use client'
import {useState} from "react";

export function FormLogin() {
    const [user, setUser] = useState<string>('')
    const [pass, setPass] = useState<string>('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            console.log(e)
    }


    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Usuário</label>
                <input onChange={(e) => setUser(e.target.value)} type="text" />
            </div>
            <div>
                <label>Password</label>
                <input onChange={(e) => setPass(e.target.value)} type="password" />
            </div>
            <button type="submit">Entrar</button>
        </form>
    )
}