import React from "react";
import Products from "../custom/sales/products";
import Inventory from "../custom/inventory/inventory";

const ChartThree: React.FC = () => {
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-5">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-3xl font-black text-black dark:text-white">
          حالة المخزون
          </h5>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <Inventory />
        </div>
      </div>
    </div>
  );
};

export default ChartThree;
