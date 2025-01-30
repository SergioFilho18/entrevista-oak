"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation"; // 
import '../globals.css';
import { api } from "../lib/axios";
import { Product } from "../types/product";
import { useEffect, useState } from "react";

const Page = () => {
    const router = useRouter(); 
    const [products, setProducts] = useState<Product[]>([]);
    const [nextId, setNextId] = useState<number>(1); 

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get<Product[]>('/products');
                setProducts(response.data);

                
                const maxId = Math.max(...response.data
                    .map((product) => product.id)
                    .filter((id): id is number => id !== null), 0);

                setNextId(maxId + 1);
            } catch (err) {
                console.error('Algo deu errado: ', err);
            }
        };

        fetchProducts();
    }, []);

    const { register, handleSubmit, reset } = useForm<Product>();

    async function handleCreateProduct(data: Product) {
        const productWithId = { ...data, id: nextId }; 

        try {
            await api.post('/products', productWithId);
            setProducts([...products, productWithId]);
            setNextId((prev) => prev + 1);
            
            alert("Produto Cadastrado com Sucesso!!");

            router.push("/"); 
        } catch (error) {
            console.error("Erro ao cadastrar o produto:", error);
        }

        reset();
    }

    return (
        <div className="areaForm">
            <form onSubmit={handleSubmit(handleCreateProduct)}>
                <div className="custom_input">
                    <label className="lbl">Nome do Produto:</label>
                    <input className="ipt" type="text" placeholder='nome' {...register("Name")} />
                </div>
                
                <div className="custom_input">
                    <label className="lbl">Descrição do Produto:</label>
                    <input className="ipt" type="text" placeholder='descrição' {...register("Description")} />
                </div>
                
                <div className="custom_input">
                    <label className="lbl">Valor do Produto:</label>
                    <input className="ipt" type="number" placeholder='valor' {...register("Value")} />
                </div>

                <div className="custom_input">
                    <label className="lbl">Disponível para Venda:</label>
                    <input className="ipt" type="radio" id="Sim" value={1} {...register("Availability")} />
                    <label htmlFor="Sim">Sim</label>

                    <input className="ipt" type="radio" id="Não" value={0} {...register("Availability")} />
                    <label htmlFor="Não">Não</label>
                </div>

                <button className="registerPageButton" type="submit">Cadastrar Produto</button>
            </form>
        </div>
    );
}

export default Page;
