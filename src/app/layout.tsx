export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
