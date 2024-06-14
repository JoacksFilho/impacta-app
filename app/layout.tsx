import AppBarMenu from './components/AppBar';
import './styles/globals.css'// Certifique-se de que este arquivo contém os estilos globais necessários

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <AppBarMenu />
        <div className="content">
          {children}
        </div>
      </body>
    </html>
  );
}