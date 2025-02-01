"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useFetchFlower } from "@/hooks/useFetchFlowers";

type Props = {};

function Page({}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const handleAddOnChange = (addOn: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(addOn)
        ? prev.filter((item) => item !== addOn)
        : [...prev, addOn]
    );
  };

  const formatCurrency = (price: any) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  if (!id) {
    return <div>Invalid Order ID</div>;
  }
  const { flowers, isFetchingFlower } = useFetchFlower(id);

  return (
    <div>
      <div className="flex items-center justify-center h-20 bg-french_rose-500">
        <h2 className="text-center text-2xl font-sans font-bold">XXX</h2>
      </div>
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl font-sans font-bold py-6 text-gray-800">
          Order
        </h2>

        {flowers.map((flower) => (
          <div
            key={flower.$id}
            className="bg-white p-2.5 rounded-lg shadow-lg border border-gray-200"
          >
            <div className="flex gap-x-4">
              <div className="relative h-40 aspect-square overflow-hidden rounded-md  border border-gray-100">
                <img
                  src={flower.image_url}
                  alt={flower.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <h3
                  className={`font-sans font-semibold text-lg mb-1 text-primary capitalize`}
                >
                  {flower.name}
                </h3>

                <p className={`font-sans text-gray-600 mb-4`}>
                  {formatCurrency(flower.basePrice)}
                </p>

                <div className="flex gap-x-1.5">
                  <div>
                    <p>Color:</p>
                  </div>
                  {flower.colors.map((color) => (
                    <div
                      key={color.$id}
                      className="bg-gray-300 w-5 h-5 rounded-full"
                      style={{ backgroundColor: "#" + color.hexColor }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full h-px bg-slate-300 rounded-lg my-4"/>
            <div>
              <h4 className="text-lg font-semibold mb-3">Choose Color:</h4>
              <div className="flex gap-2 flex-wrap">
                  {flower.colors.map((color) => (
                    <div key={color.$id} className="flex items-center gap-x-2 bg-slate-100 py-2.5 px-3 rounded-full">
                      <div
                        className="bg-gray-300 w-6 h-6 rounded-full"
                        style={{ backgroundColor: "#" + color.hexColor }}
                      ></div>
                      <p>{color.name}</p>
                    </div>
                  ))}
                </div>
            </div>
            <div className="my-4">
              <h4 className="text-lg font-semibold mb-3">Size:</h4>
              <div className="flex gap-2">
                <div className="bg-slate-100 py-2.5 px-5 rounded-full">
                  <p>{flower.size}</p>
                </div>
              </div>
            </div>
            <div className="my-4">
              <h4 className="text-lg font-semibold mb-3">Adds On:</h4>
              <div className="flex gap-2">
                <label className="flex items-center gap-x-2 bg-slate-100 py-2.5 px-5 rounded-full">
                  <input
                    type="checkbox"
                    value="Lamps"
                    checked={selectedAddOns.includes("Lamps")}
                    onChange={() => handleAddOnChange("Lamps")}
                  />
                  <span>Lamps ( + 15k)</span>
                </label>
                <label className="flex items-center gap-x-2 bg-slate-100 py-2.5 px-5 rounded-full">
                  <input
                    type="checkbox"
                    value="Polaroid"
                    checked={selectedAddOns.includes("Polaroid")}
                    onChange={() => handleAddOnChange("Polaroid")}
                  />
                  <span>Polaroid ( + 10K)</span>
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
      <h1>Order Page</h1>
      <p>Order ID: {id}</p>
    </div>
  );
}

export default Page;
