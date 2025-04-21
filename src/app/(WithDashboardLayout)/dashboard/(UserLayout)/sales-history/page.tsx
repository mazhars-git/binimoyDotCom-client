import SalesHistory from "@/components/modules/sales";
import { getCurrentUser } from "@/services/AuthService";
import { getAllSales } from "@/services/Purchase";
import { Metadata } from "next";

//metadata
export const metadata: Metadata = {
  title: "Sales Analytics Dashboard | adolBodol Marketplace",
  description:
   "Comprehensive sales transaction history and analytics for adolBodol e-commerce platform. Track orders, customer purchases, and vendor performance."
};

const SalesHistoryPage = async () => {

  const { userId } = await getCurrentUser()
  const { data: transactionsOfSales
   } = await getAllSales(userId);

  return (
    <div className="mx-5">
      <SalesHistory trnasactions={transactionsOfSales} />
    </div>
  );
};

export default SalesHistoryPage;