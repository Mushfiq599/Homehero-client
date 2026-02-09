export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <p>© {new Date().getFullYear()} HomeHero. All rights reserved.</p>
        <div className="mt-4 space-x-4">
          <a href="https://x.com" className="hover:text-indigo-400">X</a>
          {/* Add other social links */}
        </div>
        <p className="mt-4">Contact: info@homehero.com</p>
      </div>
    </footer>
  );
}