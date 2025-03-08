
import { useState } from "react";
import { cn } from "@/lib/utils";

interface LeaderImageProps {
  imageSrc: string;
  name: string;
  onImageError: () => void;
}

const LeaderImage = ({ imageSrc, name, onImageError }: LeaderImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className="relative aspect-[3/4] overflow-hidden bg-gray-800">
      {!imageLoaded && (
        <div className="absolute inset-0 shimmer" />
      )}
      <img 
        src={imageSrc}
        alt={name}
        className={cn(
          "w-full h-full object-cover lazy-image",
          imageLoaded ? "loaded" : ""
        )}
        onLoad={handleImageLoad}
        onError={onImageError}
      />
    </div>
  );
};

export default LeaderImage;
