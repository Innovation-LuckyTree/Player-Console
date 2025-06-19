import { FC } from "react"
import { Table, TableColumnsType, TableProps } from "antd";
import { StatementFilter } from "./StatementFilter";
import { RebateList } from "../models/RebateList";

export const RebateTable: FC =() => {
  const columns: TableColumnsType<RebateList> = [
    { title: 'Date', dataIndex: 'date' },
    { title: 'Reference Number', dataIndex: 'referenceNumber' },
    { title: 'Payment Method', dataIndex: 'paymentMethod' },
    { title: 'Note', dataIndex: 'note' },
    { title: 'Amount', dataIndex: 'amount' },
    { title: 'Processing Fees', dataIndex: 'processingFee' },
    { title: 'Net Amount', dataIndex: 'netAmount' },
    { title: 'Status', dataIndex: 'status' },
  ];
  
  const onChange: TableProps<RebateList>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <>
      <StatementFilter />

      <Table<RebateList> 
        size="small"
        pagination={{ position: ['bottomLeft'] }}
        columns={columns}
        dataSource={[]}
        onChange={onChange}
      />
    </>
  )
}