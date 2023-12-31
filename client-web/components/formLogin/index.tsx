'use client'
import {useState} from "react";
import {signIn} from "next-auth/react";

export function FormLogin() {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            try {
                const result = signIn('credentials', {username, password, callbackUrl: '/'})

                console.log(result)
            }catch (e) {
                console.log(e)
            }
    }


    return (
        <form className="px-8 py-6 border border-neutral-800 rounded-3xl bg-neutral-950 flex flex-col gap-3" onSubmit={handleSubmit}>
            <h1 className="text-2xl text-center pt-7 font-bold">Login</h1>
            <div className={"flex flex-col"}>
                <label className={'text-neutral-600 text-xs'}>Usuário</label>
                <input
                    className={"rounded-md h-9 px-2 bg-neutral-900 text-white/80"}
                    onChange={(e) => setUsername(e.target.value)} type="text"

                />
            </div>
            <div className={"flex flex-col"}>
                <label className={'text-neutral-600 text-xs'}>Password</label>
                <input className={"rounded-md h-9 px-2 bg-neutral-900 text-white/80"} onChange={(e) => setPassword(e.target.value)} type="password" />
            </div>
            <button className={' mt-3 px-6 py-2 rounded-3xl border border-gray-800 bg-amber-50/10 hover:bg-amber-50/20 hover:text-white text-white/50 ' } type="submit">Entrar</button>
        </form>
    )
}