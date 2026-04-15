import { useState, useEffect } from "react"

export default function Search() {
  const [blood, setBlood] = useState("")
  const [location, setLocation] = useState("")
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]

  useEffect(() => {
    const delay = setTimeout(() => {
      if (blood && location.length > 1) {
        fetchDonors()
      } else {
        setResults([])
      }
    }, 400)

    return () => clearTimeout(delay)
  }, [blood, location])

  const fetchDonors = async () => {
    setLoading(true)

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/match-donors?blood_group=${encodeURIComponent(
          blood
        )}&location=${encodeURIComponent(location)}`
      )

      const data = await res.json()
      setResults(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-32 flex flex-col items-center px-6">

      <h1 className="text-4xl mb-6">Find Donors</h1>

      {/* Blood */}
      <div className="flex gap-3 mb-4 flex-wrap">
        {bloodGroups.map(bg => (
          <button
            key={bg}
            onClick={() => setBlood(bg)}
            className={`px-3 py-1 rounded transition ${
              blood === bg
                ? "bg-blue-500 scale-110"
                : "bg-white/10 hover:bg-white/20"
            }`}
          >
            {bg}
          </button>
        ))}
      </div>

      {/* Location */}
      <input
        placeholder="Enter city"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="p-3 bg-white/10 rounded w-80 text-center outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* Status */}
      <div className="mt-4 text-gray-400">
        {loading && "Searching..."}
        {!loading && results.length === 0 && blood && location.length > 1 && (
          "No donors found"
        )}
      </div>

      {/* Results */}
      <div className="mt-8 w-full max-w-2xl space-y-4">
        {results.map(d => (
          <div key={d.id}
            className="p-4 bg-white/10 rounded flex justify-between items-center">

            <div>
              <h3>{d.name}</h3>
              <p className="text-sm text-gray-400">
                {d.location} • Age {d.age}
              </p>
            </div>

            <span className="bg-red-500 px-3 py-1 rounded">
              {d.blood_group}
            </span>
          </div>
        ))}
      </div>

    </div>
  )
}