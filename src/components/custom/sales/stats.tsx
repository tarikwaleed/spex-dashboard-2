"use client";
import React from "react";
import { useState, useEffect } from "react";
import CardDataStats from "@/components/CardDataStats";
import { FaBeer } from "react-icons/fa";
import {
  FaFileInvoice,
  FaDollarSign,
  FaChartLine,
  FaPiggyBank,
  FaPercentage,
} from "react-icons/fa";
type Props = {};
interface StatsData {
  invoice_count: number;
  total_revenue: number;
  average_revenue: number;
  total_profit: number;
  revenue_to_profit_percentage: number;
}

import usePeriodStore from "@/store/usePeriodStore";

const Stats = (props: Props) => {
  const [stats, setStats] = useState<StatsData | null>(null);
  const { period, setPeriod } = usePeriodStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set API endpoint based on the period
        const endpoint =
          period === "monthly"
            ? `${process.env.NEXT_PUBLIC_BASE_API_URL}/sales/stats?period=monthly`
            : `${process.env.NEXT_PUBLIC_BASE_API_URL}/sales/stats`;

        const res = await fetch(endpoint);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setStats(data);
        console.log(data); // Log the data when period changes
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [period]); // Re-fetch data when the period changes
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="فاتورة" total={stats?.invoice_count} rate="">
          <FaFileInvoice />
        </CardDataStats>

        <CardDataStats
          title="اجمالي المبيعات"
          total={stats?.total_revenue}
          rate=""
        >
          <FaDollarSign />
        </CardDataStats>

        <CardDataStats
          title="متوسط قيمة الفاتورة"
          total={stats?.average_revenue}
          rate=""
        >
          <FaChartLine />
        </CardDataStats>

        <CardDataStats title="احمالي الربح" total={stats?.total_profit} rate="">
          <FaPiggyBank />
        </CardDataStats>

        <CardDataStats
          title="نسبة الربح"
          total={stats?.revenue_to_profit_percentage}
          rate=""
        >
          <FaPercentage />
        </CardDataStats>
      </div>
    </>
  );
};

export default Stats;
