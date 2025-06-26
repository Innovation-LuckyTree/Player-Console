import { FC } from "react"
import '../../App.css'
import { Tabs, TabsProps } from "antd";
import { DepositTable } from "./components/DepositTable";
import { WithdrawalTable } from "./components/WithdrawalTable";
import { PromoTable } from "./components/PromoTable";
import { RewardTable } from "./components/RewardTable";
import { AdjustmentTable } from "./components/AdjustmentTable";
import { RebateTable } from "./components/RebateTable";

export const AccountStatement: FC =() => {
  
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'DEPOSIT',
      children: <DepositTable />,
    },
    {
      key: '2',
      label: 'WITHDRAWAL',
      children: <WithdrawalTable />,
    },
    {
      key: '3',
      label: 'PROMO APPLY',
      children: <PromoTable />,
    },
    {
      key: '4',
      label: 'REWARDS',
      children: <RewardTable />,
    },
    {
      key: '5',
      label: 'ADJUSTMENT',
      children: <AdjustmentTable />,
    },
    {
      key: '6',
      label: 'REBATE',
      children: <RebateTable />,
    },
  ];
  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <>
      <div className="deposit-header">STATEMENT</div>
      <Tabs className="custom-tabs" defaultActiveKey="1" items={items} onChange={onChange} />
    </>
  )
}