import Image from "next/image";
import React from "react";

const ImageModal = ({ imageUrl }: { imageUrl: string }) => {
  const modalRef = React.useRef<HTMLDialogElement>(null);
  return (
    <div>
      <Image
        width={1000}
        height={1000}
        src={imageUrl}
        alt=""
        onClick={() => modalRef.current?.showModal()}
        className="cursor-pointer"
      />
      <dialog ref={modalRef} className="modal">
        <div className="relative h-full w-full">
          <Image
            src={imageUrl}
            alt="me"
            fill={true}
            style={{ objectFit: "contain" }}
            loading="lazy"
            className="z-[-100] m-0 p-20"
          />
          <div className="flex h-full items-end justify-center p-16">
            <button
              className="btn border  border-black bg-black px-8 text-white transition-all hover:border-2 hover:border-white  hover:bg-black"
              onClick={() => modalRef.current?.close()}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ImageModal;
