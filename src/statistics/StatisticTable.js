export const StatisticTable = ({ invoices, persons }) => {
    return (
        <div>
            <h1>Statistiky faktur</h1>
            <table className="invoice-table">
                <thead>
                    <tr>
                        <th>Součet částek za aktuální rok</th>
                        <th>Součet všech částek</th>
                        <th>Počet Faktur</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{invoices.currentYearSum + 0} Kč</td>
                        <td>{invoices.allTimeSum + 0} Kč</td>
                        <td>{invoices.invoicesCount}</td>
                    </tr>
                </tbody>
            </table>
            <h1>Statistiky osob</h1>
            <table className="person-stat">
                <thead>
                    <tr>
                        <th>ID osob</th>
                        <th>Jména osob</th>
                        <th>Příjmy</th>
                    </tr>
                </thead>
                <tbody>
                {persons.map((person, index) => (
                    <tr key={index + 1}>
                        <td>{person.personId}</td>
                        <td>{person.personName}</td>
                        <td className="revenue">{person.revenue} Kč</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};