import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-bold text-white">Company Name</h2>
            <p className="mt-2">1234 Street Name, City, State, 12345</p>
            <p className="mt-1">Email: info@company.com</p>
            <p className="mt-1">Phone: (123) 456-7890</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Follow Us</h3>
            <div className="mt-2 flex space-x-4">
              <div href="#" className="hover:text-white">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 2h-3a6 6 0 00-6 6v3H7v4h2v8h4v-8h3.6l.4-4H13V8a2 2 0 012-2h3z" />
                </svg>
              </div>
              <div href="#" className="hover:text-white">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 7.77V8a10.66 10.66 0 01-8-4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </div>
              <div href="#" className="hover:text-white">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M16 8a6 6 0 11-6-6 6 6 0 016 6z" />
                  <path d="M2 22h20v2H2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-gray-500">
            © {new Date().getFullYear()} Company Name. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
