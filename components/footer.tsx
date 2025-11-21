import Link from "next/link"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-foreground text-white py-12 md:py-16">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Company */}
          <div>
            <h4 className="font-bold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-text-light hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-text-light hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-text-light hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-bold text-white mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-text-light hover:text-primary transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="text-text-light hover:text-primary transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-text-light hover:text-primary transition-colors">
                  Security
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-text-light hover:text-primary transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-text-light hover:text-primary transition-colors">
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:hello@freshkeep.com" className="text-text-light hover:text-primary transition-colors">
                  hello@freshkeep.com
                </a>
              </li>
              <li>
                <p className="text-text-light">San Francisco, CA</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-text-light/20 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-text-light text-sm">© {currentYear} FreshKeep. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-text-light hover:text-primary transition-colors text-sm">
              Twitter
            </a>
            <a href="#" className="text-text-light hover:text-primary transition-colors text-sm">
              LinkedIn
            </a>
            <a href="#" className="text-text-light hover:text-primary transition-colors text-sm">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
