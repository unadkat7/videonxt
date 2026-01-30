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
    
    const [uploading, setUploading] = useState(false);
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

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file || !validateFile) return;
        
        setUploading(true);
        setError(null);

        try {
            const authRes = await fetch("/api/auth/imagekit-auth");
            const auth = await authRes.json();
            
            const res = await upload({
                file: file,
                fileName: file.name,
                publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY as string,
                signature: auth.signature,
                expire: auth.expire,
                token: auth.token,

                onProgress: (event) =>{
                    if(event.lengthComputable && onProgress){
                        const percent = (event.loaded / event.total) * 100;
                        onProgress(Math.round(percent));
                    }
                }
                

            });
            
            if (onSuccess) {
                onSuccess(res);
            }

        } catch (error) {
            console.error("Upload error:", error);
        } finally{
            setUploading(false);
        }

    } 
    
   

    return (
        <>
            <input
                type="file"
                accept={fileType === "video" ? "video/*" : "image/*"}
                onChange={handleFileChange}
            />
            {uploading && (
                <span>Loading...</span>
            )}
        </>
    );
};

export default FileUpload;