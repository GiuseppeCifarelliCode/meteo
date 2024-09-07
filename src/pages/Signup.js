import { useState } from 'react';
import { signup } from '../services/authService';
import { useNavigate } from 'react-router-dom';

function SignUp({onSignUp}) {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault();
        if(user ==='' || password === '') {
            setError("Inserisci correttamente i dati!")
        } else {
            await signup(user, password)
            onSignUp()
            setError('')
            navigate('/')
        }
    }

    return (
        <div>
            <h2>Sign Up</h2>
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
                <button type='submit'>Sign Up</button>
            </form>
            {error && (
                <div><h3>{error}</h3></div>
            )}
        </div>
    )
}

export default SignUp