import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({onLogin}) {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault();
        if(user ==='' || password === '') {
            setError("Inserisci correttamente i dati!")
        } else {
            onLogin(user,password);
            setError('')
            navigate('/')
        }
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder='username'
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    required
                />
                <input
                    type='password'
                    placeholder='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type='submit'>Login</button>
            </form>
            {error && (
                <div><h3>{error}</h3></div>
            )}
        </div>
    )
}

export default Login