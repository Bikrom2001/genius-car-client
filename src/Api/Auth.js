export const setAuthToken = (user) => {
    const currentUser = {
        email: user.email
    }
    // get jwt token
    fetch('https://y-one-delta.vercel.app/jwt', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(currentUser)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            // local storage 
            localStorage.setItem('genius-token', data.token);
        })
}