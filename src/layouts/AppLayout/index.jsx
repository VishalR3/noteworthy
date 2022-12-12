import Header from "./Header/Header";

export default function AppLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
