import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const history = useHistory();

  const [userEmail, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValited] = useState(true);

  useEffect(() => {
    const minLength = 6;
    const passwordValidat = password.length > minLength;
    const emailValidat = userEmail.match(/^[a-z0-9._+-]+@[a-zA-Z0-9]+.[a-zA-Z]{2,6}$/);

    if (passwordValidat && emailValidat) {
      setValited(false);
    } else {
      setValited(true);
    }
  }, [userEmail, password]);

  const handleClick = () => {
    const obj = { email: userEmail };
    localStorage.setItem('user', JSON.stringify(obj));
    history.push('/meals');
  };

  return (
    <form>
      <label htmlFor="email">
        <input
          type="email"
          name="email"
          id="email"
          data-testid="email-input"
          placeholder="Email"
          value={ userEmail }
          onChange={ ({ target }) => setEmail(target.value) }
        />
      </label>
      <label>
        <input
          type="password"
          name="password"
          id="password"
          data-testid="password-input"
          placeholder="Password"
          value={ password }
          onChange={ ({ target }) => setPassword(target.value) }
        />
      </label>
      <button
        type="submit"
        data-testid="login-submit-btn"
        disabled={ validated }
        onClick={ () => handleClick() }
      >
        Enter
      </button>
    </form>
  );
}

export default Login;
