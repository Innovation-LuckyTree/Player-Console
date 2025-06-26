import { FC } from "react"
import { Table, TableColumnsType, TableProps } from "antd";
import { StatementFilter } from "./StatementFilter";
import { RewardList } from "../models/RewardList";

export const RewardTable: FC =() => {
  const columns: TableColumnsType<RewardList> = [
    { title: 'Date', dataIndex: 'date' },
    { title: 'Reference Number', dataIndex: 'referenceNumber' },
    { title: 'Payment Method', dataIndex: 'paymentMethod' },
    { title: 'Note', dataIndex: 'note' },
    { title: 'Amount', dataIndex: 'amount' },
    { title: 'Processing Fees', dataIndex: 'processingFee' },
    { title: 'Net Amount', dataIndex: 'netAmount' },
    { title: 'Status', dataIndex: 'status' },
  ];
  
  const onChange: TableProps<RewardList>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <>
      <StatementFilter />

      <Table<RewardList> 
        size="small"
        pagination={{ position: ['bottomLeft'] }}
        columns={columns}
        dataSource={[]}
        onChange={onChange}
      />
    </>
  )
}