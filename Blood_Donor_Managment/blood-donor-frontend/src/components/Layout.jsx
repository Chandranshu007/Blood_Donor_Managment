import Navbar from "./Navbar"

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col items-center">

      <Navbar />

      {/* 🔥 THIS CONTROLS ALL PAGE ALIGNMENT */}
      <main className="w-full flex flex-col items-center">
        {children}
      </main>

    </div>
  )
}