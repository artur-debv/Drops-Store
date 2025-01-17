"use server";

import { prismaClient } from "@/lib/prisma";

export const addProductToWishlist = async (
    userId: string,
    productId: string,
    wishlistId?: string,
) => {
    let wishlist;

    if (wishlistId) {
        // Encontrar a wishlist pelo ID
        wishlist = await prismaClient.wishList.findFirstOrThrow({
            where: {
                userId: userId,
                id: wishlistId,
            },
        });
    }

    if (!wishlistId) {
        // Se não fornecer wishlistId, encontrar ou criar uma nova
        wishlist = await prismaClient.wishList.findFirst({
            where: {
                userId: userId,
            },
        });

        if (!wishlist) {
            // Se não existir, criar uma nova wishlist
            wishlist = await prismaClient.wishList.create({
                data: {
                    userId: userId,
                    name: 'Favoritos',
                },
            });
        }
    }

    // Adicionando o produto à wishlist na tabela de relacionamento
    if (wishlist) {
        await prismaClient.wishListProducts.create({
            data: {
                productId: productId,
                wishListId: wishlist.id,
            },
        });
    } else {
        throw new Error("Wishlist not found");
    }
};
