"use client";
import React from "react";
import { useState, useEffect } from "react";

import { ResponsiveLine } from "@nivo/line";
import usePeriodStore from "@/store/usePeriodStore";
type Props = {};

const InvoicesTrend = (props: Props) => {
  const [trend, setTrend] = useState([]);
  const { period, setPeriod } = usePeriodStore();
  const dailyTicks = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23,
  ];

  const monthlyTicks = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];

  const tickValues = period === "monthly" ? monthlyTicks : dailyTicks;

  useEffect(() => {
    const fetchTrend = async () => {
      try {
        // Set the query parameter based on the period
        const queryParam = period === "monthly" ? "?period=monthly" : "";
        const endpoint = `${process.env.NEXT_PUBLIC_BASE_API_URL}/sales/invoicesTrend${queryParam}`;

        const res = await fetch(endpoint);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setTrend(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTrend();
  }, [period]); // Re-fetch data when the period state changes

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-7 ">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <h1 className="text-3xl font-black text-black dark:text-white">
          الفواتير
        </h1>
      </div>

      <div>
        <div className="mx-auto h-96 w-full max-w-xl">
          <MyResponsiveLine
            data={trend}
            period={period}
            tickValues={tickValues}
          />
        </div>
      </div>
    </div>
  );
};

const MyResponsiveLine = ({ data, period, tickValues }: any) => {
  const theme = {
    text: {
      fontSize: 11,
      fill: "#333333",
      outlineWidth: 0,
      outlineColor: "transparent",
    },
    axis: {
      domain: {
        line: {
          stroke: "#777777",
          strokeWidth: 1,
        },
      },
      legend: {
        text: {
          fontSize: 12,
          fill: "#333333",
          outlineWidth: 0,
          outlineColor: "transparent",
        },
      },
      ticks: {
        line: {
          stroke: "#777777",
          strokeWidth: 1,
        },
        text: {
          fontSize: 11,
          fill: "#333333",
          outlineWidth: 0,
          outlineColor: "transparent",
        },
      },
    },
    grid: {
      line: {
        stroke: "#dddddd",
        strokeWidth: 1,
      },
    },
    legends: {
      title: {
        text: {
          fontSize: 11,
          fill: "#333333",
          outlineWidth: 0,
          outlineColor: "transparent",
        },
      },
      text: {
        fontSize: 11,
        fill: "#333333",
        outlineWidth: 0,
        outlineColor: "transparent",
      },
      ticks: {
        line: {},
        text: {
          fontSize: 10,
          fill: "#333333",
          outlineWidth: 0,
          outlineColor: "transparent",
        },
      },
    },
    annotations: {
      text: {
        fontSize: 13,
        fill: "#333333",
        outlineWidth: 2,
        outlineColor: "#ffffff",
        outlineOpacity: 1,
      },
      link: {
        stroke: "#000000",
        strokeWidth: 1,
        outlineWidth: 2,
        outlineColor: "#ffffff",
        outlineOpacity: 1,
      },
      outline: {
        stroke: "#000000",
        strokeWidth: 2,
        outlineWidth: 2,
        outlineColor: "#ffffff",
        outlineOpacity: 1,
      },
      symbol: {
        fill: "#000000",
        outlineWidth: 2,
        outlineColor: "#ffffff",
        outlineOpacity: 1,
      },
    },
    tooltip: {
      wrapper: {},
      container: {
        background: "#ffffff",
        color: "#333333",
        fontSize: 12,
      },
      basic: {},
      chip: {},
      table: {},
      tableCell: {},
      tableCellValue: {},
    },
  };
  return (
    <ResponsiveLine
      animate
      axisBottom={{
        format: ".0f", // Format to show integer hours (no decimals).
        legend: period === "monthly" ? "Day of Month" : "Hour of Day",
        legendOffset: -12,
        tickValues: tickValues,
      }}
      axisLeft={{
        legend: "Quantity",
        legendOffset: 12,
      }}
      curve="monotoneX"
      data={[
        {
          data: data,
          id: "Quantity Data",
        },
      ]}
      enablePointLabel
      enableTouchCrosshair
      // height={400}
      margin={{
        bottom: 60,
        left: 80,
        right: 20,
        top: 20,
      }}
      pointBorderColor={{
        from: "color",
        modifiers: [["darker", 0.3]],
      }}
      pointBorderWidth={1}
      pointSize={16}
      useMesh
      // width={700}
      xScale={{
        type: "linear", // Linear scale for numeric x values.
        min: 0, // Start from hour 0 (midnight).
        max: 24, // End at hour 24 (midnight the next day).
      }}
      yScale={{
        type: "linear", // Linear scale for quantity values.
      }}
    />
  );
};
export default InvoicesTrend;
