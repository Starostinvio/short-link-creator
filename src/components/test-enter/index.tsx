import "./style.css";

function TestEnter() {
  return (
    <div className="TestEnter">
      <div className="TestEnter-title-box">
        <h1 className="TestEnter-title">Вход в профиль</h1>
        <h2 className="TestEnter-subtitle">Введите Ваши данные ниже</h2>
      </div>

      <input type="text" className="TestEnter-name" placeholder="Имя"></input>
      <input
        type="password"
        className="TestEnter-pass"
        placeholder="Пароль"
      ></input>
      <div className="TestEnter-submit-box">
        <button className="TestEnter-submit" type="submit">
          Войти
        </button>
      </div>
    </div>
  );
}

export default TestEnter;
