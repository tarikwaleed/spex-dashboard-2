"use client";

import { ApexOptions } from "apexcharts";
import React from "react";
import dynamic from "next/dynamic";
import TopClients from "../custom/sales/clients";

const ChartOne: React.FC = () => {
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <h1 className="text-3xl font-black text-black dark:text-white">العملاء المميزون</h1>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <TopClients />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
