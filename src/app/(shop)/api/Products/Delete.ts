// /pages/api/shop/products/delete.ts

import { NextApiRequest, NextApiResponse } from "next";
import { prismaClient } from "@/lib/prisma"; // Certifique-se de ajustar o caminho do prisma se necessário

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "DELETE") {
        return res.status(405).json({ error: "Método não permitido" });
    }

    const { productId, wishListId } = req.body; // Agora esperamos que o `productId` e o `wishListId` venham no corpo da requisição.

    if (!productId || !wishListId) {
        return res.status(400).json({ error: "ID do produto ou da wishlist não fornecido" });
    }

    try {
        // Excluindo o produto da wishlist na tabela WishListProducts
        await prismaClient.wishListProducts.deleteMany({
            where: {
                productId,
                wishListId,
            },
        });

        return res.status(200).json({ message: "Produto removido com sucesso da wishlist!" });
    } catch (error) {
        console.error("Erro ao excluir produto da wishlist:", error);
        return res.status(500).json({ error: "Erro ao excluir produto da wishlist" });
    }
}