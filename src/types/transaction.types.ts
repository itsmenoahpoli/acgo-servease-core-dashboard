export interface Transaction {
  id: string;
  bookingId?: string;
  userId: string;
  type: "payment" | "refund" | "payout";
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed" | "refunded";
  paymentMethod?: string;
  transactionReference?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionFilters {
  type?: string;
  status?: string;
  userId?: string;
  startDate?: string;
  endDate?: string;
}

