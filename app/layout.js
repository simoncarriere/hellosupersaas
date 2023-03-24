import "./globals.css";
import { AuthContextProvider } from "../context/AuthContext";

// Componetns
import Nav from "../components/Nav";

export const metadata = {
  title: "Auth SPA",
  description: "A simple SPA with authentication",
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
