import PurchaseHistory from "@/components/modules/purchase";
import { getCurrentUser } from "@/services/AuthService";
import { getAllPurchases } from "@/services/Purchase";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Purchases | adolBodol",
  description:
    "Track and review your complete purchase history on adolBodol. Stay informed about your orders, transactions, and past purchases anytime.",
};

const PurchaseHistoryPage = async () => {
  const { userId } = await getCurrentUser();

  const { data: transactionsOfPurchase } = await getAllPurchases(userId);
  return (
    <div>
      <PurchaseHistory transactions={transactionsOfPurchase}></PurchaseHistory>
    </div>
  );
};

export default PurchaseHistoryPage;
