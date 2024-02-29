"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PhotoData } from "@/utils/model";

import Image from "next/image";
import Polygon from "./Polygon";
import { Suspense } from "react";
import { classAttr } from "@/utils/constants";

const ImageModal = ({
  open,
  photoData,
  onClose,
}: {
  open: boolean;
  photoData: PhotoData | null;
  onClose: () => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      {/*  <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent className="max-w-[519px] max-h-[599px] p-[20px] pt-[13px]">
        <DialogHeader className="m-0 p-0">
          <DialogTitle className="text-[14px] font-normal">
            <span className="text-[14px] text-normal truncate">
              {photoData?.name}
            </span>
          </DialogTitle>
        </DialogHeader>
        <div className="flex">
          <div
            className={`min-w-[98px] text-[10px] text-center px-3 p-1 rounded-full ${
              classAttr[`${photoData?.className}`]?.color
            }`}
            style={{ background: classAttr[`${photoData?.classId}`]?.color }}
          >
            {photoData?.className} {classAttr[`${photoData?.classId}`]?.color}
          </div>
        </div>
        {photoData && (
          <div className="h-[447px] w-[447px] w-full mx-auto">
            <Image
              src={photoData?.image}
              width={800}
              height={600}
              alt=""
              className="relative h-full"
            />

            <Polygon photo={photoData} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
