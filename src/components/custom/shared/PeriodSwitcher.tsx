"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import usePeriodStore from "@/store/usePeriodStore"
import { FaCartPlus, FaFilter } from "react-icons/fa"

const PeriodSwitcher: React.FC = () => {
  const { period, setPeriod } = usePeriodStore()

  return (
    <DropdownMenu dir="rtl">
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="text-lg w-32">
        <div className="flex flex-row items-center  gap-6">
          <span>فلترة</span>
          <FaFilter/>
        </div>
      </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white shadow-md">
        <DropdownMenuLabel>اختار الفترة</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={period} onValueChange={setPeriod}>
          <DropdownMenuRadioItem value="daily">يوميا </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="monthly">شهريا</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default PeriodSwitcher

