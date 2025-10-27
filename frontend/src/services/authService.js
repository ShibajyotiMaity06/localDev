const API_URL = "http://localhost:5000/api/auth"

export async function VerifyToken(token) {
    const res = await fetch(`${API_URL}/verify` , {
        headers : {Authorization : `Bearer ${token}`},
    });
    if (!res.ok) throw new Error("invalid token")

        return res.json()
}

export async function loginUser(credentials) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
}

export async function registerUser(credentials) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) throw new Error("Registration failed");
  return res.json();
}