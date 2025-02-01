"use client";
import React, { useState, useEffect } from 'react';
import ImageModal from '@/components/ImageModal';

const FlowersPage = () => {
  const [flowers, setFlowers] = useState<any[]>([]);
  const [isFetchingFlowers, setIsFetchingFlowers] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const fetchFlowers = async () => {
    setIsFetchingFlowers(true);
    try {
      const response = await fetch('/api/flowers');
      if (!response.ok) {
        throw new Error('Failed to fetch flowers');
      }
      const data = await response.json();
      setFlowers(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching flowers:', error);
    } finally {
      setIsFetchingFlowers(false);
    }
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    fetchFlowers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-misty_rose-300">Flowers</h2>
      <button
        onClick={() => {}}
        className="bg-french_rose-500 text-white px-4 py-2 rounded-lg mb-6 hover:bg-french_rose-600 transition-colors"
      >
        Add Flower
      </button>
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="w-full bg-white border-collapse">
          <thead>
            <tr className="bg-french_rose-500 text-white">
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Base Price</th>
              <th className="p-4 text-left">Colors</th>
              <th className="p-4 text-left">Size</th>
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isFetchingFlowers ? (
              <tr>
                <td colSpan={7} className="text-center py-8">Loading flowers...</td>
              </tr>
            ) : (
              flowers.map((flower) => (
                <tr
                  id={flower.$id}
                  key={flower.$id}
                  className="border-b border-misty_rose-200 hover:bg-misty_rose-700 transition-colors"
                >
                  <td className="p-4">{flower.$id}</td>
                  <td className="p-4">{flower.name}</td>
                  <td className="p-4">{flower.basePrice}</td>
                  <td className="p-4">
                    {flower.colors.map((color: any) => (
                      <div className="flex items-center mb-1.5" key={color.id}>
                        <span
                          className="w-6 h-6 rounded-full mr-2 border-2 border-misty_rose-300"
                          style={{ backgroundColor: '#' + color.hexColor }}
                        ></span>
                        <p>{color.name}</p>
                      </div>
                    ))}
                  </td>
                  <td className="p-4">{flower.size}</td>
                  <td className="p-4">
                    <img
                      src={flower.image_url}
                      alt={flower.name}
                      className="w-16 h-16 object-cover cursor-pointer"
                      onClick={() => handleImageClick(flower.image_url)}
                    />
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => {}}
                      className="bg-sky-500 text-white px-4 py-1.5 rounded-md hover:bg-sky-600 transition-colors"
                    >
                      Edit
                    </button>
                    <span className="mx-2">|</span>
                    <button
                      onClick={() => {}}
                      className="bg-red-500 text-white px-4 py-1.5 rounded-md hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <ImageModal imageUrl={selectedImage} onClose={closeModal} />
      )}
    </div>
  );
};

export default FlowersPage;