"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';

interface CloudinaryImage {
  public_id: string;
  secure_url: string;
}

export default function Home() {

  return (

    <h1 className="text-2xl font-bold text-center mt-10">
      Welcome to the Image Upload Page
    </h1>
  );
}