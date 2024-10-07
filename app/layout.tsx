import './globals.css';

export const metadata = {
  title: 'Patient Management System',
  description:
    'A Patient Management System for managing patients and appointments.',
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen w-full flex-col">{children}</body>
    </html>
  );
}
