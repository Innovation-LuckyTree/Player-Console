import { FC } from "react"
import { Table, TableColumnsType, TableProps } from "antd";
import { BetHistoryList } from "../models/BetHistoryList";

export const BetHistoryTable: FC =() => {
  const columns: TableColumnsType<BetHistoryList> = [
    { title: 'Date', dataIndex: 'date' },
    { title: 'Game', dataIndex: 'game' },
    { title: 'Provider', dataIndex: 'provider' },
    { title: 'Bet Amount', dataIndex: 'betAmount' },
    { title: 'Win Amount', dataIndex: 'winAmount' },
    { title: 'Net P&L', dataIndex: 'netPL' },
    { title: 'Status', dataIndex: 'status' },
    { title: 'Details', dataIndex: 'details' },
  ];
  
  const onChange: TableProps<BetHistoryList>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <>
      <Table<BetHistoryList> 
        size="small"
        pagination={{ position: ['bottomLeft'] }}
        columns={columns}
        dataSource={[]}
        onChange={onChange}
      />
    </>
  )
}