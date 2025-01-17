import { prismaClient } from "@/lib/prisma";

export async function DELETE(request: Request) {
  const body = await request.json();
  const { productId, wishListId } = body;


  if (!productId || !wishListId) {
    return Response.json(
      { error: "ID do produto ou da wishlist não fornecido" },
      { status: 400 }
    );
  }

  try {
    // Atualizando para deletar da tabela intermediária `wishListProducts`
    const deleted = await prismaClient.wishListProducts.deleteMany({
      where: {
       wishListId,
       productId
      }
    });

    console.log(deleted);
    console.log(productId)
    console.log(wishListId)

    if (deleted.count === 0) {
      return Response.json(
        { error: "Produto não encontrado na wishlist" },
        { status: 404 }
      );
    }

    return Response.json(
      { message: "Produto removido com sucesso da wishlist!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao excluir produto da wishlist:", error);
    return Response.json(
      { error: "Erro ao excluir produto da wishlist" },
      { status: 500 }
    );
  }
}
