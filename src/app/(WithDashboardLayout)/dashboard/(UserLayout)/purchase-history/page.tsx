import PurchaseHistory from "@/components/modules/purchase";
import {  getCurrentUserDetails } from "@/services/AuthService";
import { getAllPurchases } from "@/services/Purchase";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Purchases | adolBodol",
  description:
    "Track and review your complete purchase history on adolBodol. Stay informed about your orders, transactions, and past purchases anytime.",
};

const PurchaseHistoryPage = async () => { 
  const user = await getCurrentUserDetails();

  const { data: transactionsOfPurchase } = await getAllPurchases(user?.data?._id);

  return (
    <div>
      <PurchaseHistory transactions={transactionsOfPurchase}></PurchaseHistory>
    </div>
  );
};

export default PurchaseHistoryPage;
