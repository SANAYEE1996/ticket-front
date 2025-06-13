import { Button } from '../../shared/ui/button';
import { Card } from '../../shared/ui/card';
import styles from './styles.module.css';

const LoginPage = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}auth/v1/google`;
  };

  const handleNaverLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}auth/v1/naver`;
  };

  const handleKakaoLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}auth/v1/kakao`;
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <h1 className={styles.title}>로그인</h1>
        <div className={styles.buttonGroup}>
          <Button
            variant="outline"
            className={styles.googleButton}
            onClick={handleGoogleLogin}
          >
            Google로 계속하기
          </Button>
          <Button
            variant="outline"
            className={styles.naverButton}
            onClick={handleNaverLogin}
          >
            네이버로 계속하기
          </Button>
          <Button
            variant="outline"
            className={styles.kakaoButton}
            onClick={handleKakaoLogin}
          >
            카카오로 계속하기
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
