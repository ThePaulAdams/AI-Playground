'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard, 
  Rocket, 
  Settings, 
  BarChart3,
  CreditCard 
} from 'lucide-react'

export function Navigation() {
  const pathname = usePathname()

  const links = [
    { href: '/', label: 'Factory', icon: Rocket },
    { href: '/ventures', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/ventures/insights', label: 'Insights', icon: BarChart3 },
    { href: '/billing', label: 'Billing', icon: CreditCard },
    { href: '/settings', label: 'Settings', icon: Settings },
  ]

  return (
    <nav className="flex items-center gap-6">
      {links.map((link) => {
        const Icon = link.icon
        const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
        
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-colors",
              isActive ? "text-blue-500" : "text-white/40 hover:text-white"
            )}
          >
            <Icon size={14} />
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}
