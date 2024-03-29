import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    pages: {
        signIn: "../../../components/SignIn",
    },
    secret: process.env.JWT_SECRET,
    callbacks: {
        async redirect() {
            return "/";
        },
    },
});
