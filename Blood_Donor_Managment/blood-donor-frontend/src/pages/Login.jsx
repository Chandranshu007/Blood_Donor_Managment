import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" })
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        setMessage(data.detail)
      } else {
        localStorage.setItem("token", data.access_token)
        navigate("/")
      }
    } catch {
      setMessage("Server error")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="glass w-full max-w-md p-8">

        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="input"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="input"
            required
          />

          <button className="btn-primary w-full">Login</button>

          {message && <p className="text-center text-red-400">{message}</p>}
        </form>

        <p className="text-center mt-4 text-gray-300">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Register
          </Link>
        </p>

      </div>
    </div>
  )
}