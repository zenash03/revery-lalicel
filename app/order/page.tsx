"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useFetchFlower } from "@/hooks/useFetchFlowers";
import { motion } from "framer-motion";
import Topbar from "@/components/Topbar";
import { Suspense } from "react";

type Props = {};

function Page({}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [giftCardMessage, setGiftCardMessage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState("");
  const [targetPhoneNumber, setTargetPhoneNumber] = useState("+6287773667184");
  const [mainImage, setMainImage] = useState<string>("");

  const handleAddOnChange = (addOn: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(addOn)
        ? prev.filter((item) => item !== addOn)
        : [...prev, addOn]
    );
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  const calculateTotalPrice = (basePrice: number) => {
    let addOnsPrice = 0;
    if (selectedAddOns.includes("Lamps")) addOnsPrice += 15000;
    if (selectedAddOns.includes("Polaroid")) addOnsPrice += 10000;
    setTotalPrice(basePrice + addOnsPrice);
  };

  const formatCurrency = (price: any) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  const generateWhatsAppMessage = (productName: string) => {
    // const baseMessage = `Order Details:\n \nName: ${customerName}\nAddress: ${address}\nPhone Number: ${phoneNumber}\nGift Card Message: ${giftCardMessage}\nSelected Color: ${selectedColor}\nAdd-Ons: ${selectedAddOns.join(
    //   ", "
    // )}\nTotal Price: ${formatCurrency(totalPrice)}\nProduct: ${productName}`;

    const baseMessage = `Hi, Welcome to @revery.ind!\n\nSaya ingin melakukan pemesanan dengan detail berikut:\n\nProduk: ${productName}\nNama: ${customerName}\nAlamat: ${address}\nNomor HP: ${phoneNumber}\nPesan Kartu Ucapan: ${giftCardMessage}\nWarna Pilihan: ${selectedColor}\nAdd-Ons: ${selectedAddOns.join(", ")}\nTotal Harga: ${formatCurrency(totalPrice)}\n\nSetelah ini, tim @revery.ind akan mengecek ongkos kirim dan menginformasikan total harga final kepada Kakak. \n\nMohon ditunggu ya, terima kasih!`;

    const encodedMessage = encodeURIComponent(baseMessage);
    return `https://wa.me/${targetPhoneNumber}?text=${encodedMessage}`;
    
  };

  

  
  if (!id) {
    return <div>Invalid Order ID</div>;
  }
  const { flowers, isFetchingFlower } = useFetchFlower(id);
  
  
  useEffect(() => {
    if (flowers.length > 0) {
      calculateTotalPrice(flowers[0].basePrice);
      if (flowers[0].colors.length > 0) {
        setSelectedColor(flowers[0].colors[0].name); // Set default selected color
      }
      setMainImage(flowers[0].image_url[0]); // Set default main image
    }
  }, [selectedAddOns, flowers]);
  
  const formatUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      urlObj.searchParams.delete('mode');
      return urlObj.toString();
    } catch (error) {
      console.error("Invalid URL:", url);
      return url; // Return the original URL if it's invalid
    }
  };
  
  const handleImageClick = (imageUrl: string) => {
    setMainImage(imageUrl);
  };

  return (
    <div>
      <div className="container mx-auto px-4 mt-5">
        <h2 className="text-center text-2xl font-sans font-bold py-6 text-gray-800">
          Order
        </h2>
        <Suspense fallback={<div>Loading...</div>}>
          <Suspense fallback={<div>Loading search params...</div>}>
            {flowers.map((flower) => (
              <div
                key={flower.$id}
                className="bg-white p-2.5 rounded-lg shadow-lg border border-gray-200 mb-10"
              >
                <div className="py-2 flex items-center gap-x-4">
                  <motion.button
                    className="text-white bg-french_rose-500 px-4 py-2 rounded-lg text-base font-semibold"
                    onClick={() => {
                      location.href = "/"
                    }}
                  >
                    Back
                  </motion.button>
                  <h4>
                    Bouquet Store&nbsp; / &nbsp;Products&nbsp; /&nbsp;
                    <a className="text-french_rose-500 font-medium" href={`/order?id=${flower.$id}`}>{flower.name}</a>
                  </h4>
                </div>
                <div className="w-full h-px bg-slate-200 rounded-lg mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <div className="relative w-full aspect-square overflow-hidden rounded-md border border-gray-100">
                      {
                        mainImage && (
                          <img
                            src={formatUrl(mainImage)}
                            alt={flower.name}
                            className="object-cover w-full h-full"
                          />
                        )
                      }
                    </div>
                    {
                      flower.image_url.length >= 0 && (
                        <div className="flex gap-2 mt-2">
                          {flower.image_url.map((image, index) => (
                            <img
                              key={index}
                              src={formatUrl(image)}
                              alt={`${flower.name} ${index}`}
                              className="w-20 h-20 object-cover cursor-pointer border border-gray-200 rounded-md"
                              onClick={() => handleImageClick(image)}
                            />
                          ))}
                        </div>
                      )
                    }
                  </div>
                  <div className="flex flex-col gap-x-4 my-2.5">
                    <div>
                      <h3
                        className={`font-sans font-semibold text-lg mb-1 text-primary capitalize`}
                      >
                        {flower.name}
                      </h3>

                      <p className={`font-sans text-gray-600`}>
                        {formatCurrency(flower.basePrice)}
                      </p>
                    </div>
                    <div className="w-full h-px bg-slate-200 rounded-lg my-4" />
                    <div>
                      <h4 className="text-lg font-semibold mb-3">Choose Color:</h4>
                      <div className="flex gap-2 flex-wrap">
                        {flower.colors.map((color) => (
                          <div
                            key={color.$id}
                            className={`flex items-center gap-x-2 py-2.5 px-3 rounded-full border cursor-pointer font-medium ${
                              selectedColor === color.name
                                ? "bg-white border-french_rose-500 text-french_rose-500"
                                : "border-slate-100 bg-slate-100 text-gray-800"
                            }`}
                            onClick={() => handleColorChange(color.name)}
                          >
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
                        <div className="bg-white border border-french_rose-500 font-medium text-french_rose-500 py-2.5 px-5 rounded-full">
                          <p>{flower.stems}</p>
                        </div>
                      </div>
                    </div>
                    <div className="my-4">
                      <h4 className="text-lg font-semibold mb-3">Adds On:</h4>
                      <div className="flex gap-2">
                        <label
                          className={`flex items-center border gap-x-2 py-2.5 px-5 rounded-full font-medium ${
                            selectedAddOns.includes("Lamps")
                              ? "border-french_rose-500 text-french_rose-500"
                              : "border-slate-100 bg-slate-100 text-gray-800"
                          }`}
                        >
                          <input
                            type="checkbox"
                            value="Lamps"
                            checked={selectedAddOns.includes("Lamps")}
                            onChange={() => handleAddOnChange("Lamps")}
                          />
                          <span>Lamps ( + 15k)</span>
                        </label>
                        <label
                          className={`flex items-center border gap-x-2 py-2.5 px-5 rounded-full font-medium ${
                            selectedAddOns.includes("Polaroid")
                              ? "border-french_rose-500 text-french_rose-500"
                              : "border-slate-100 bg-slate-100 text-gray-800"
                          }`}
                        >
                          <input
                            type="checkbox"
                            value="Polaroid"
                            checked={selectedAddOns.includes("Polaroid")}
                            onChange={() => handleAddOnChange("Polaroid")}
                          />
                          <span>Polaroid ( + 10K)</span>
                        </label>
                      </div>
                      <div className="w-full h-px bg-slate-200 rounded-lg my-4" />
                      <div className="w-full">
                        <h4 className="text-lg font-semibold mb-3">
                          Recipient Details:
                        </h4>
                        <input
                          type="text"
                          placeholder="Name"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full mb-2 p-2 border rounded"
                        />
                        <input
                          type="text"
                          placeholder="Address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="w-full mb-2 p-2 border rounded"
                        />
                        <input
                          type="text"
                          placeholder="Phone Number"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="w-full mb-2 p-2 border rounded"
                        />
                        <textarea
                          placeholder="Gift Card Message"
                          value={giftCardMessage}
                          onChange={(e) => setGiftCardMessage(e.target.value)}
                          className="w-full mb-2 p-2 border rounded"
                        />
                      </div>
                      <div className="w-full h-px bg-slate-300 rounded-lg my-4" />
                      <div className="w-full">
                        <h4 className="text-lg font-semibold mb-3">Total Price:</h4>
                        <p>
                          {totalPrice === 0
                            ? formatCurrency(flower.basePrice)
                            : formatCurrency(totalPrice)}
                          &nbsp; ( Exclude delivery fee )
                        </p>
                      </div>
                      <div className="w-full h-px bg-slate-300 rounded-lg my-4" />
                      <div className="w-full">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-full mt-3 text-white bg-french_rose-500 px-6 py-2.5 rounded-lg text-base font-semibold"
                          onClick={() => {
                            calculateTotalPrice(flower.basePrice);
                            const whatsappUrl = generateWhatsAppMessage(
                              flower.name
                            );
                            window.open(whatsappUrl, "_blank");
                          }}
                        >
                          Send Order to Whatsapp
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Suspense>
        </Suspense>
      </div>
    </div>
  );
}

export default Page;
