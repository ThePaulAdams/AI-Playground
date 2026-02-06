import { Navigation } from '@/components/Navigation'
import { Settings as SettingsIcon, Shield, Bell, User, Key, Database } from 'lucide-react'

export default function SettingsPage() {
  const sections = [
    {
      title: 'Profile',
      description: 'Manage your account settings and preferences.',
      icon: User,
      status: 'Active'
    },
    {
      title: 'API Keys',
      description: 'Manage keys for external integration and venture webhooks.',
      icon: Key,
      status: 'Coming Soon'
    },
    {
      title: 'Notifications',
      description: 'Configure how you receive updates from active ventures.',
      icon: Bell,
      status: 'Inactive'
    },
    {
      title: 'Infrastructure',
      description: 'Database and Railway deployment configuration.',
      icon: Database,
      status: 'Connected'
    },
    {
      title: 'Security',
      description: 'Audit logs and authentication preferences.',
      icon: Shield,
      status: 'Active'
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <header className="flex justify-between items-center max-w-6xl mx-auto mb-16">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <SettingsIcon size={20} className="text-white" />
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tighter italic">Settings</h1>
        </div>
        <Navigation />
      </header>

      <main className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 gap-6">
          {sections.map((section) => (
            <div 
              key={section.title}
              className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all group"
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="mt-1 p-2 rounded-lg bg-white/5 text-white/40 group-hover:text-blue-400 transition-colors">
                    <section.icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold uppercase tracking-tight">{section.title}</h3>
                    <p className="text-sm text-white/40 mt-1 max-w-md">{section.description}</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                  section.status === 'Active' ? 'bg-green-500/10 text-green-500' :
                  section.status === 'Connected' ? 'bg-blue-500/10 text-blue-500' :
                  'bg-white/5 text-white/20'
                }`}>
                  {section.status}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 rounded-3xl border border-red-500/10 bg-red-500/5">
          <h3 className="text-red-500 font-bold uppercase text-sm tracking-widest mb-4">Danger Zone</h3>
          <button className="px-6 py-3 rounded-xl bg-red-600/10 border border-red-600/20 text-red-500 text-sm font-bold hover:bg-red-600 hover:text-white transition-all uppercase tracking-widest">
            Purge All Factory Data
          </button>
        </div>
      </main>
    </div>
  )
}
