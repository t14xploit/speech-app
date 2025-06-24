"use client"

import { useState } from "react";
import { Button } from "./ui/button"
import { Loader2, LogOut } from "lucide-react";
import {authClient} from "@/lib/auth-client"
import { useRouter } from "next/navigation";


interface SignOutButtonProps{
    redirectTo?: string;
}


export default function SignOutButton({redirectTo}: SignOutButtonProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    function handleClick(){
        authClient.signOut({
            fetchOptions:{
                onRequest:()=> {
                    setLoading(true)
                },
                onResponse: ()=>{
                    setLoading(false);
                },
                onSuccess: async ()=> {
                    router.push(redirectTo||'/');
                },
                onError:(ctx)=>{
                    alert(ctx.error.message)
                }
            }
        });
        }

    return (
      
    <Button size={"lg"} className="text-black bg-red-500 hover:bg-red-700 cursor-pointer"
    type="button" 
    onClick={handleClick} 
    disabled={loading} 
    > <LogOut/> {loading&& <Loader2 className="animate-spin"/>}</Button>
  )
}
