import Link from "next/link"
import { Shield, Github, Twitter, Linkedin, Mail, Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-slate-900/50 border-t border-slate-800 mt-16">
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-teal-500">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-primary-400 to-teal-400 bg-clip-text text-transparent">
                CYBERVERSE
              </span>
            </Link>
            <p className="text-slate-400 text-sm max-w-xs">
              Master cybersecurity through hands-on practice. Join thousands of security professionals learning together.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-primary-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-primary-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-primary-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-primary-400 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Learning */}
          <div className="space-y-4">
            <h3 className="text-slate-100 font-semibold">Learning</h3>
            <div className="space-y-2">
              <Link href="/labs" className="block text-slate-400 hover:text-primary-400 transition-colors text-sm">
                Interactive Labs
              </Link>
              <Link href="/rooms" className="block text-slate-400 hover:text-primary-400 transition-colors text-sm">
                Attack Rooms
              </Link>
              <Link href="/leaderboard" className="block text-slate-400 hover:text-primary-400 transition-colors text-sm">
                Leaderboard
              </Link>
              <Link href="/premium" className="block text-slate-400 hover:text-primary-400 transition-colors text-sm">
                Premium Features
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-slate-100 font-semibold">Categories</h3>
            <div className="space-y-2">
              <Link href="/labs?category=web" className="block text-slate-400 hover:text-primary-400 transition-colors text-sm">
                Web Security
              </Link>
              <Link href="/labs?category=network" className="block text-slate-400 hover:text-primary-400 transition-colors text-sm">
                Network Security
              </Link>
              <Link href="/labs?category=crypto" className="block text-slate-400 hover:text-primary-400 transition-colors text-sm">
                Cryptography
              </Link>
              <Link href="/labs?category=forensics" className="block text-slate-400 hover:text-primary-400 transition-colors text-sm">
                Digital Forensics
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-slate-100 font-semibold">Support</h3>
            <div className="space-y-2">
              <Link href="/help" className="block text-slate-400 hover:text-primary-400 transition-colors text-sm">
                Help Center
              </Link>
              <Link href="/contact" className="block text-slate-400 hover:text-primary-400 transition-colors text-sm">
                Contact Us
              </Link>
              <Link href="/privacy" className="block text-slate-400 hover:text-primary-400 transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block text-slate-400 hover:text-primary-400 transition-colors text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">
            © 2024 CyberVerse. All rights reserved.
          </p>
          <p className="text-slate-400 text-sm flex items-center gap-1 mt-4 md:mt-0">
            Made with <Heart className="w-4 h-4 text-red-400" /> for cybersecurity enthusiasts
          </p>
        </div>
      </div>
    </footer>
  )
}