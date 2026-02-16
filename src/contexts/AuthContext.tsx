import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import type { User } from 'firebase/auth';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { auth } from '@/services/firebase'
import { api } from '@/api';

interface AuthContextData {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => any;
  logout: () => Promise<void>
  loading: boolean
}

const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser(user);
      } else {
        delete api.defaults.headers.common['Authorization'];
        setUser(null);
      }
      
      setLoading(false)
    })

    return unsubscribe
  }, [])

  async function login(email: string, password: string) {
    const response = await signInWithEmailAndPassword(auth, email, password)
    return response;
  }

  async function logout() {
    // setUser(null);
    await signOut(auth);
    delete api.defaults.headers.common['Authorization'];
    localStorage.clear();
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
