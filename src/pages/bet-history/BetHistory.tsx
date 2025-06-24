/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useState } from "react"
import '../../App.css'
import { BetHistoryTable } from "./components/BetHistoryTable"
import { Button, DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";

const { RangePicker } = DatePicker;
const today = dayjs();

export const BetHistory: FC =() => {

  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>([today, today]);

  return (
    <>
        <div className="deposit-header">BET HISTORY</div>
        <div style={{ marginBottom: 20 }}>
            <div style={{ marginTop: 20, display: "flex", gap: 20, alignItems: "center" }}>
                <label>Start Date</label>
                <RangePicker
                    value={dateRange}
                    onChange={(values) => setDateRange(values)}
                    style={{ backgroundColor: "var(--bg-darkD)", border: "1px solid #444" }}
                    allowClear
                />
                <Button className="small-button" style={{ marginLeft: 10 }}>
                    SEARCH
                </Button>
            </div>
        </div>

        <BetHistoryTable />
    </>
  )
}