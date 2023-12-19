import Image from 'next/image'
import {getSession} from "@/app/utils/getSession";
import Link from "next/link";

export default async function Home() {

    const session = await getSession()

    return (
        <main className="flex flex-col ">
            <div className="flex flex-col gap-3">
                <h1 className="text-4xl text-center pt-7 font-bold">Teste Autenticação com Cognito e NextJs 14</h1>
                <div className={'flex flex-row justify-center gap-2'}>
                    <Link className={'px-6 py-2 rounded-3xl border border-gray-800 bg-amber-50/10 hover:bg-amber-50/20 hover:text-white text-white/50 ' } href={'/login'}>Login</Link>
                    <Link  className={'px-6 py-2 rounded-3xl border border-gray-800 bg-amber-50/10 hover:bg-amber-50/20 hover:text-white text-white/50 ' } href={'/register'}>Register</Link>
                </div>
                <div className="w-[300px] mx-auto border border-gray-800 rounded-3xl px-6 py-4">
                    <h6 className={'text-gray-500 text-xl text-center'}>Session:</h6>
                    <pre>
                      {JSON.stringify(session, null, 2)}
                    </pre>
                </div>
            </div>

        </main>
    )
}
