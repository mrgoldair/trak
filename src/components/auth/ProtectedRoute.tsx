import { Navigate } from "react-router-dom";
import { useAuth } from './useAuth'

type Props = {
  children: React.ReactElement
}

const ProtectedRoute =
  ({ children }: Props) => {
    const { session } = useAuth();

    return session ? children : <Navigate to="/sign-in" replace />
  }

export default ProtectedRoute
