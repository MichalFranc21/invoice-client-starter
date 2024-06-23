import React, { useEffect, useState } from "react";
import { apiDelete, apiGet } from "../utils/api";
import InvoiceTable from "./InvoiceTable";
import { InvoiceFilter } from "./InvoiceFilter";
import { useParams } from "react-router-dom";

const InvoiceIndex = () => {
    const defaultFilter = {
        buyer: undefined,
        seller: undefined,
        product: undefined,
        minPrice: undefined,
        maxPrice: undefined,
        limit: undefined,
    };

    const { id } = useParams();
    const [invoices, setInvoices] = useState([]);
    const [persons, setPersons] = useState([]);
    const [filter, setFilter] = useState(defaultFilter);
    const [flashMessage, setFlashMessage] = useState({ show: false, theme: "", text: "" });

    const deleteInvoice = async (id) => {
        try {
            await apiDelete("/api/invoices/" + id);
            setFlashMessage({
                show: true,
                theme: "danger",
                text: "Faktura byla smazána."
            });
            setInvoices(invoices.filter((item) => item._id !== id));
            setTimeout(() => {
                setFlashMessage({ show: false, theme: "", text: "" });
            }, 2000);
        } catch (error) {
            console.log(error.message);
            alert(error.message);
        }
    };

    useEffect(() => {
        if (id) {
            apiGet("/api/invoices/" + id).then((data) => setInvoices([data]));
        } else {
            apiGet("/api/invoices").then((data) => setInvoices(data));
        }
        apiGet("/api/persons").then((data) => setPersons(data));
    }, [id]);

    const handleChange = (e) => {
        if (e.target.value === "false" || e.target.value === "true" || e.target.value === "") {
            setFilter((prevState) => {
                return { ...prevState, [e.target.name]: undefined };
            });
        } else {
            setFilter((prevState) => {
                return { ...prevState, [e.target.name]: e.target.value };
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const params = filter;
        const data = await apiGet("/api/filter", params);
        setInvoices(data);
    };

    const handleReset = () => {
        setFilter(defaultFilter);
        apiGet("/api/invoices").then((data) => setInvoices(data));
    };

    if (!invoices) return <p>Načítání...</p>;

    return (
        <div>
            <h1>Seznam faktur</h1>
            {flashMessage.show && (
                <div className={`alert alert-${flashMessage.theme}`}>
                    {flashMessage.text}
                </div>
            )}
            <InvoiceFilter
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleReset={handleReset}
                persons={persons}
                filter={filter}
                confirm="Filtrovat"
            />
            <InvoiceTable
                deleteInvoice={deleteInvoice}
                items={invoices}
                label="Počet faktur:"
            />
        </div>
    );
};

export default InvoiceIndex;
