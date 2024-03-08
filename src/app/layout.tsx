import { UserProvider } from "../hooks/contexts"
import { Toaster } from 'react-hot-toast';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head></head>
      <body suppressHydrationWarning={true}>
      {children}
      </body>
    </html>
  )
}


{/* <UserProvider>

<Toaster position="top-center"
  reverseOrder={false} />
</UserProvider> */}