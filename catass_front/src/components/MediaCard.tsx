"use client";
import { MediaCardProps } from "@/types";
import {
  Button,
} from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { handleDownload } from "@/utils"

export function MediaCard({
  catImage,
  text,
  loading,
}: Readonly<MediaCardProps>) {
  const [showButton, setShowButton] = useState(true);
  console.log("Media catImage", catImage);
  useEffect(() => {
    if (catImage === "/404_cat.jpg") {
      setShowButton(false);
    }
  }, [catImage]);
  return (
   <div  className=" max-w-2xl w-7/12 bg-white border border-gray-200  shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="image-container min-h-96 object-containt relative">
        {loading && (
          <div role="status" className="space-y-8 animate-pulse md:space-y-0 
          md:space-x-8 rtl:space-x-reverse md:flex md:items-center flex-center">
          <div className="flex items-center justify-center w-screen h-96 sm:w-full bg-gray-300 rounded dark:bg-gray-700">
            <svg
              className="w-10 h-64 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
          </div>
          </div>
        )}

        {!loading && (
          <>
            <Image
              src={catImage ? catImage : "/firstLoad.png"}
              alt="cat picture"
              fill
              loading="eager"
            />
            {catImage && (
              <h1
                style={{
                  position: "absolute",
                  top: "80%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "white",
                }}
              >
                {text}
              </h1>
            )}
          </>
        )}
      </div>

      {!loading && (
      <div className="p-5 flex justify-end">
        {showButton  && (
          <Button
            style={{ backgroundColor: "rgb(76 29 149)" }}
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudDownloadIcon />}
            onClick={() => handleDownload('.image-container')}
          >
            Download
          </Button>
        )}
      </div>
      )}         
    </div>
  );
}
