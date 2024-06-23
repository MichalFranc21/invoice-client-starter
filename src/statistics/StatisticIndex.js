import { useEffect, useState } from "react"
import {StatisticTable} from "./StatisticTable"
import { apiGet } from "../utils/api";
export const StatisticIndex = () => {

    const [invoice, setInvoice] = useState({});
    const [person, setPerson] = useState([]);
    
    useEffect( () => {
        apiGet("/api/invoices/statistics").then((data) => setInvoice(data));
        apiGet("/api/persons/statistics").then((data) => setPerson(data));
    }, []);
    
    
 return <div>
    <StatisticTable
        invoices={invoice}
        persons={person}

    />
 </div>
}