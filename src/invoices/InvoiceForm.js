import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiGet, apiPost, apiPut } from "../utils/api";
import InputField from "../components/InputField";
import InputSelect from "../components/InputSelect";

export const InvoiceForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [invoice, setInvoice] = useState({
        invoiceNumber: "",
        seller: { _id: 0 },
        buyer: { _id: 0 },
        issued: "",
        dueDate: "",
        product: "",
        price: "",
        vat: "",
        note: ""
    });

    const [sellerList, setSellerList] = useState([]);
    const [buyerList, setBuyerList] = useState([]);
    const [flashMessage, setFlashMessage] = useState({ show: false, theme: "", text: "" });

    useEffect(() => {
        if (id) {
            apiGet("/api/invoices/" + id).then((data) => setInvoice(data));
        }
        apiGet("/api/persons").then((data) => {
            setSellerList(data);
            setBuyerList(data);
        });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        (id ? apiPut("/api/invoices/" + id, invoice) : apiPost("/api/invoices", invoice))
            .then((data) => {
                setFlashMessage({
                    show: true,
                    theme: "success",
                    text: "Úspěšně dokončeno."
                });
                setTimeout(() => {
                    setFlashMessage({ show: false, theme: "", text: "" });
                    navigate("/invoices");
                }, 2000);
            })
            .catch((error) => {
                console.log(error.message);
                setFlashMessage({
                    show: true,
                    theme: "danger",
                    text: error.message
                });
                setTimeout(() => {
                    setFlashMessage({ show: false, theme: "", text: "" });
                }, 2000);
            });
    };

    return (
        <div>
            <h1>{id ? "Upravit" : "Vytvořit"} fakturu</h1>
            <form onSubmit={handleSubmit}>
                <InputField
                    required={true}
                    type="text"
                    name="invoiceNumber"
                    min="3"
                    label="Číslo faktury"
                    prompt="Zadejte číslo faktury"
                    value={invoice.invoiceNumber}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, invoiceNumber: e.target.value });
                    }}
                />
                <InputSelect
                    name="seller"
                    items={sellerList}
                    label="Dodavatel"
                    prompt="Vyber dodavatele"
                    value={invoice.seller._id}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, seller: { _id: e.target.value } });
                    }}
                />
                <InputSelect
                    name="buyer"
                    items={buyerList}
                    label="Odběratel"
                    prompt="Vyber odběratele"
                    value={invoice.buyer._id}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, buyer: { _id: e.target.value } });
                    }}
                />
                <InputField
                    required={true}
                    type="date"
                    name="issued"
                    label="Datum vydání"
                    prompt="Zadejte datum"
                    value={invoice.issued}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, issued: e.target.value });
                    }}
                />
                <InputField
                    required={true}
                    type="date"
                    name="dueDate"
                    label="Datum splatnosti"
                    prompt="Zadejte datum"
                    value={invoice.dueDate}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, dueDate: e.target.value });
                    }}
                />
                <InputField
                    required={true}
                    type="text"
                    name="product"
                    label="Produkt"
                    min="3"
                    prompt="Zadejte produkt"
                    value={invoice.product}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, product: e.target.value });
                    }}
                />
                <InputField
                    required={true}
                    type="text"
                    name="price"
                    label="Částka"
                    min="3"
                    prompt="Zadejte částku"
                    value={invoice.price}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, price: e.target.value });
                    }}
                />
                <InputField
                    required={true}
                    type="text"
                    name="vat"
                    label="DPH"
                    prompt="Zadejte DPH"
                    value={invoice.vat}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, vat: e.target.value });
                    }}
                />
                <InputField
                    required={true}
                    type="text"
                    name="note"
                    label="Poznámka"
                    prompt="Zadejte poznámku"
                    value={invoice.note}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, note: e.target.value });
                    }}
                />
                <br />
                {flashMessage.show && (
                    <div className={`alert alert-${flashMessage.theme}`}>
                        {flashMessage.text}
                    </div>
                )}
                <input type="submit" className="btn btn-primary" value="Uložit" />
            </form>
        </div>
    );
};
