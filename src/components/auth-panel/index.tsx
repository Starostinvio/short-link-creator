import "./style.css";

interface AuthPanelProps {
  authPage: (page: "login" | "signUp") => void;
  currentPage: "login" | "signUp" | "";
}

function AuthPanel({ authPage, currentPage }: AuthPanelProps) {
  const handleToggle = (page: "login" | "signUp") => {
    authPage(page);
  };

  return (
    <div className="AuthPanel">
      <button
        className={
          currentPage === "login" ? "AuthPanel-login-active" : "AuthPanel-login"
        }
        onClick={() => handleToggle("login")}
      >
        Войти
      </button>
      <button
        className={
          currentPage === "signUp"
            ? "AuthPanel-signUp-active"
            : "AuthPanel-signUp"
        }
        onClick={() => handleToggle("signUp")}
      >
        Создать аккаунт
      </button>
    </div>
  );
}

export default AuthPanel;
