import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search, Bell, User } from "lucide-react"

export function NavBar() {
    return (
        <nav className="fixed top-0 w-full z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <div className="flex items-center gap-8">
                    <Link href="/" className="text-xl font-bold tracking-tighter bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                        MUSIC.EX
                    </Link>

                    {/* Main Nav */}
                    <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
                        <Link href="/" className="hover:text-foreground transition-colors">
                            Markets
                        </Link>
                        <Link href="/portfolio" className="hover:text-foreground transition-colors">
                            Portfolio
                        </Link>
                        <Link href="/activity" className="hover:text-foreground transition-colors">
                            Activity
                        </Link>
                    </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-4">
                    <div className="relative hidden sm:block">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search artists..."
                            className="h-9 w-64 rounded-full bg-secondary/50 pl-9 pr-4 text-sm outline-none focus:ring-1 focus:ring-primary/50 transition-all border border-transparent focus:border-primary/20"
                        />
                    </div>

                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                        <Bell className="h-5 w-5" />
                    </Button>

                    <Button variant="ghost" size="icon" className="rounded-full bg-secondary/50 text-foreground hover:bg-secondary">
                        <User className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </nav>
    )
}
