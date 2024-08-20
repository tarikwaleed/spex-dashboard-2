"use client";
import { useEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";

const Products = ({ filter, colorScheme }:{filter:string,colorScheme:string}) => {
  const [topSales, setTopSales] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/sales/products?filter=${filter}`,
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setTopSales(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [filter]); // Re-fetch data when the filter changes

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
