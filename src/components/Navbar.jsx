
export default function Navbar() {
    return (
        <nav className="bg-indigo-700 text-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 md:h-20">

                    {/* Logo */}
                    <div className="text-2xl md:text-3xl font-bold tracking-tight">
                        HomeHero
                    </div>

                    {/* Desktop links */}
                    <div className="hidden md:flex items-center space-x-10">
                        <a href="#" className="hover:text-indigo-200 transition font-medium">
                            Home
                        </a>
                        <a href="#" className="hover:text-indigo-200 transition font-medium">
                            Services
                        </a>
                        <a href="#" className="hover:text-indigo-200 transition font-medium">
                            About
                        </a>
                        <a href="#" className="hover:text-indigo-200 transition font-medium">
                            Contact
                        </a>

                        {/* Auth buttons */}
                        <div className="flex items-center space-x-4">
                            <a
                                href="#"
                                className="px-5 py-2 bg-white text-indigo-700 font-medium rounded-lg hover:bg-indigo-100 transition shadow-sm"
                            >
                                Login
                            </a>
                            <a
                                href="#"
                                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-800 text-white font-medium rounded-lg transition shadow-sm"
                            >
                                Register
                            </a>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button className="text-white focus:outline-none">
                            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>

                </div>
            </div>
        </nav>
    )
}