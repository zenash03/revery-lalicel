"use client";
import Image from "next/image";
import Head from "next/head";
import { motion } from "framer-motion";
import { useState } from "react";
import { useFetchFlowers } from "@/hooks/useFetchFlowers";
import { useRouter } from 'next/navigation';
import Topbar from "@/components/Topbar";

const testimonials = [
  { id: 1, name: "Moll Jolly", review: "Amazing products and excellent service!", image: "https://images.unsplash.com/photo-1498551172505-8ee7ad69f235?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 2, name: "Jane Smith", review: "Luxurious and elegant. Highly recommended!", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
];

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  const offset = 70; // Adjust this value as needed
  const bodyRect = document.body.getBoundingClientRect().top;
  const elementRect = element?.getBoundingClientRect().top || 0;
  const elementPosition = elementRect - bodyRect;
  const offsetPosition = elementPosition - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth"
  });
};

export default function Home() {
  const { flowers, isFetchingFlower } = useFetchFlowers();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const formatCurrency = (price: any) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
  };
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
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    const offset = 70; // Adjust this value as needed
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element?.getBoundingClientRect().top || 0;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;
  
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  };

  return (
    <div className={`font-sans`}>
      <Head>
        <title>Revery Bouquet Store</title>
        <meta name="description" content="Elegant and luxurious bouquet store" />
      </Head>

      <Topbar />

      {/* Hero Section */}
      <motion.section
        id="hero"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 h-screen flex flex-col items-center justify-center bg-baker-miller_pink-500 text-white text-center pt-16 bg-cover bg-center bg-no-repeat bg-[url('https://cloud.appwrite.io/v1/storage/buckets/679dd68b002f6d3e4e1d/files/67a367d00039a1dd2213/view?project=679dcf2000139016ae39')] bg-fixed after:w-full after:h-full after:absolute after:top-0 after:left-0 after:bg-black after:opacity-45" 
      >
        <div className="relative z-20">
          <h1 className={`font-great-vibes text-6xl mb-4`}>Revery Bouquets</h1>
          <p className={`font-playfair text-2xl mb-8`}>Elegant arrangements for every occasion</p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative z-30 bg-french_rose-500 px-6 py-3 rounded-lg text-lg font-semibold"
            onClick={() => scrollToSection('products')}
          >
            Shop Now
          </motion.button>
        </div>
      </motion.section>

      {/* Products Section */}
      <section id="products" className="py-20 bg-pink-50 min-h-screen flex flex-col items-center">  
        <div className="container mx-auto px-4">
          {/* Section Title */}
          <h2 className={`font-playfair text-3xl md:text-5xl text-center mb-8 md:mb-12 text-primary`}>
            Our Products
          </h2>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8">
            {
              flowers.map((flower) => (
                <motion.div
                  key={flower.$id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="flex flex-col bg-white p-2.5 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                  >
                  {/* Product Image */}

                  <div className="relative h-56 w-full mb-1.5 overflow-hidden rounded-md  border border-gray-100">
                    <img
                      src={formatUrl(flower.image_url[0])}
                      alt={flower.name}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  {/* Product Name */}
                  <h3 className={`font-sans font-semibold text-lg mb-1 text-primary capitalize`}>
                    {flower.name}
                  </h3>

                  {/* Product Price */}
                  <p className={`font-sans text-gray-600 mb-4`}>
                    {formatCurrency(flower.basePrice)}
                  </p>

                  <div className="flex flex-wrap gap-y-2 gap-x-1.5">
                    {
                      flower.colors.map((color) => (
                        <div
                          key={color.$id}
                          className="bg-gray-300 w-5 h-5 rounded-full border border-slate-100"
                          style={{ backgroundColor: '#' + color.hexColor }}
                        ></div>
                      ))
                    }
                  </div>
                  <div className="flex flex-1 justify-center items-end">
                  <motion.button
                    whileHover={{ scale: 1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full mt-3 text-white bg-french_rose-500 px-6 py-1.5 rounded-lg text-base font-semibold"
                    onClick={() => router.push(`/order/?id=${flower.$id}`)}
                  >
                    Order Now
                  </motion.button>
                  </div>

                  </motion.div>
              ))
            }
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 min-h-screen bg-pink-50">
        <div className="container mx-auto px-4">
          <h2 className={`font-playfair text-4xl text-center mb-8 font-medium`}>Find Us on Social Media</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <a href="https://www.tiktok.com/@yourprofile" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 hover:text-gray-900">
              <img src="/icons/tiktok.svg" alt="TikTok" className="w-8 h-8 mr-2" />
              <span className="font-sans text-french_rose-500 font-semibold">TikTok</span>
            </a>
            <a href="https://www.instagram.com/revery.ind/" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 hover:text-gray-900">
              <img src="/icons/instagram.svg" alt="Instagram" className="w-8 h-8 mr-2" />
              <span className="font-sans text-french_rose-500 font-semibold">revery.ind</span>
            </a>
            <a href="https://maps.google.com/?q=your+location" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 hover:text-gray-900">
              <img src="/icons/whatsapp.svg" alt="WhatsApp" className="w-8 h-8 mr-2" />
              <span className="font-sans text-french_rose-500 font-semibold">WhatsApp: 0877 7366 7184</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-baker-miller_pink-500 text-white py-10">
        <div className="container mx-auto px-4 text-center">
          <p className={`font-sans`}>© 2025 Revery Bouquets Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
