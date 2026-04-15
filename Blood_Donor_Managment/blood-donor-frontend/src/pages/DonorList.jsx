import { useEffect, useState } from "react"

export default function DonorList() {
  const [donors, setDonors] = useState([])

  const fetchData = () => {
    fetch("http://127.0.0.1:8000/donors")
      .then(res => res.json())
      .then(data => setDonors(data))
  }

  useEffect(() => {
    fetchData()
  }, [])

  const deleteDonor = async (id) => {
    await fetch(`http://127.0.0.1:8000/donor/${id}`, {
      method: "DELETE"
    })
    fetchData()
  }

  return (
    <div className="pt-32 w-full flex justify-center">

      {/* 🔥 THIS WRAPPER CENTERS EVERYTHING */}
      <div className="w-full max-w-4xl">

        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Donor List
        </h2>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-lg">

          <table className="w-full text-left text-white">
            <thead className="bg-white/10">
              <tr>
                <th className="p-4">Name</th>
                <th>Age</th>
                <th>Blood</th>
                <th>Location</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {donors.map((d) => (
                <tr key={d.id} className="border-t border-white/10">
                  <td className="p-4">{d.name}</td>
                  <td>{d.age}</td>
                  <td>{d.blood_group}</td>
                  <td>{d.location}</td>
                  <td>
                    <button
                      onClick={() => deleteDonor(d.id)}
                      className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  )
}