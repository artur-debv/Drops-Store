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
    await prismaClient.product.deleteMany({
      where: {
        id: productId,
      },
    });

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
