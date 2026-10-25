import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from './auth/AuthContext.jsx';

const API = '/api'; // proxied to http://localhost:4000 (see vite.config.js)

export default function App() {
  const { token /* , login, logout */ } = useAuth();

  if (!token) return <LoginForm />;
  return <Dashboard />;
}

// ── Login form (Exp 4 — React Hook Form) ──
function LoginForm() {
  const { login } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();

  async function onSubmit(data) {
    // TODO: POST data to `${API}/login`; on success call login(token) from useAuth().
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>MoodBoard — Login</h2>
      <input placeholder="username" {...register('username', { required: true })} />
      {errors.username && <span>username required</span>}
      <input type="password" placeholder="password" {...register('password', { required: true })} />
      {errors.password && <span>password required</span>}
      <button type="submit">Log in</button>
    </form>
  );
}

// ── Dashboard: upload form + list ──
function Dashboard() {
  const { token, logout } = useAuth();
  const { register, handleSubmit } = useForm();
  const [files, setFiles] = useState([]);

  async function loadFiles() {
    // TODO: GET `${API}/files` with Authorization: Bearer ${token}; setFiles(result).
  }

  useEffect(() => { loadFiles(); }, []);

  async function onUpload(data) {
    // TODO: build FormData with data.file[0] under "file", POST to `${API}/upload`
    //       with the Bearer token, then reload the list.
  }

  return (
    <div>
      <h2>MoodBoard</h2>
      <button onClick={logout}>Log out</button>
      <form onSubmit={handleSubmit(onUpload)}>
        <input type="file" {...register('file', { required: true })} />
        <button type="submit">Upload photo</button>
      </form>
      <ul>
        {files.map((f) => <li key={f.filename}>{f.originalname} ({f.size} bytes)</li>)}
      </ul>
    </div>
  );
}
