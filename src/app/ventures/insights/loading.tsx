export default function Loading() {
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 max-w-7xl mx-auto animate-pulse">
      <header className="mb-12 space-y-4">
        <div className="h-4 w-24 bg-white/5 rounded" />
        <div className="h-10 w-64 bg-white/5 rounded" />
        <div className="h-6 w-96 bg-white/5 rounded" />
      </header>

      <main className="space-y-12">
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 bg-white/5 border border-white/5 rounded-2xl" />
          ))}
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-4 w-48 bg-white/5 rounded mb-4" />
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-white/5 border border-white/5 rounded-2xl" />
            ))}
          </div>

          <div className="space-y-6">
            <div className="h-4 w-48 bg-white/5 rounded mb-4" />
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-white/5 border border-white/5 rounded-xl" />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
