import { FC } from "react"
import { Table, TableColumnsType, TableProps } from "antd";
import { StatementFilter } from "./StatementFilter";
import { WithdrawalList } from "../models/WithdrawalList";

export const WithdrawalTable: FC =() => {
  const columns: TableColumnsType<WithdrawalList> = [
    { title: 'Date', dataIndex: 'date' },
    { title: 'Reference Number', dataIndex: 'referenceNumber' },
    { title: 'Payment Method', dataIndex: 'paymentMethod' },
    { title: 'Note', dataIndex: 'note' },
    { title: 'Total Withdrawal', dataIndex: 'totalWithdrawal' },
    { title: 'Processing Fees', dataIndex: 'processingFee' },
    { title: 'Net Amount', dataIndex: 'netAmount' },
    { title: 'Status', dataIndex: 'status' },
  ];
  
  const onChange: TableProps<WithdrawalList>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <>
      <StatementFilter />

      <Table<WithdrawalList> 
        size="small"
        pagination={{ position: ['bottomLeft'] }}
        columns={columns}
        dataSource={[]}
        onChange={onChange}
      />
    </>
  )
}