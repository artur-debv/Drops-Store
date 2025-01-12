'use client';

import { prismaClient } from "@/lib/prisma";


interface RemoveButtonProps {
  productId: string;
}

const RemoveButton = ({ productId }: RemoveButtonProps) => {

  
  return (
    <div>
      <button
        className="mt-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition"
      >
        Remover
      </button>
    </div>
  );
};

export default RemoveButton;
