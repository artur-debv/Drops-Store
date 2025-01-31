'use client';

import React from "react";
import { useRouter } from "next/navigation";

interface ButtonRemoveProps {
  productId: string;
  wishListId: string;
  onRemove?: () => void;
}


const ButtonRemove: React.FC<ButtonRemoveProps> = ({ productId, wishListId, onRemove }) => {

  const Router = useRouter()

  const handleRemove = async () => {
    try {
      const response = await fetch("https://drops-store.vercel.app/api/delete", { // Caminho correto para a API
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, wishListId }),
      });

      if (response.ok) {
        alert("Produto removido com sucesso!");
        if (onRemove) onRemove();
        Router.refresh()
      } else {
        const errorData = await response.json();
        alert(`Erro ao remover produto: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Erro ao chamar a API:", error);
      alert("Erro ao remover produto.");
    }
  };

  return (
    <button
      onClick={handleRemove}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
    >
      Remover
    </button>
  );
};

export default ButtonRemove;
