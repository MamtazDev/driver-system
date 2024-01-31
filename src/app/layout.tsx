
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* <Provider store={store}> */}
        <body>{children}</body>
      {/* </Provider> */}
    </html>
  )
}
