'use client'

import cognitoConfirmRegister from "@/app/utils/cognitoConfirmRegister";
import {useState} from "react";
import {useRouter} from "next/navigation"
import cognitoResendConfirmCode from "@/app/utils/cognitoResendConfirmCode";

export const ConfirmRegister = (username: string) => {
    const [code, setCode] = useState<string>('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const result = await cognitoConfirmRegister({username, code})
            console.log(result)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <form className="px-8 py-6 border border-neutral-800 rounded-3xl bg-neutral-950 flex flex-col gap-3"
                  onSubmit={handleSubmit}>
                <h1 className="text-2xl text-center pt-7 font-bold">Digite o Codigo</h1>
                <p className="text-center text-neutral-600 text-xs">Verifique seu email</p>

                <div className={"flex flex-col"}>
                    <label className={'text-neutral-600 text-xs'}>Code</label>
                    <input
                        maxLength={6}
                        minLength={6}
                        className={" text-center rounded-md h-9 px-2 bg-neutral-900 text-white/80 tracking-[12px]"}
                        onChange={(e) => setCode(e.target.value)} type="text"

                    />
                </div>

                <button
                    className={' mt-3 px-6 py-2 rounded-3xl border border-gray-800 bg-amber-50/10 hover:bg-amber-50/20 hover:text-white text-white/50 '}
                    type="submit">Entrar
                </button>

                <button onClick={() => cognitoResendConfirmCode} className={'text-right text-neutral-600 text-xs hover:text-neutral-500 hover:underline underline-offset-4 '}>Reenviar o codigo por e-mail</button>
                <button onClick={()=> router.push('/')}  className={'text-right text-neutral-600 text-xs hover:text-neutral-500 hover:underline underline-offset-4 '}>Voltar para a página inicial</button>
            </form>

        </div>
    )
}