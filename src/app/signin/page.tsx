// import { auth } from "@/lib/auth"
// import { redirect } from "next/navigation";
// import { headers } from "next/headers";
import SignIn from "@/components/SignIn";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Bell, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default async function SignInPage() {
  // const session = await auth.api.getSession({
  //   headers: await headers(),
  // });
  // console.log("Session on sign-in page:", session);
  // if (session) {
  //   console.log("Session found:", session);  
  //   redirect("/"); 
  // }
  
    return (
    <div className="mt-8 flex flex-col items-center justify-center">
            <SignIn/>
            <div className="mt-4 w-sm">
            <Alert>
              <AlertTitle className="flex ">
                <Bell className="mr-2" />
                Reminder:
              </AlertTitle>
              <AlertDescription className="flex items-center justify-between">
                Don&apos;t have an account?{" "}
                <Button asChild  >
                  <Link href="/sign-up">
                  Create one <ExternalLink />
                  </Link>
                </Button>
              </AlertDescription>
            </Alert>
          </div>
            </div>
  )
}
