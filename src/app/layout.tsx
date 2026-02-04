import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <header className="flex justify-between items-center p-4 bg-white/5 border-b border-white/10">
            <div className="font-black text-xl tracking-tighter uppercase">SaaS Factory</div>
            <div className="flex items-center gap-4">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="text-sm font-bold bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">Sign In</button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/"/>
              </SignedIn>
            </div>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
