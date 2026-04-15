import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Layout from "./components/Layout"

import Dashboard from "./pages/Dashboard"
import AddDonor from "./pages/AddDonor"
import DonorList from "./pages/DonorList"
import Search from "./pages/Search"
import Login from "./pages/Login"
import Register from "./pages/Register"

export default function App() {
  return (
    <Router>

      {/* 🔥 GLOBAL LAYOUT */}
      <Layout>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddDonor />} />
          <Route path="/list" element={<DonorList />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>

      </Layout>

    </Router>
  )
}