import "./globals.css";
import "./app.css";

export const metadata = {
  title: "Oasis Café",
  description: "Test ECommerce store integrated with TBD",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
