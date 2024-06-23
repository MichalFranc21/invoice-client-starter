import React from "react";
import InputSelect from "../components/InputSelect";
import InputField from "../components/InputField";

export const InvoiceFilter = (props) => {
    const { filter, persons } = props;
    const handleChange = (e) => {
        props.handleChange(e);
    };

    const handleSubmit = (e) => {
        props.handleSubmit(e);
    };

    const handleReset = (e) => {
        e.preventDefault();
        props.handleReset();
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="filter-div">
                <InputSelect
                    name="sellerID"
                    items={persons}
                    handleChange={handleChange}
                    label="Dodavatel"
                    prompt="Nevybráno"
                    value={filter.sellerID || ""}
                />
                <InputSelect
                    name="buyerID"
                    items={persons}
                    handleChange={handleChange}
                    label="Odběratel"
                    prompt="Nevybráno"
                    value={filter.buyerID || ""}
                />
                <InputField
                    type="text"
                    name="product"
                    handleChange={handleChange}
                    label="Produkt"
                    prompt="Nevybráno"
                    value={filter.product || ""}
                />
                <InputField
                    type="number"
                    name="minPrice"
                    handleChange={handleChange}
                    label="Minimalní částka"
                    prompt="Nevybráno"
                    value={filter.minPrice || ""}
                />
                <InputField
                    type="number"
                    name="maxPrice"
                    handleChange={handleChange}
                    label="Maximální částka"
                    prompt="Nevybráno"
                    value={filter.maxPrice || ""}
                />
                <InputField
                    type="number"
                    min="1"
                    name="limit"
                    handleChange={handleChange}
                    label="Počet faktur"
                    prompt="Nevybráno"
                    value={filter.limit || ""}
                />
                </div>
                <br></br>
                <input className="filter-button"
                    type="submit" 
                    value={props.confirm} 
                />
                
                <br/>
                <button
                    type="button"
                    onClick={handleReset}
                >Reset</button>
            </form>
        </div>
    );
};