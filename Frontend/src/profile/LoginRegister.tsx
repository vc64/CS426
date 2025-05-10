import React, { useState } from 'react';
import axios from 'axios';

const LoginRegister: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    userType: 'student'
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const url = isLogin
        ? 'http://localhost:4000/api/auth/login'
        : 'http://localhost:4000/api/auth/register';

      const { data } = await axios.post(url, formData);
      localStorage.setItem('token', data.token);
      alert('Logged in successfully!');
    } catch (err: any) {
      setError(err.response?.data?.msg || 'An error occurred.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {!isLogin && (
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
        )}

        <div style={styles.inputGroup}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        {!isLogin && (
          <div style={styles.inputGroup}>
            <label style={styles.label}>User Type</label>
            <select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="student">Student</option>
              <option value="provider">Provider</option>
            </select>
          </div>
        )}

        <button type="submit" style={styles.button}>
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <p style={{ marginTop: '1rem' }}>
        {isLogin ? 'No account?' : 'Already have an account?'}{' '}
        <button
          type="button"
          onClick={() => setIsLogin(prev => !prev)}
          style={{ ...styles.button, marginLeft: '1rem' }}
        >
          {isLogin ? 'Register here' : 'Login instead'}
        </button>
      </p>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '400px',
    margin: '2rem auto',
    padding: '2rem',
    backgroundColor: '#faf7e5',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    fontFamily: 'sans-serif',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '0.25rem'
  },
  input: {
    padding: '0.5rem',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc'
  },
  select: {
    padding: '0.5rem',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc'
  },
  button: {
    padding: '0.6rem 1.2rem',
    backgroundColor: '#4a773c',
    color: 'white',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer'
  }
};

export default LoginRegister;
