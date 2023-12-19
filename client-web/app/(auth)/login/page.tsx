import {FormLogin} from "@/components/formLogin";
import {SessionContext} from "next-auth/react";

export default function Page() {
  return (
    <div>
        <section className="flex flex-col items-center justify-center min-h-screen py-2">
            <FormLogin />
        </section>

    </div>
  );
}