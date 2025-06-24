import {betterAuth} from "better-auth";
import {prismaAdapter} from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import {prisma} from "@/lib/prisma";
import { admin } from "better-auth/plugins"

export const auth = betterAuth({
database: prismaAdapter(prisma, {
    provider:"postgresql",
}),
emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    minPasswordLength: 6,
    sendEmailVerificationOnSignUp: false,
},
secret: process.env.BETTER_AUTH_SECRET || "your-secret-key-here",
baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
plugins:[
    nextCookies(),
    admin(),
]
});
 