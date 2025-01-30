"use client"

import '../globals.css'
import { useRouter } from "next/navigation";

export const RegisterProductForm = () => {
    const router = useRouter();

    const handleClick = () => {
        router.push("/cadastroProdutos");
    }

    return (
        <button className="registerPageButton" onClick={handleClick}>Cadastrar Produto</button>
    );
}

