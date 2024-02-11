import { useRouter } from 'next/router';
import { Login } from 'src/components/Login';
import { routeMap } from 'src/util/routeMap';
import { SignUp } from '../components/SignUp';

const LoginPage = () => {
  const router = useRouter();

  const onLoginSuccess = async () => {
    await router.push(routeMap.dashboard);
  };

  return(
    <>
      <Login onLoginSuccess={onLoginSuccess} />
      <SignUp onLoginSuccess={onLoginSuccess} />
      <p className="tr-copyright">Copyright(C) tretter. welcome to new world!!</p>
    </>
  );
};

export default LoginPage;
