import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

export default function BuyerAddress() {
  return (
    <div className="border-2 border-gray bg-background brightness-105 rounded-md col-span-4  p-5 ">
      <div className="flex flex-col justify-between h-full">
        <h1 className="text-2xl font-bold">Address</h1>
        <p className="text-gray-500">Enter your address.</p>
        <div className="mt-5">
          <Select>
            <SelectTrigger className="mb-5">
              <SelectValue placeholder="Select a city" />
            </SelectTrigger>
            <SelectContent>
              {/* {bdCities.map((city) => (
            <SelectItem key={city} value={city}>
              {city}
            </SelectItem>
          ))} */}
            </SelectContent>
          </Select>
          <Textarea
            // onChange={(e) => handleShippingAddress(e.target.value)}
            rows={5}
          />
        </div>
      </div>
    </div>
  );
}
