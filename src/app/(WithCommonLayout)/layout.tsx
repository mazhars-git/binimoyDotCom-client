import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import RUContainer from "@/components/ui/core/RUContainer";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <RUContainer>
        <main className="min-h-screen">{children}</main>
      </RUContainer>
      <Footer />
    </>
  );
};

export default CommonLayout;
