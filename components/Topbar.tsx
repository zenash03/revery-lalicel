import { useState } from "react";
import { useRouter } from 'next/navigation';

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

export default function Topbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-white fixed top-0 left-0 w-full z-50 shadow-md py-3">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Revery Bouquets Store</h1>
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
        <nav className="hidden md:flex space-x-4">
          <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }} className="text-gray-700 hover:text-gray-900">Home</a>
          <a href="#products" onClick={(e) => { e.preventDefault(); scrollToSection('products'); }} className="text-gray-700 hover:text-gray-900">Products</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} className="text-gray-700 hover:text-gray-900">Contact</a>
        </nav>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <nav className="flex flex-col space-y-2 py-2 px-4">
            <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); setIsMenuOpen(!isMenuOpen); }} className="text-gray-700 hover:text-gray-900 py-4">Home</a>
            <a href="#products" onClick={(e) => { e.preventDefault(); scrollToSection('products'); setIsMenuOpen(!isMenuOpen); }} className="text-gray-700 hover:text-gray-900 py-4">Products</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); setIsMenuOpen(!isMenuOpen); }} className="text-gray-700 hover:text-gray-900 py-4">Contact</a>
          </nav>
        </div>
      )}
    </div>
  );
}
