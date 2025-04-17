import "./globals.css";

export const metadata = {
  title: "Rick And Morty",
  description: "Meu primeiro consumo de API grátis!",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
