import Navbar from "./_components/Navbar";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full ">
      <Navbar />
      <main className="pt-20 pb-20 sm:pt-40">{children}</main>
    </div>
  );
};

export default HomeLayout;
