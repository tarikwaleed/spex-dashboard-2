"use client";
import { useEffect, useState } from "react";
import { ResponsiveWaffle } from "@nivo/waffle";

const TopClients = () => {
  const [topClients, setTopClients] = useState([]);

  useEffect(() => {
    const fetchTopClients = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/sales/clients");
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setTopClients(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchTopClients();
  }, []);

  return (
    <>
      <div>
        <div className="mx-auto h-96 w-full max-w-xl">
          <MyResponsiveWaffle data={topClients} />
        </div>
      </div>
    </>
  );
};
const MyResponsiveWaffle = ({ data /* see data tab */ }: any) => (
  <ResponsiveWaffle
    data={data}
    total={50000}
    rows={18}
    columns={14}
    padding={1}
    valueFormat=".2f"
    margin={{ top: 10, right: 10, bottom: 10, left: 120 }}
    colors={{ scheme: "category10" }}
    borderRadius={3}
    borderColor={{
      from: "color",
      modifiers: [["darker", 0.3]],
    }}
    motionStagger={2}
    legends={[
      {
        anchor: "top-left",
        direction: "column",
        justify: false,
        translateX: -100,
        translateY: 0,
        itemsSpacing: 4,
        itemWidth: 100,
        itemHeight: 20,
        itemDirection: "left-to-right",
        itemOpacity: 1,
        itemTextColor: "#777",
        symbolSize: 20,
        effects: [
          {
            on: "hover",
            style: {
              itemTextColor: "#000",
              itemBackground: "#f7fafb",
            },
          },
        ],
      },
    ]}
  />
);
export default TopClients;
