import { useState } from "react"

export default function AddDonor() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    blood_group: "",
    location: "",
    last_donation_date: ""
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await fetch("http://127.0.0.1:8000/donor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        age: parseInt(form.age)
      })
    })

    setForm({
      name: "",
      age: "",
      blood_group: "",
      location: "",
      last_donation_date: ""
    })
  }

  return (
    <div className="pt-32 flex justify-center px-4">

      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-2xl shadow-xl">

        <h2 className="text-3xl font-semibold text-center mb-10">
          Add Donor
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name */}
          <div>
            <label className="label">Full Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="input"
              placeholder="Enter name"
              required
            />
          </div>

          {/* Row */}
          <div className="grid grid-cols-2 gap-6">

            <div>
              <label className="label">Age</label>
              <input
                type="number"
                name="age"
                value={form.age}
                onChange={handleChange}
                className="input"
                placeholder="Age"
                required
              />
            </div>

            <div>
              <label className="label">Blood Group</label>
              <select
                name="blood_group"
                value={form.blood_group}
                onChange={handleChange}
                className="input"
                required
              >
                <option value="">Select</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>O+</option>
                <option>O-</option>
                <option>AB+</option>
                <option>AB-</option>
              </select>
            </div>

          </div>

          {/* Location */}
          <div>
            <label className="label">Location</label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              className="input"
              placeholder="City"
              required
            />
          </div>

          {/* Date */}
          <div>
            <label className="label">Last Donation Date</label>
            <input
              type="date"
              name="last_donation_date"
              value={form.last_donation_date}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          {/* Button */}
          <button className="btn-primary w-full text-lg mt-4">
            Submit Donor
          </button>

        </form>
      </div>
    </div>
  )
}