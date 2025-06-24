import { SignUp } from "@/components/SignUp"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation";
import { headers } from "next/headers";
export default async function SignUpPage() {
 const session = await auth.api.getSession({
    headers: await headers(),
 });
 
 console.log(session?.user);
 if(session){
    redirect("/");
 }
    return (
    <div className="flex items-center justify-center min-h-screen">
    <SignUp/>
    </div>
  )
}
