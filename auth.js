// Registration logic
if (document.getElementById('registerForm')) {
    document.getElementById('registerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('regName').value.trim();
        const email = document.getElementById('regEmail').value.trim();
        const password = document.getElementById('regPassword').value;
        const phone = document.getElementById('regPhone').value.trim();
        const address = document.getElementById('regAddress') ? document.getElementById('regAddress').value.trim() : '';
        let users = JSON.parse(localStorage.getItem('users') || '{}');
        if (users[email]) {
            document.getElementById('regMessage').textContent = 'Email already registered.';
            return;
        }
        users[email] = { password, name, phone, address };
        localStorage.setItem('users', JSON.stringify(users));
        document.getElementById('regMessage').textContent = 'Registration completed! Redirecting to login...';
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
    });
    // Google/Microsoft demo register
    document.getElementById('googleRegBtn').onclick = function() {
        const email = 'demo.google@gmail.com';
        let users = JSON.parse(localStorage.getItem('users') || '{}');
        users[email] = { password: '', name: 'Google User', phone: '9999999999', address: 'Googleplex, CA', profileImg: 'https://ui-avatars.com/api/?name=G+U&background=ea4335&color=fff' };
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('loggedInUser', email);
        window.location.href = 'index.html';
    };
    document.getElementById('microsoftRegBtn').onclick = function() {
        const email = 'demo.microsoft@outlook.com';
        let users = JSON.parse(localStorage.getItem('users') || '{}');
        users[email] = { password: '', name: 'Microsoft User', phone: '8888888888', address: 'Microsoft Redmond, WA', profileImg: 'https://ui-avatars.com/api/?name=M+U&background=0078d4&color=fff' };
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('loggedInUser', email);
        window.location.href = 'index.html';
    };
}

// Login logic
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;
        let users = JSON.parse(localStorage.getItem('users') || '{}');
        if (users[email] && users[email].password === password) {
            localStorage.setItem('loggedInUser', email);
            document.getElementById('loginMessage').textContent = 'Login successful! Redirecting...';
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } else {
            document.getElementById('loginMessage').textContent = 'Invalid email or password.';
        }
    });
}

// Add similar demo login logic for login.html
if (document.getElementById('googleLoginBtn')) {
    document.getElementById('googleLoginBtn').onclick = function() {
        const email = 'demo.google@gmail.com';
        let users = JSON.parse(localStorage.getItem('users') || '{}');
        users[email] = { password: '', name: 'Google User', phone: '9999999999', address: 'Googleplex, CA', profileImg: 'https://ui-avatars.com/api/?name=G+U&background=ea4335&color=fff' };
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('loggedInUser', email);
        window.location.href = 'index.html';
    };
}
if (document.getElementById('microsoftLoginBtn')) {
    document.getElementById('microsoftLoginBtn').onclick = function() {
        const email = 'demo.microsoft@outlook.com';
        let users = JSON.parse(localStorage.getItem('users') || '{}');
        users[email] = { password: '', name: 'Microsoft User', phone: '8888888888', address: 'Microsoft Redmond, WA', profileImg: 'https://ui-avatars.com/api/?name=M+U&background=0078d4&color=fff' };
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('loggedInUser', email);
        window.location.href = 'index.html';
    };
}

// Logout function (can be called from index.html)
function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'login.html';
}

// Optionally, you can check login status on index.html and show a logout button 