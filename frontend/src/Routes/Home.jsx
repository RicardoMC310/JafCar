import { useAuthContext } from '../Context/AuthContext'

const Home = () => {
    const { isLogin } = useAuthContext();

    return (
        <div>
            <h1>Bem-Vindo ao Home {isLogin ? "Logado" : "Não Logado"}</h1>
        </div>
    );
};

export default Home;