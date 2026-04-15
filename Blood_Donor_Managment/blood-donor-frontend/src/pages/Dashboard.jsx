import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { Heart, Users, Search, Activity, AlertTriangle } from "lucide-react"
import { useEffect, useState } from "react"

export default function Dashboard() {
  const navigate = useNavigate()
  const isLoggedIn = !!localStorage.getItem("token")

  const [stats, setStats] = useState({
    total_donors: 0,
    lives_impacted: 0,
    availability: "24/7"
  })

  const [recent, setRecent] = useState([])

  const go = (path) => {
    if (!isLoggedIn) navigate("/login")
    else navigate(path)
  }

  useEffect(() => {
    fetch("http://127.0.0.1:8000/stats")
      .then(res => res.json())
      .then(data => setStats(data))

    fetch("http://127.0.0.1:8000/donors")
      .then(res => res.json())
      .then(data => setRecent(data.slice(0, 5)))
  }, [])

  return (
    <div className="min-h-screen text-white px-6 pt-32 flex flex-col items-center">

      {/* 🔥 GREETING */}
      <h1 className="text-4xl font-bold text-center">
        Welcome Back 👋
      </h1>

      <p className="text-gray-400 mt-2 text-center">
        Every drop counts. Let’s save lives today.
      </p>

      {/* 🔥 EMERGENCY BANNER */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-8 w-full max-w-4xl bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center gap-3"
      >
        <AlertTriangle className="text-red-400" />
        <p className="text-sm">
          Urgent need for <b>O- donors</b> in Uttarpradesh. Please help if you can.
        </p>
      </motion.div>

      {/* 🔥 STATS */}
      <div className="mt-10 grid grid-cols-3 gap-8 text-center">

        <div className="glass p-4">
          <Users className="mx-auto mb-2 text-blue-400" />
          <h2 className="text-2xl font-bold">{stats.total_donors}</h2>
          <p className="text-gray-400 text-sm">Donors</p>
        </div>

        <div className="glass p-4">
          <Activity className="mx-auto mb-2 text-green-400" />
          <h2 className="text-2xl font-bold">{stats.lives_impacted}</h2>
          <p className="text-gray-400 text-sm">Lives Impacted</p>
        </div>

        <div className="glass p-4">
          <Heart className="mx-auto mb-2 text-red-400" />
          <h2 className="text-2xl font-bold">{stats.availability}</h2>
          <p className="text-gray-400 text-sm">Availability</p>
        </div>

      </div>

      {/* 🔥 QUICK ACTIONS */}
      <div className="mt-12 grid md:grid-cols-3 gap-6 w-full max-w-5xl">

        <div
          onClick={() => go("/add")}
          className="glass p-6 cursor-pointer hover:scale-105 transition"
        >
          <Heart className="mb-2 text-red-400" />
          <h3 className="font-semibold">Become Donor</h3>
          <p className="text-sm text-gray-400">Register yourself</p>
        </div>

        <div
          onClick={() => go("/list")}
          className="glass p-6 cursor-pointer hover:scale-105 transition"
        >
          <Users className="mb-2 text-blue-400" />
          <h3 className="font-semibold">View Donors</h3>
          <p className="text-sm text-gray-400">Browse all donors</p>
        </div>

        <div
          onClick={() => go("/search")}
          className="glass p-6 cursor-pointer hover:scale-105 transition"
        >
          <Search className="mb-2 text-cyan-400" />
          <h3 className="font-semibold">Search Donors</h3>
          <p className="text-sm text-gray-400">Find instantly</p>
        </div>

      </div>

      {/* 🔥 RECENT DONORS */}
      <div className="mt-14 w-full max-w-4xl">

        <h2 className="text-xl font-bold mb-4">Recent Donors</h2>

        <div className="space-y-3">
          {recent.map((d) => (
            <div
              key={d.id}
              className="glass p-4 flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{d.name}</h3>
                <p className="text-sm text-gray-400">
                  {d.location}
                </p>
              </div>

              <span className="bg-red-500 px-3 py-1 rounded-full text-sm">
                {d.blood_group}
              </span>
            </div>
          ))}
        </div>

      </div>

    </div>
  )
}