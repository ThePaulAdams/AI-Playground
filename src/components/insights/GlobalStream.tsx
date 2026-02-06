import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { formatRelativeTime } from '@/lib/utils'

interface Signal {
  id: string
  content: string
  rating: number | null
  email: string | null
  createdAt: Date
  ventureName: string
  ventureSlug: string
}

export function GlobalStream({ signals }: { signals: Signal[] }) {
  if (signals.length === 0) {
    return (
      <div className="p-20 border border-dashed border-white/5 rounded-3xl text-center opacity-20 text-xs font-black uppercase tracking-widest">
        No signals detected in the factory
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {signals.map((item) => (
        <div key={item.id} className="p-6 bg-white/[0.03] rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all group relative">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-3">
              <Link 
                href={`/ventures/${item.ventureSlug}`}
                className="text-[10px] font-black uppercase bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
              >
                {item.ventureName}
              </Link>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} className={`text-[8px] ${(item.rating || 0) >= s ? "text-blue-500" : "opacity-10"}`}>✦</span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              {item.email && (
                <span className="text-[9px] opacity-20 font-medium italic group-hover:opacity-40 transition-opacity">
                  {item.email}
                </span>
              )}
              <span className="text-[10px] opacity-20 font-black uppercase tracking-widest">
                {formatRelativeTime(item.createdAt)}
              </span>
            </div>
          </div>
          <p className="text-sm opacity-70 leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
            {item.content}
          </p>
          <Link 
            href={`/ventures/${item.ventureSlug}`}
            className="absolute right-6 bottom-6 opacity-0 group-hover:opacity-40 hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0"
          >
            <ChevronRight size={16} />
          </Link>
        </div>
      ))}
    </div>
  )
}
