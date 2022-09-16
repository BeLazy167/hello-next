import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
const lockin = () => {
    const { data: session } = useSession();

    if (session) {
        return (
            <>
                <div>Welcome ,{session.user.email}</div>
                <button onClick={() => signOut()}>Sign out</button>
            </>
        );
    } else {
        return (
            <div>
                <button onClick={() => signIn()}>Sign in</button>
            </div>
        );
    }
};

export default lockin;
