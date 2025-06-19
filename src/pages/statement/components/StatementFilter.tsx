/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from "react"
import { Button, DatePicker, Space } from "antd";
import dayjs, { Dayjs } from "dayjs";

const { RangePicker } = DatePicker;
const dateOptions = ["Today", "In 3 days", "In a week", "In a month"];
const today = dayjs();

export const StatementFilter: FC =() => {
    
  const [activeDateFilter, setActiveDateFilter] = useState("Today");
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>([today, today]);

  const handleDateFilter = (label: string) => {
    setActiveDateFilter(label);
    const today = dayjs();
    let end;

    switch (label) {
      case "Today":
        end = today;
        break;
      case "In 3 days":
        end = today.add(3, "day");
        break;
      case "In a week":
        end = today.add(7, "day");
        break;
      case "In a month":
        end = today.add(30, "day");
        break;
      default:
        return;
    }

    setDateRange([today, end]);
  };

  return (
    <>
        <div style={{ marginBottom: 20 }}>
            <div style={{display:'flex', gap:'10px'}}>
                <label style={{marginTop:'5px'}}>Transaction Date</label>
                <Space wrap>
                {dateOptions.map((opt) => (
                    <Button key={opt} className={`small-button1 ${ activeDateFilter === opt ? "active" : "" }`}
                    onClick={() => handleDateFilter(opt)} >
                        {opt}
                    </Button>
                ))}
                </Space>
            </div>
            
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
    </>
  )
}