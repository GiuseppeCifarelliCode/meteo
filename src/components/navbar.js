import {Link} from 'react-router-dom'
import './navbar.css'

function Navbar({isAuthenticated, onLogout}) {
    
    return (
        <nav>
            <h1>Meteo React</h1>
            <Link to='/'>Home</Link>
            <div>
                {isAuthenticated ? (
                    <div className='navbar'>
                        <Link className='nav-items' to='/favorites'>Favorites</Link>
                        <button className='nav-items logoutBtn' onClick={onLogout}>Logout</button>
                    </div>
                ) : (
                    <div>
                        <Link className='nav-items' to='/signup'>Sign Up</Link>
                        <Link className='nav-items' to='/login'>Login</Link>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar;