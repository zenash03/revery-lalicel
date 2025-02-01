"use client";
import useFetchColors from '@/hooks/useFetchColors';
import React, { useState } from 'react';
import PopupForm from '@/components/PopupForm';
import { Router, useRouter } from 'next/router';

const ColorsPage = () => {
  const { colors, isFetchingColor, refetch } = useFetchColors();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentColor, setCurrentColor] = useState<{ id: string; name: string; hexColor: string } | null>(null);

  const handleAddColor = () => {
    setCurrentColor(null); // Reset for adding a new color
    setIsFormOpen(true);
  };

  const handleEditColor = (color: { $id: string; name: string; hexColor: string }) => {
    setCurrentColor({ id: color.$id, name: color.name, hexColor: color.hexColor });
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentColor) {
      console.error('No color data available');
      return;
    }

    try {
      const method = currentColor.id ? 'PUT' : 'POST';
      const url = currentColor.id ? `/api/colors/${currentColor.id}` : '/api/colors';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: currentColor.name,
          hexColor: currentColor.hexColor,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${currentColor.id ? 'update' : 'add'} color`);
      }

      const result = await response.json();
      console.log(`Color ${currentColor.id ? 'updated' : 'added'} successfully:`, result);

      // Close the form and refetch data
      setIsFormOpen(false);
      refetch(); // Refetch colors from the server
    } catch (error) {
      console.error(`Error ${currentColor.id ? 'updating' : 'adding'} color:`, error);
    }
  };

  const handleDeleteColor = async (id: string) => {
    try {
      const response = await fetch(`/api/colors/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete color');
      }

      console.log('Color deleted successfully');

    //   window.location.reload(); // Refresh the page to fetch the updated data
      // Refetch data after deletion
      refetch(); // Refetch colors from the server
    } catch (error) {
      console.error('Error deleting color:', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-misty_rose-300">Colors</h2>
      <button
        onClick={handleAddColor}
        className="bg-french_rose-500 text-white px-4 py-2 rounded-lg mb-6 hover:bg-french_rose-600 transition-colors"
      >
        Add Color
      </button>
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="w-full bg-white border-collapse">
          <thead>
            <tr className="bg-french_rose-500 text-white">
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Hex Code</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isFetchingColor ? (
              <tr>
                <td colSpan={4} className="text-center py-8">Loading colors...</td>
              </tr>
            ) : (
              colors.map((color) => (
                <tr
                  key={color.$id}
                  className="border-b border-misty_rose-200 hover:bg-misty_rose-700 transition-colors"
                >
                  <td className="p-4">{color.$id}</td>
                  <td className="p-4">{color.name}</td>
                  <td className="p-4 flex items-center">
                    <span
                      className="inline-block w-6 h-6 rounded-full mr-3 border-2 border-misty_rose-300"
                      style={{ backgroundColor: '#' + color.hexColor }}
                    ></span>
                    <span className="font-mono">#{color.hexColor}</span>
                  </td>
                  <td>
                    <span>
                      <button
                        onClick={() => handleEditColor(color)}
                        className="bg-sky-500 text-white px-4 py-1.5 rounded-md hover:bg-sky-600 transition-colors"
                      >
                        Edit
                      </button>
                    </span>
                    <span className="mx-2">|</span>
                    <span>
                      <button
                        onClick={() => handleDeleteColor(color.$id)}
                        className="bg-red-500 text-white px-4 py-1.5 rounded-md hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Popup Form */}
      <PopupForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={currentColor ? "Edit Color" : "Add Color"}
        onSubmit={handleFormSubmit}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={currentColor?.name || ""}
              onChange={(e) =>
                setCurrentColor((prev) => ({
                  ...prev,
                  name: e.target.value,
                  id: prev?.id || "",
                  hexColor: prev?.hexColor || "",
                }))
              }
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Hex Code</label>
            <input
              type="text"
              value={currentColor?.hexColor || ""}
              onChange={(e) =>
                setCurrentColor((prev) => ({
                  ...prev,
                  hexColor: e.target.value,
                  id: prev?.id || "",
                  name: prev?.name || "",
                }))
              }
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>
      </PopupForm>
    </div>
  );
};

export default ColorsPage;