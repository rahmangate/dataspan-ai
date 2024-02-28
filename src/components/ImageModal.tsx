"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Image from "next/image";

const ImageModal = ({
  open,
  image,
  onClose,
}: {
  open: boolean;
  image: string;
  onClose: () => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      {/*  <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-[14px] font-normal">
            Are you absolutely sure?
          </DialogTitle>
        </DialogHeader>
        <div className="h-[447px]">
          {/*   <Image src="" width={500} height={500} alt="" /> */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
