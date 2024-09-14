"use client";

import { ApexOptions } from "apexcharts";
import React from "react";
import dynamic from "next/dynamic";
import Products from "@/components/custom/sales/products";

const ChartTwo: React.FC = () => {
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-7">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            المنتجات الاعلى مبيعا
          </h4>
        </div>
        <div>
          <div className="relative z-20 inline-block"></div>
        </div>
      </div>

      <div>
        <div id="chartTwo" className="-mb-9 -ml-5">
          <Products filter="top" colorScheme="nivo"/>
        </div>
      </div>
    </div>
  );
};

export default ChartTwo;
