"use client";
import React from 'react';

type ImageModalProps = {
  imageUrl: string;
  onClose: () => void;
};

const ImageModal = ({ imageUrl, onClose }: ImageModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative bg-white p-6 pt-2 rounded-lg shadow-lg max-w-3xl w-full">
        {/* Close Button */}
        <div className="flex justify-end mb-2">
            <button
            onClick={onClose}
            className="text-5xl text-black hover:text-gray-700 transition-colors"
            >
            &times;
            </button>
        </div>
        {/* Image Container with Border */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <img
            src={imageUrl}
            alt="Full size"
            className="w-full h-auto max-h-[80vh] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;