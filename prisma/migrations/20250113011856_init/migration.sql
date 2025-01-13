-- CreateTable
CREATE TABLE "WishListProducts" (
    "productId" TEXT NOT NULL,
    "wishListId" TEXT NOT NULL,

    CONSTRAINT "WishListProducts_pkey" PRIMARY KEY ("productId","wishListId")
);

-- AddForeignKey
ALTER TABLE "WishListProducts" ADD CONSTRAINT "WishListProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishListProducts" ADD CONSTRAINT "WishListProducts_wishListId_fkey" FOREIGN KEY ("wishListId") REFERENCES "WishList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
