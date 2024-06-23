
import React from "react";
import {Link} from "react-router-dom";

const InoviceTable = ({label, items, deleteInvoice}) => {
    
    return (
        <div>
            <p>
                {label} {items.length}
            </p>

            <table className="invoice-table">
                <thead>
                <tr>
                    <th className="id">ID</th>
                    <th>Dodavatelé</th>
                    <th>Odběratelé</th>
                    <th>Částka</th>
                    <th>Produkt</th>
                    <th colSpan={3}>Akce</th>
                    
                </tr>
                </thead>
                <tbody>
                {items.map((item, index) => (
                    <tr key={index + 1}>
                        <td className="id">{item._id}</td>
                        <td>{item.seller.name}</td>
                        <td>{item.buyer.name}</td>
                        <td>{item.price} Kč</td>
                        <td>{item.product}</td>
                        <td>
                            <div className="btn-group">
                                <Link
                                    to={"/invoices/show/" + item._id}
                                    className="show-button"
                                >
                                    Zobrazit
                                </Link>
                                <Link
                                    to={"/invoices/edit/" + item._id}
                                    className="edit-button"
                                >
                                    Upravit
                                </Link>
                                <button
                                    onClick={() => deleteInvoice(item._id)}
                                    className="delete-button"
                                >
                                    Odstranit
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Link to={"/invoices/create"} className="btn btn-success">
                Nová faktura
            </Link>
        </div>
    );
};

export default InoviceTable;
