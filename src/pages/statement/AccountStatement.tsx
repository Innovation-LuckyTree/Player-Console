import { FC } from "react"
import '../../App.css'
import { Tabs, TabsProps } from "antd";

export const AccountStatement: FC =() => {
  
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'DEPOSIT',
      children: <>Deposit table!</>,
    },
    {
      key: '2',
      label: 'WITHDRAWAL',
      children: <>Withdrawal table!</>,
    },
    {
      key: '3',
      label: 'PROMO APPLY',
      children: <>Promo apply table!</>,
    },
    {
      key: '4',
      label: 'REWARDS',
      children: <>Rewards table!</>,
    },
    {
      key: '5',
      label: 'ADJUSTMENT',
      children: <>Ajustment table!</>,
    },
    {
      key: '6',
      label: 'REBATE',
      children: <>Rewards table!</>,
    },
  ];
  const onChange = (key: string) => {
    console.log(key);
  };

  return (
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
  )
}