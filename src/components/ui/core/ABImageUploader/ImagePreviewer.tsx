import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { Button } from "../../button";
import { X } from "lucide-react";

type TImagePreviewer = {
  label?: string;
  className?: string;
  imagePreview: string[];
  setImageFiles: Dispatch<SetStateAction<[] | File[]>>;
  setImagePreview: Dispatch<SetStateAction<string[]>>;
};

const ABImagePreviewer = ({
  className,
  imagePreview,
  setImageFiles,
  setImagePreview,
}: TImagePreviewer) => {
  const handleRemoveImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, idx) => idx !== index));
    setImagePreview((prev) => prev.filter((_, idx) => idx !== index));
  };

  return (
    <div className={className}>
      {imagePreview?.map((preview, index) => (
        <div
          key={index}
          className="relative w-36 h-36 rounded-md overflow-hidden border border-dashed border-gray-300"
        >
          <Image
            src={preview}
            alt={`Preview ${index + 1}`}
            width={300}
            height={300}
            className="object-cover w-full h-full"
          />

          <Button
            type="button"
            size="sm"
            onClick={() => handleRemoveImage(index)}
            className="bg-red-400 hover:bg-red-600 absolute -top-0 -right-0 w-6 h-6 p-0 rounded-full"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ABImagePreviewer;
