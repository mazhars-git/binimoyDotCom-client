import SalesHistory from "@/components/modules/sales";
import { getCurrentUserDetails } from "@/services/AuthService";
import { getAllSales } from "@/services/sales";
import { Metadata } from "next";

//metadata
export const metadata: Metadata = {
  title: "Sales Analytics Dashboard | adolBodol Marketplace",
  description:
    "Comprehensive sales transaction history and analytics for adolBodol e-commerce platform. Track orders, customer purchases, and vendor performance.",
};

const SalesHistoryPage = async () => {
  const user = await getCurrentUserDetails();

  const { data: transactionsOfSales } = await getAllSales(user?.data?._id);

  return (
    <div className="mx-5">
      <SalesHistory trnasactions={transactionsOfSales} />
    </div>
  );
};

export default SalesHistoryPage;
