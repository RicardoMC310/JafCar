import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../../Context/AuthContext';

export default function PrivateRoute({ children }) {
    const { isLogin } = useAuthContext();

    if (!isLogin) {
        return <Navigate to="/login" replace />;
    }

    return children;
}