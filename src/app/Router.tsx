import { Route, Routes } from "react-router-dom"
import { TableList } from "./components/tableList";
import Page from "./cadastroProdutos/page";

export function Router () {
    return (
        <Routes>
            <Route path="/" element={<TableList />} />
            <Route path="/cadastroProduto" element={<Page />} />
        </Routes>
    )
}