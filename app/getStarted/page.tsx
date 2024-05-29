"use client"
import Image from "next/image";
import { IconContext } from "react-icons";
import { FaFileUpload } from "react-icons/fa";
import { useState, useEffect } from "react";
import { ImageUpload } from "../Components/ImageUpload";
import { PrismaClient } from "@prisma/client";
export default function Page() {
    const [personimg, setPersonImg] = useState<any | null>(null);
    const [top, setTop] = useState<any | null>(null);
    const [bottom, setBottom] = useState<any | null>(null);
    const handleUpload = () => {
        console.log('clicked')
        const data = fetch("/api/route")
    }
  return (
    <>
        <div className="flex flex-col items-center justify-center">
            <p className="mt-2 text-3xl font-bold flex justify-center">Get started</p>
            <div className="mt-4 flex items-center justify-center border-2 border-slate-500 mx-1 rounded-md shadow-md">
                <div className="flex flex-col">
                    <p className="text-slate-600 text-3xl m-5 font-bold">Add a picture of yourself</p>
                    <ImageUpload/>
                    <p className="m-5 text-3xl text-slate-600 font-bold">Add Clothing</p>
                    <div>
                        <div className="flex">
                            <div className="flex flex-col">
                                <p className="text-3xl mt-2 mx-5">Top</p>
                                    <ImageUpload/>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-3xl mt-2 mx-5">Bottom</p>
                                <ImageUpload/>
                            </div>  
                        </div>
                        <div className="flex justify-end mx-3 my-2">
                        <button onClick = {handleUpload} className="mt-4 mb-3 px-3 py-2 border-sm bg-blue-500 rounded-md text-slate-200">Upload</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}