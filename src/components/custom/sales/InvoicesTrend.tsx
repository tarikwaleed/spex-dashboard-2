"use client";
import React from "react";
import { useState, useEffect } from "react";

import { ResponsiveLine } from "@nivo/line";
type Props = {};

const InvoicesTrend = (props: Props) => {
  const [trend, setTrend] = useState([]);

  useEffect(() => {
    const fetchTrend = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/sales/daily/invoicesTrend`,
        );
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
  }, []);
  return (
    <div className="col-span-12 xl:col-span-7 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 ">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <h1 className="text-3xl font-black text-black dark:text-white">
          الفواتير
        </h1>
      </div>

      <div>
        <div className="mx-auto h-96 w-full max-w-xl">
          <MyResponsiveLine data={trend} />
        </div>
      </div>
    </div>
  );
};

const MyResponsiveLine = ({ data }: any) => {
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
        legend: "Hour of Day",
        legendOffset: -12,
        tickValues: [
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
          20, 21, 22, 23, 24,
        ],
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
      height={400}
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
