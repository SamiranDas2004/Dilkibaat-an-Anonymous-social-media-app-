'use client'

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useState } from "react"

function CarouselDemo() {
  const [gender, setGender] = useState<string | undefined>(undefined);

  const handleGenderChange = (value: string) => {
    setGender(value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white relative">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url()' }}></div>
      
      {/* Gender Selection */}
      <div className="relative z-10 flex space-x-4 mb-6">
        <button
          value="Male"
          onClick={() => handleGenderChange('Male')}
          className={`px-4 py-2 rounded-lg ${gender === 'Male' ? 'bg-blue-600' : 'bg-gray-800'} hover:bg-blue-700 focus:outline-none`}
        >
          Male
        </button>
        <button
          value="Female"
          onClick={() => handleGenderChange('Female')}
          className={`px-4 py-2 rounded-lg ${gender === 'Female' ? 'bg-pink-600' : 'bg-gray-800'} hover:bg-pink-700 focus:outline-none`}
        >
          Female
        </button>
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-lg p-6 bg-gray-800 bg-opacity-80 rounded-lg shadow-lg">
        <Carousel className="w-full max-w-xs">
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card className="flex items-center justify-center h-full">
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-4xl font-semibold">
                        <img src="https://res.cloudinary.com/dfjfjovut/image/upload/v1721983685/hiyyhvkvns8ssxhfudtd.png" alt="Carousel Image" />
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  )
}

export default CarouselDemo
