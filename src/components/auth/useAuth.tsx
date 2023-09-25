import { createContext, useContext, useState } from "react"
import { supabase } from "../../lib/supabase"
import { useEffect } from "react";
import type { Session, User, AuthResponse, SignInWithPasswordCredentials, AuthError } from "@supabase/supabase-js";

type AuthContext = {
  session: Session | null,
  user: User | null,
  signIn: (credentials: SignInWithPasswordCredentials) => Promise<AuthResponse>
  signOut: () => Promise<{ error: AuthError | null }>
}

const AuthContext = createContext<AuthContext | null>(null);

const useAuth =
  () => {
    const context = useContext(AuthContext)

    if (!context)
      throw new Error("AuthContext::Context is null")

    return context;
  }

const AuthProvider =
  ({ children }: { children: React.ReactElement }) => {

    const [session, setSession] = useState<Session | null>(null)
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {

      async function initSession() {
        const { data: { session } } = await supabase.auth.getSession()

        setSession(session)
        setUser(session?.user ?? null)
      }

      initSession();

      const {
        data: { subscription }
      } = supabase.auth.onAuthStateChange((event, session) => {
        setSession(session)
        console.log("AuthEvent::%s", event)
      })

      return () => subscription.unsubscribe()
    }, [])

    const value = {
      session,
      user,
      signIn: (credentials: SignInWithPasswordCredentials) => supabase.auth.signInWithPassword(credentials),
      signOut: () => supabase.auth.signOut()
    }

    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    )
  }


export { useAuth, AuthProvider }
