import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full flex-col overflow-auto bg-orange-200 dark:bg-[#161616]">
      <Header />
      <main className="flex flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
