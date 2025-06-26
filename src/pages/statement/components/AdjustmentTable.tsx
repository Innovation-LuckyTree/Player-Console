import { FC } from "react"
import { Table, TableColumnsType, TableProps } from "antd";
import { StatementFilter } from "./StatementFilter";
import { AdjustmentList } from "../models/AdjustmentList";

export const AdjustmentTable: FC =() => {
  const columns: TableColumnsType<AdjustmentList> = [
    { title: 'Date', dataIndex: 'date' },
    { title: 'Reference Number', dataIndex: 'referenceNumber' },
    { title: 'Payment Method', dataIndex: 'paymentMethod' },
    { title: 'Note', dataIndex: 'note' },
    { title: 'Amount', dataIndex: 'amount' },
    { title: 'Processing Fees', dataIndex: 'processingFee' },
    { title: 'Net Amount', dataIndex: 'netAmount' },
    { title: 'Status', dataIndex: 'status' },
  ];
  
  const onChange: TableProps<AdjustmentList>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <>
      <StatementFilter />

      <Table<AdjustmentList> 
        size="small"
        pagination={{ position: ['bottomLeft'] }}
        columns={columns}
        dataSource={[]}
        onChange={onChange}
      />
    </>
  )
}