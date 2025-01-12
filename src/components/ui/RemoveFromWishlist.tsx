"use client"; // Indica que o componente é renderizado no cliente
import { prismaClient } from "@/lib/prisma";
import Image from "next/image";
import removeItems from "../../assets/removeItems.png";

interface RemoveFromWishlistProps {
    productId: number; // ID do produto a ser removido
    onSuccess?: () => void; // Callback opcional para recarregar ou atualizar a UI
}

const RemoveFromWishlist = ({ productId, onSuccess }: RemoveFromWishlistProps) => {
    const handleRemove = async () => {
        try {
            // Lógica do Prisma (executada no servidor via "server actions")
            "use server";
            await prismaClient.product.delete({
                where: { id: productId.toString() },
            });

            console.log(`Produto com ID ${productId} removido com sucesso!`);

            // Callback para atualizar a UI após a remoção
            if (onSuccess) onSuccess();
        } catch (error) {
            console.error("Erro ao remover o produto:", error);
        }
    };

    return (
        <button onClick={handleRemove} className="text-red-500">
            <Image src={removeItems} alt="Remover" width={20} height={20} />
        </button>
    );
};

export default RemoveFromWishlist;
