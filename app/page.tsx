"use client";
import Image from "next/image";
import Head from "next/head";
import { motion } from "framer-motion";
import {useFetchFlowers} from "@/hooks/useFetchFlowers";
import { useRouter } from 'next/navigation';

const testimonials = [
  { id: 1, name: "Moll Jolly", review: "Amazing products and excellent service!", image: "https://images.unsplash.com/photo-1498551172505-8ee7ad69f235?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 2, name: "Jane Smith", review: "Luxurious and elegant. Highly recommended!", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
];

export default function Home() {
  const { flowers, isFetchingFlower } = useFetchFlowers();
  const router = useRouter();
  const formatCurrency = (price: any) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
  };
  return (
    <div className={`font-sans bg-pink-100`}>
      <Head>
        <title>Luxury Bouquet Store</title>
        <meta name="description" content="Elegant and luxurious bouquet store" />
      </Head>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="h-screen flex flex-col items-center justify-center bg-baker-miller_pink-500 text-white text-center"
      >
        <h1 className={`font-great-vibes text-6xl mb-4`}>Luxury Bouquets</h1>
        <p className={`font-playfair text-2xl mb-8`}>Elegant arrangements for every occasion</p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-french_rose-500 px-6 py-3 rounded-lg text-lg font-semibold"
        >
          Shop Now
        </motion.button>
      </motion.section>

      {/* Testimonials Section */}
      {/* <section className="py-20 bg-cherry_blossom_pink-900">
        <div className="container mx-auto px-4">
          <h2 className={`font-playfair text-4xl text-center mb-8`}>What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <img src={testimonial.image} alt={testimonial.name} className="rounded-full aspect-square object-cover object-center w-20" />
                  <h3 className={`font-playfair text-xl ml-4`}>{testimonial.name}</h3>
                </div>
                <p className={`font-sans text-gray-700`}>{testimonial.review}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Products Section */}
      <section className="py-20 bg-pink-50 h-screen flex flex-col items-center">  
        <div className="container mx-auto px-4">
          {/* Section Title */}
          <h2 className={`font-playfair text-3xl md:text-5xl text-center mb-8 md:mb-12 text-primary`}>
            Our Products
          </h2>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {
              flowers.map((flower) => (
                <motion.div
                  key={flower.$id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="bg-white p-2.5 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                  >
                  {/* Product Image */}
                  <div className="relative h-56 w-full mb-1.5 overflow-hidden rounded-md  border border-gray-100">
                    <img
                      src={flower.image_url}
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

                  <div className="flex gap-x-1.5">
                    {
                      flower.colors.map((color) => (
                        <div
                          key={color.$id}
                          className="bg-gray-300 w-5 h-5 rounded-full"
                          style={{ backgroundColor: '#' + color.hexColor }}
                        ></div>
                      ))
                    }
                  </div>
                  <div className="flex justify-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
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
      <section className="py-20 bg-cherry_blossom_pink-500">
        <div className="container mx-auto px-4">
          <h2 className={`font-playfair text-4xl text-center mb-8`}>Contact Us</h2>
          <form className="max-w-lg mx-auto">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 mb-4 rounded-lg border border-gray-300"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 mb-4 rounded-lg border border-gray-300"
            />
            <textarea
              placeholder="Your Message"
              className="w-full p-3 mb-4 rounded-lg border border-gray-300"
              rows={5}
            ></textarea>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-orchid_pink-500 px-6 py-3 rounded-lg w-full text-lg font-semibold"
            >
              Send Message
            </motion.button>
          </form>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-baker-miller_pink-500 text-white py-10">
        <div className="container mx-auto px-4 text-center">
          <p className={`font-sans`}>© 2024 Luxury Bouquet Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
