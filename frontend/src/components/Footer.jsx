export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-400 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <span className="text-xl">📚</span> StudentsHub
            </h3>
            <p className="text-sm text-gray-500">
              Complete student records management system for educational institutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-primary-500 transition">
                  Students
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-500 transition">
                  Reports
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-500 transition">
                  Settings
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-500 transition">
                  Help
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-primary-500 transition">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-500 transition">
                  Contact Support
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-500 transition">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-500 transition">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span>📧</span>
                <a href="mailto:info@studentshub.com" className="hover:text-primary-500 transition">
                  info@studentshub.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>📱</span>
                <a href="tel:+15551234567" className="hover:text-primary-500 transition">
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>📍</span>
                <span>Main Campus, Building A</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              &copy; {currentYear} StudentsHub. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0 text-sm">
              <a href="#" className="hover:text-primary-500 transition">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary-500 transition">
                Terms of Service
              </a>
              <a href="#" className="hover:text-primary-500 transition">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
