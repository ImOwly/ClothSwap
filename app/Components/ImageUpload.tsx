import React from 'react'
import { IconContext } from "react-icons";
import { FaFileUpload } from "react-icons/fa";
import { useState, useEffect, ChangeEvent } from "react";
export const ImageUpload = () => {
    const [files, setFiles] = useState<any | null>(null);
    const [fileName, setFileName] = useState<any | null>(null);
    const [paddedImage, setPaddedImage] = useState<any | null>(null);
    function handleDragOver(e:React.DragEvent){
        e.preventDefault()
        //console.log("dragging over drop area")
    }
    const resizeImage = (imageFile: File, callback: (resizedDataUrl: string) => void) => {
        const reader = new FileReader();
    reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
            let width = img.width;
            let height = img.height;

            // Calculate aspect ratio
            const aspectRatio = width / height;

            // Calculate new dimensions
            if (width > 500 || height > 150) {
                if (width > height) {
                    width = 500;
                    height = width / aspectRatio;
                } else {
                    height = 150;
                    width = height * aspectRatio;
                }
            }

            // Create canvas and draw resized image
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0, width, height);

            // Convert canvas to data URL
            const resizedDataUrl = canvas.toDataURL('image/jpeg');

            // Pass resized data URL to callback function
            callback(resizedDataUrl);
        };
        if (event.target?.result) {
            img.src = event.target.result as string;
        }
        };
        reader.readAsDataURL(imageFile);
    };
    const addPadding = (imageFile: File, callback: (resizedDataUrl: string) => void) => {
        const reader = new FileReader();
    reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
            let width = img.width;
            let height = img.height;

            // Calculate aspect ratio
            const aspectRatio = width / height;

            // Resize if the image is too big
            if (width > 768 || height > 1024) {
                if (width / height > 768 / 1024) {
                    width = 768;
                    height = width / aspectRatio;
                } else {
                    height = 1024;
                    width = height * aspectRatio;
                }
            }

            // Create canvas and draw resized image with padding
            const canvas = document.createElement('canvas');
            canvas.width = 768;
            canvas.height = 1024;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.fillStyle = '#ffffff'; // Black color padding
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                const offsetX = (canvas.width - width) / 2;
                const offsetY = (canvas.height - height) / 2;
                ctx.drawImage(img, offsetX, offsetY, width, height);
                const resizedDataUrl = canvas.toDataURL('image/jpeg');
                callback(resizedDataUrl);
            } else {
                console.error("Canvas context is not supported");
                callback(event.target?.result as string);
            }
        };
        if (event.target?.result) {
            img.src = event.target.result as string;
        }
    };
    reader.readAsDataURL(imageFile);
    }
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        if (!target.files || target.files.length === 0) {
            console.error("No files selected");
            return;
        }

        const file = target.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target && event.target.result) {
                    const result = event.target.result as string;
                    resizeImage(file,  (resizedDataUrl) => {
                        setFiles(resizedDataUrl);
                        setFileName(file.name);
                    });
                    addPadding(file, (resizedDataUrl) => {
                        setPaddedImage(resizedDataUrl);
                        setFileName(file.name);
                    })
                }
            };
            reader.readAsDataURL(file);
        } else {
            console.error("Selected file is not an image");
        }
    }
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        console.log("Something dropped here");
        const droppedFiles = e.dataTransfer.files;
        if (droppedFiles && droppedFiles.length > 0) {
            const file = droppedFiles[0];
            if (file && file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const target = event.target as FileReader;
                    const result = target.result as string;
                    resizeImage(file, (resizedDataUrl) => {
                        setFiles(resizedDataUrl);
                        setFileName(file.name);
                    });
                    addPadding(file, (resizedDataUrl) => {
                        setPaddedImage(resizedDataUrl);
                        setFileName(file.name);
                    })
                };
            reader.readAsDataURL(file);
        } else {
        console.error("Dropped file is not an image");
        }
        }
    };
    return (
        <>
        {files?(
            <div className = "flex flex-col border-2 border-dotted px-[75px] py-[50px]">
                <div className='flex items-center justify-between'>
                    <p className = "max-w-48">{fileName}</p>
                    <div>
                        <img src={files} alt="Dropped" className="m-5 border rounded-md" />
                    </div>
                </div>
                <input type='file' id="reuploadInput" accept="image/*" onChange = {handleChange} hidden></input>
                <button onClick={() => document.getElementById('reuploadInput')?.click()} className="border-sm bg-blue-500 rounded-md w-[150px] h-[50px] text-slate-200">
                    Upload again
                </button>
            </div>
        ):(
            <form action = '' onDrop={handleDrop} onDragOver={handleDragOver} onClick={() => document.getElementById('fileInput')?.click()} className="mx-5 mt-2 mb-2 flex items-center justify-center border-2 border-dotted px-[75px] py-[50px] hover:bg-slate-100 cursor-pointer">
                <div className="flex flex-col items-center">
                    <input type='file' id="fileInput" accept="image/*" onChange = {handleChange} hidden></input>
                    <IconContext.Provider value={{ color: "#25A5C1"}}>
                        <FaFileUpload className="size-10"/>
                    </IconContext.Provider>
                        <p className="text-2xl"><u>Click here</u> to upload or drag image to upload</p>
                </div>
            </form>
        )}
        </>
  )
}
