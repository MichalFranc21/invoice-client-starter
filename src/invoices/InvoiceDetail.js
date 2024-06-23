import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGet } from "../utils/api";
import "../index.css"

const InvoiceDetail = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    apiGet("/api/invoices/" + id)
      .then((data) => {
        setInvoice(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="invoice-detail">
      <h1 className="p">Detail faktury:</h1>
      <br></br>
      {invoice && (
        <div>
          <p className="p"><strong>Číslo faktury:</strong> {invoice.invoiceNumber}</p>
          <p className="p"><strong>Datum vydání:</strong> {invoice.issued}</p>
          <p className="p"><strong>Datum splatnosti:</strong> {invoice.dueDate}</p>
          <p className="p"><strong>Product:</strong> {invoice.product}</p>
          <p className="p"><strong>Částka:</strong> {invoice.price} kč</p>
          <p className="p"><strong>DPH:</strong> {invoice.vat}%</p>
          <p className="p"><strong>Poznámka:</strong> {invoice.note}</p>
          <div className="detail-div">
            <div>
          <h2>Detail dodavatele:</h2>
          <p><strong>Jméno:</strong> {invoice.seller.name}</p>
          <p><strong>Daňové číslo:</strong> {invoice.seller.taxNumber}</p>
          <p><strong>Říslo účtu:</strong> {invoice.seller.accountNumber}</p>
          <p><strong>Kód banky:</strong> {invoice.seller.bankCode}</p>
          <p><strong>Telefon:</strong> {invoice.seller.telephone}</p>
          <p><strong>Email:</strong> {invoice.seller.mail}</p>
          <p><strong>Ulice:</strong> {invoice.seller.street}</p>
          <p><strong>PČS:</strong> {invoice.seller.zip}</p>
          <p><strong>Město:</strong> {invoice.seller.city}</p>
          <p><strong>Země:</strong> {invoice.seller.country}</p>
          <p><strong>Poznámka:</strong> {invoice.seller.note}</p>
            </div>
            <div>
          <h2>Detail odběratele:</h2>
          <p><strong>Jméno:</strong> {invoice.buyer.name}</p>
          <p><strong>Datum vydání:</strong> {invoice.buyer.taxNumber}</p>
          <p><strong>Datum splatnosti:</strong> {invoice.buyer.accountNumber}</p>
          <p><strong>Kód banky:</strong> {invoice.buyer.bankCode}</p>
          <p><strong>Telefon:</strong> {invoice.buyer.telephone}</p>
          <p><strong>Email:</strong> {invoice.buyer.mail}</p>
          <p><strong>Ulice:</strong> {invoice.buyer.street}</p>
          <p><strong>PČS:</strong> {invoice.buyer.zip}</p>
          <p><strong>Město:</strong> {invoice.buyer.city}</p>
          <p><strong>Země:</strong> {invoice.buyer.country}</p>
          <p><strong>Poznámka:</strong> {invoice.buyer.note}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceDetail;
