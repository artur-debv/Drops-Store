// /pages/api/shop/products/delete.ts

import { NextApiRequest, NextApiResponse } from "next";
import { prismaClient } from "@/lib/prisma"; // Certifique-se de ajustar o caminho do prisma se necessário

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "DELETE") {
        return res.status(405).json({ error: "Método não permitido" });
    }

    const { productId } = req.body; // Certifique-se de que o `productId` está vindo no corpo da requisição

    if (!productId) {
        return res.status(400).json({ error: "ID do produto não fornecido" });
    }

    try {
        await prismaClient.product.delete({
            where: { id: productId },
        });

        return res.status(200).json({ message: "Produto removido com sucesso!" });
    } catch (error) {
        console.error("Erro ao excluir produto:", error);
        return res.status(500).json({ error: "Erro ao excluir produto" });
    }
}
