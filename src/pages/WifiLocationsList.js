import React from 'react'
import Table from 'react-bootstrap/Table';
import { useParams } from 'react-router-dom';
import BreadcrumbComp from '../components/BreadcrumbComp';

const WifiLocationsList = () => {
    const { continentName, countryName, cityName } = useParams();

    const table_names = [
        "Image", "Name", "Address", "Amenities", "Star Rating", "Page link"
    ]

    return (
        <>
            <div>
                <BreadcrumbComp continentName={continentName} countryName={countryName} cityName={cityName} />
            </div>
            <h1>{cityName}</h1>
            <Table responsive>
                <thead>
                    <tr>

                        {table_names.map((_, index) => (
                            <th key={index}>{table_names[index]}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: 6 }).map((_, rowIndex) => (
                        <tr key={rowIndex}>
                            {table_names.map((_, colIndex) => (
                                <td key={`${rowIndex}-${colIndex}`}>Table cell</td>
                            ))}
                        </tr>
                    ))}
                </tbody>

            </Table>
        </>
    );


}

export default WifiLocationsList