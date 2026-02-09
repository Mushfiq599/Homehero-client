import Footer from './components/Footer'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar>
      
      </Navbar>

      <div className="p-10 text-center">
        <h1 className="text-4xl font-bold text-indigo-700 mb-4">
          Navbar Test
        </h1>
        <p className="text-xl text-gray-600">
          If you see indigo navbar above → Tailwind is working
        </p>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default App