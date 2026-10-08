import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setError(error.message);
    } else {
      navigate('/onboarding');
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <form onSubmit={submit} className="w-full max-w-md bg-white/70 backdrop-blur-md rounded-2xl shadow p-8">
        <h2 className="text-2xl font-bold text-primary mb-6">Create your account</h2>
        {error && <div className="text-red-600 text-sm mb-4">{error}</div>}
        <input className="w-full border rounded-lg p-3 mb-4" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="w-full border rounded-lg p-3 mb-6" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="w-full bg-primary text-white rounded-lg py-3 font-semibold">Start free</button>
      </form>
    </div>
  );
}
