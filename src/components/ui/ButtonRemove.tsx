// ButtonRemove.tsx
'use client';  // Isso indica que o componente é renderizado no lado do cliente

import React from "react";

interface ButtonRemoveProps {
  productId: string; // O ID do produto que será excluído
  onRemove?: () => void; // Função opcional para executar algo após a remoção
}

const ButtonRemove: React.FC<ButtonRemoveProps> = ({ productId, onRemove }) => {
  const handleRemove = async () => {
    try {
      const response = await fetch("/app/shop/api/Products/Delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });

      if (response.ok) {
        alert("Produto removido com sucesso!");
        if (onRemove) onRemove(); // Chama a função de callback se ela foi passada
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
