import "./globals.css";
import { AuthContextProvider } from "../context/AuthContext";
// Components
import Nav from "../components/Nav";

export const metadata = {
  title: "Supersaas - Race to MVP",
  description:
    "A collection of boilerplates to fasttrack your next Saas project",
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
