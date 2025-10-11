import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield, Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="relative text-center">
        <div className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-neon-cyan to-neon-purple">
          <Shield className="h-14 w-14 text-background" />
        </div>
        <h1 className="mb-2 text-6xl font-bold neon-text">404</h1>
        <h2 className="mb-4 text-3xl font-bold">Page Not Found</h2>
        <p className="mb-8 text-xl text-muted-foreground">
          This page has been hacked... or maybe it just doesn't exist.
        </p>
        <Button size="lg" asChild className="bg-gradient-to-r from-neon-cyan to-neon-purple">
          <Link href="/" className="gap-2">
            <Home className="h-5 w-5" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  )
}
