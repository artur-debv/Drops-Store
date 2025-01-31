import { Prisma } from "@prisma/client";
import Image from "next/image";
import DiscountBadge from "./discount-badge";

interface WishlistItemProps {
  product: Prisma.ProductGetPayload<Prisma.ProductArgs>;
}



const WishlistItem = ({ product }: WishlistItemProps) => {
  return (
    <div className="flex items-center justify-between gap-4 p-4">
      {/* Product Information */}
      <div className="flex items-center gap-4">
        {/* Product Image */}
        <div className="relative flex h-24 w-24 items-center justify-center rounded-lg bg-accent">
          <Image
            src={product.imageUrls[0]}
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto max-h-[70%] w-auto max-w-[80%] object-contain"
            alt={product.name}
          />
          {product.discountPercentage > 0 && (
            <DiscountBadge className="absolute left-3 top-3">
              {product.discountPercentage}
            </DiscountBadge>
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <p className="truncate text-sm font-medium">{product.name}</p>
          <p className="text-sm font-semibold">
            R$ {product.basePrice.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WishlistItem;
