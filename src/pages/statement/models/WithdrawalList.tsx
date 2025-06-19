export interface WithdrawalList {
  key: React.Key;
  id: number;
  date: Date;
  referenceNumber: string;
  paymentMethod: string;
  note: string;
  totalWithdrawal: number;
  processingFee: number;
  netAmount: string;
  status: number
}