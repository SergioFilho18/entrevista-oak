import '../globals.css';
import { useEffect, useState } from "react";
import { RegisterProductForm } from "./RegisterProductForm";
import { api } from '@/app/lib/axios';
import { Product } from '@/app/types/product';

export const TableList = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get<Product[]>('/products');
                setProducts(response.data);
            } catch (err) {
                console.error('Algo deu errado: ', err);
            }
        };

        fetchProducts();
    }, []);

    const pesquisarPorMenorValor = () => {
        const MenorValor = [...products].sort((a, b) => a.Value - b.Value);
        setProducts(MenorValor)
    }

    const pesquisarPorMaiorValor = () => {
        const MaiorValor = [...products].sort((a, b) => b.Value - a.Value);
        setProducts(MaiorValor)
    }

    return (
        <div className="body">
            <div className="table_component">
                <table>
                    <thead>
                        <tr>
                            <th>Nome:</th>
                            <th>Valor:</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.Name}</td>
                                <td>{product.Value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='areaOrderButtons'>
                <p>
                    Ordenar por:
                    <button onClick={pesquisarPorMenorValor} className='orderButtons'>Menor Valor</button>
                    <button onClick={pesquisarPorMaiorValor} className='orderButtons'>Maior Valor</button>
                </p>
            </div>
            <RegisterProductForm />
        </div>
    );
};