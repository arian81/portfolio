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
        <div className="relative aspect-square h-auto w-full md:h-full md:w-auto">
          <Image
            src={imageUrl}
            alt="me"
            fill={true}
            style={{ objectFit: "contain" }}
            loading="lazy"
            className="z-[-100] p-5 md:p-10"
          />
          <div className="flex justify-center p-2">
            <button
              className="btn join-item btn-sm m-5 md:btn-md md:m-10"
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
