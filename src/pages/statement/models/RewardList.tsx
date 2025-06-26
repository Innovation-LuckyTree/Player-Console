export interface RewardList {
  key: React.Key;
  id: number;
  date: Date;
  referenceNumber: string;
  paymentMethod: string;
  note: string;
  amount: number;
  processingFee: number;
  netAmount: string;
  status: number
}