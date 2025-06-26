import { FC } from "react"
import { Table, TableColumnsType, TableProps } from "antd";
import { DepositList } from "../models/DepositList";
import { StatementFilter } from "./StatementFilter";

export const DepositTable: FC =() => {
  const columns: TableColumnsType<DepositList> = [
    { title: 'Date', dataIndex: 'date' },
    { title: 'Reference Number', dataIndex: 'referenceNumber' },
    { title: 'Payment Method', dataIndex: 'paymentMethod' },
    { title: 'Note', dataIndex: 'note' },
    { title: 'Total Deposit', dataIndex: 'totalDeposit' },
    { title: 'Processing Fees', dataIndex: 'processingFee' },
    { title: 'Receivable Amount', dataIndex: 'receivableAmount' },
    { title: 'Status', dataIndex: 'status' },
  ];
  
  const onChange: TableProps<DepositList>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <>
      <StatementFilter />

      <Table<DepositList> 
        size="small"
        pagination={{ position: ['bottomLeft'] }}
        columns={columns}
        dataSource={[]}
        onChange={onChange}
      />
    </>
  )
}