export default function Footer() {
  return (
    <footer className="border-t bg-base-100">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 className="font-bold text-lg">HomeHero</h3>
          <p className="text-sm opacity-70 mt-2">
            Find trusted local household services and book instantly.
          </p>
        </div>

        <div>
          <h4 className="font-semibold">Quick Links</h4>
          <ul className="mt-2 space-y-1 text-sm opacity-80">
            <li>Home</li>
            <li>Services</li>
            <li>My Bookings</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold">Contact</h4>
          <p className="text-sm opacity-70 mt-2">support@homehero.com</p>
          <p className="text-sm opacity-70">Dhaka, Bangladesh</p>
        </div>
      </div>

      <div className="text-center text-xs opacity-60 pb-6">
        © {new Date().getFullYear()} HomeHero. All rights reserved.
      </div>
    </footer>
  );
}
