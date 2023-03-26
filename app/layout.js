import "./globals.css";
import { AuthContextProvider } from "../context/AuthContext";

// Componetns
import Nav from "../components/Nav";

export const metadata = {
  title: "Paywall Subscription",
  description: "A simple Paywall Subscription with authentication",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthContextProvider>
        <body>
          <Nav />
          <main>{children}</main>
        </body>
      </AuthContextProvider>
    </html>
  );
}
