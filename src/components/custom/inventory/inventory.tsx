"use client";
import { useEffect, useState } from "react";
import { ResponsiveFunnel } from "@nivo/funnel";

const Inventory = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/inventory/chart");
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setChartData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const staticData = [
      { id: "zeroQuantity", value: 10, label: "Quantity = 0" },
      { id: "minusQuantity", value: 5, label: "Quantity < 0" },
      { id: "lessThanTenQuantity", value: 8, label: "Quantity < 10" },
    ];
    setChartData(staticData);
  }, []);

  return (
    <div className="mx-auto h-96 w-full max-w-xl">
      <FunnelChart chartData={chartData} />
    </div>
  );
};
const FunnelChart = ({ chartData }: any) => (
  <ResponsiveFunnel
    data={chartData}
    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
    valueFormat=">-.4s"
    colors={{ scheme: "spectral" }}
    borderWidth={20}
    labelColor={{
      from: "color",
      modifiers: [["darker", 3]],
    }}
    beforeSeparatorLength={100}
    beforeSeparatorOffset={20}
    afterSeparatorLength={100}
    afterSeparatorOffset={20}
    currentPartSizeExtension={10}
    currentBorderWidth={40}
    motionConfig="wobbly"
  />
);

export default Inventory;
