import { Badge } from "@/components/ui/badge";
import WishlistItem from "@/components/ui/wishlist-item";
import { authOptions } from "@/lib/auth";
import { prismaClient } from "@/lib/prisma";
import { Heart } from "lucide-react";
import { getServerSession } from "next-auth";
import RemoveButton from "@/components/ui/WishListRemove/ButtonRemove";  // Importando o botão de remoção

async function WishListPage() {
  const session = await getServerSession(authOptions);

  // Verificando se o usuário está logado
  if (!session || !session.user) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 p-5">
        <h2 className="font-bold">Acesso Negado!</h2>
        <p className="text-sm opacity-60">Faça login para ver seus favoritos</p>
      </div>
    );
  }

  // Obtendo os produtos da wishlist do usuário
  const wishlist = await prismaClient.product.findMany({
    where: {
      wishlists: {
        some: {
          wishList: {
            userId: session.user.id, // Filtrando pela relação com o usuário
          },
        },
      },
    },
    include: {
      wishlists: true, // Incluindo a relação com a tabela wishlists
    },
  });


  // Verificando se o usuário tem produtos na wishlist
  if (!wishlist.length) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 p-5">
        <h2 className="font-bold">Nenhum favorito!</h2>
        <p className="text-sm opacity-60">
          Adicione produtos à sua lista de favoritos
        </p>
      </div>
    );
  }

  return (
    <div className="p-5 lg:container lg:mx-auto lg:py-10">
      <Badge
        className="w-fit gap-1 border-r-2 border-primary px-3 py-1 text-sm font-semibold uppercase"
        variant="outline"
      >
        <Heart size={16} />
        Favoritos
      </Badge>

      <div className="mt-4 grid grid-cols-2 gap-8">
        {wishlist.map((product) => (
          <div key={product.id} className="flex flex-col items-center">
            {/* Passando os dados corretos do produto para o componente WishlistItem */}
            <WishlistItem key={product.id} product={product} />
            {/* Corrigindo a referência ao wishListId */}
            <RemoveButton productId={product.id} wishListId={product.wishlists[0].wishListId} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default WishListPage;
