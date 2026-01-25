"use client" 

import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/next";
import { useRef, useState } from "react";

interface FileUploadProps {
    onSuccess?: (response: any) => void;
    onProgress?: (progress: number) => void;
    fileType?: "image" | "video";
}

const FileUpload = ({ onSuccess, onProgress, fileType }: FileUploadProps) => {
    
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<null | string>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const abortController = new AbortController();

    const validateFile = (file: File) => {
        if (fileType === "video"){
            if(!file.type.startsWith("video/")){
                throw new Error("Invalid file type. Please upload a video file.");
            }
        }

        if(file.size > 100 * 1024 * 1024){
            throw new Error("File size exceeds the 100MB limit.");
        }
        return true;
    }

   

    return (
        <>
            <input
                type="file"
                accept={fileType === 'video' ? "video/*" : "image/*"}
                onChange={handleFileChange}
        </>
    );
};

export default FileUpload;