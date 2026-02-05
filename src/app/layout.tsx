import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import './globals.css'
import { Navigation } from '@/components/Navigation'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body className="bg-black text-white antialiased">
          <header className="flex justify-between items-center px-8 py-4 bg-white/[0.02] border-b border-white/10 sticky top-0 z-50 backdrop-blur-md">
            <div className="flex items-center gap-12">
              <div className="font-black text-xl tracking-tighter uppercase flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-600 rounded-md rotate-12 flex items-center justify-center">
                  <span className="rotate-[-12deg] text-[10px]">SF</span>
                </div>
                SaaS Factory
              </div>
              <SignedIn>
                <Navigation />
              </SignedIn>
            </div>
            <div className="flex items-center gap-4">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="text-xs font-black uppercase tracking-widest bg-blue-600 hover:bg-blue-700 px-6 py-2.5 rounded-lg transition-all active:scale-95 shadow-lg shadow-blue-500/20">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "w-8 h-8 rounded-lg border border-white/10"
                    }
                  }}
                />
              </SignedIn>
            </div>
          </header>
          <div className="relative">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}
