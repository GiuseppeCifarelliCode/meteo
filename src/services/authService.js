export const signup = async(user, password) => {
     const response = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json'},
        body: JSON.stringify({user, password, favorites:[]})
    })

    const data = await response.json()
    localStorage.setItem('id', data.id)
}

export const login = async(username, password) => {
    const response = await fetch('http://localhost:3001/users')

    const users = await response.json()
    const loggeduser = users.find(u => u.user === username && u.password === password)
    
    if(loggeduser) {
        localStorage.setItem('id',loggeduser.id)
        return {success: true, message: 'Login succesfull', favorites: loggeduser.favorites}
    } else {
        return {success:false, message: 'Username or password incorrect'}
    }
}

export const getUserFavorites = async(userId) => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: 'GET',
        headers: {'Content-Type' : 'application/json'}
    })

    const data = await response.json()
    return data.favorites
}

export const updateFavorites = async(userId, favorites) => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: 'PATCH',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({favorites})
    })

    const data = await response.json()
    return data
}
