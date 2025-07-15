
// LOGIN
if (document.getElementById('loginForm')) {
  document.getElementById('loginForm').addEventListener('submit', async e => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    alert(data.message);

    if (res.ok) {
      localStorage.setItem('token', data.token);
      window.location.href = "home.html";
    }
  });
}

// SIGNUP
if (document.getElementById('signupForm')) {
  document.getElementById('signupForm').addEventListener('submit', async e => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });

    const data = await res.json();
    alert(data.message);
    if (res.ok) window.location.href = "index.html";
  });
}
