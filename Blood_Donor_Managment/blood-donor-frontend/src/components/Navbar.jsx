import { Link, useLocation, useNavigate } from "react-router-dom"

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()

  const isLoggedIn = !!localStorage.getItem("token")

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  const linkClass = (path) =>
    `px-4 py-2 rounded-full transition-all duration-300 ${
      location.pathname === path
        ? "bg-white/20 text-white"
        : "text-gray-300 hover:text-white hover:bg-white/10"
    }`

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">

      <div className="flex items-center gap-2 px-3 py-2 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 shadow-lg">

        <Link to="/" className={linkClass("/")}>Dashboard</Link>

        {isLoggedIn && (
          <>
            <Link to="/add" className={linkClass("/add")}>Add</Link>
            <Link to="/list" className={linkClass("/list")}>List</Link>
            <Link to="/search" className={linkClass("/search")}>Search</Link>
          </>
        )}

        {/* 🔥 CONDITIONAL BUTTON */}
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-full text-red-400 hover:bg-red-500/20 transition"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className={linkClass("/login")}>Login</Link>
            <Link to="/register" className={linkClass("/register")}>Register</Link>
          </>
        )}

      </div>
    </div>
  )
}