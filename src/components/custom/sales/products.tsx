"use client";
import { useEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import usePeriodStore from "@/store/usePeriodStore";
const Products = ({
  filter,
  colorScheme,
}: {
  filter: string;
  colorScheme: string;
}) => {
  const [topSales, setTopSales] = useState([]);
  const { period } = usePeriodStore();

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/sales/products?period=${period}&filter=${filter}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setTopSales(data);
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [period, filter]);
  return (
    <>
      <div className="">
        <div>
          <div className="mx-auto h-96 w-full">
            <MyResponsivePie chartData={topSales} colorScheme={colorScheme} />
          </div>
        </div>
      </div>
    </>
  );
};

const MyResponsivePie = ({ chartData, colorScheme }) => (
  <ResponsivePie
    data={chartData}
    startAngle={108}
    colors={{ scheme: colorScheme }} // Use the passed color scheme
    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    innerRadius={0.25}
    padAngle={0.7}
    cornerRadius={10}
    activeOuterRadiusOffset={8}
    borderWidth={1}
    borderColor={{
      from: "color",
      modifiers: [["darker", 0.2]],
    }}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor="#333333"
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: "color" }}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{
      from: "color",
      modifiers: [["darker", 2]],
    }}
    defs={[
      {
        id: "dots",
        type: "patternDots",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.3)",
        size: 4,
        padding: 1,
        stagger: true,
      },
      {
        id: "lines",
        type: "patternLines",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.3)",
        rotation: -45,
        lineWidth: 6,
        spacing: 10,
      },
    ]}
    legends={[
      {
        anchor: "bottom",
        direction: "row",
        justify: false,
        translateX: 0,
        translateY: 56,
        itemsSpacing: 0,
        itemWidth: 100,
        itemHeight: 18,
        itemTextColor: "#999",
        itemDirection: "left-to-right",
        itemOpacity: 1,
        symbolSize: 18,
        symbolShape: "circle",
        effects: [
          {
            on: "hover",
            style: {
              itemTextColor: "#000",
            },
          },
        ],
      },
    ]}
  />
);

export default Products;
