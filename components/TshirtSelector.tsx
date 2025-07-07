'use client';
import React, { useState } from 'react';
import Image from 'next/image';

export default function TshirtProductPage() {
  const [selectedColor, setSelectedColor] = useState<'red' | 'blue' | 'green'>('red');

  const tshirtImages: Record<typeof selectedColor, string> = {
    red: '/img/red.avif',
    blue: '/img/blue.avif',
    green: '/img/green.avif',
  };

  const colors = Object.keys(tshirtImages) as Array<typeof selectedColor>;

  return (
    <main className="min-h-screen bg-black text-black px-8 py-12 flex justify-center">
      <div className="flex flex-col md:flex-row w-full max-w-6xl gap-10">
        {/* Left: Product Image */}
        <div className="flex-1 flex justify-center items-start">
          <Image
            src={tshirtImages[selectedColor]}
            alt={`${selectedColor} t-shirt`}
            width={500}
            height={500}
            className="w-full max-w-[1000px] rounded-xl object-contain"
          />
        </div>

        {/* Right: Product Info */}
        <div className="flex-1 flex flex-col gap-6">
          <div>
            <h1 className="text-3xl md:text-5xl font-semibold mb-2">Tech T-Shirt</h1>
            <p className="text-lg text-gray-600">Unisex Sportswear</p>
            <p className="text-xl font-medium mt-4">€49.99</p>
          </div>

          {/* Color Selector */}
          <div className="mt-6">
            <h3 className="text-md font-medium mb-2">Color</h3>
            <div className="flex gap-4">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-full border-2 transition ${
                    selectedColor === color ? 'border-black scale-110' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                  aria-label={`Select ${color} color`}
                />
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <p className="text-gray-700 text-sm leading-relaxed">
              This high-performance t-shirt combines comfort and style, perfect for everyday wear or athletic use.
              Lightweight material, breathable fabric, and modern silhouette inspired by the latest sports trends.
            </p>
          </div>

          {/* Add to Bag Button */}
          <button
            className="snipcart-add-item bg-white text-black py-3 px-6 rounded-full"
            data-item-id="tech-tshirt"
            data-item-name="Tech T-Shirt"
            data-item-price="49.99"
            data-item-url="/"
            data-item-description="Minimal Apple-style shirt"
          >
            Add to Bag
          </button>
        </div>
      </div>
    </main>
  );
}