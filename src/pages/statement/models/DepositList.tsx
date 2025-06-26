export interface DepositList {
  key: React.Key;
  id: number;
  date: Date;
  referenceNumber: string;
  paymentMethod: string;
  note: string;
  totalDeposit: number;
  processingFee: number;
  receivableAmount: string;
  status: number
}