import { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    registerables
} from 'chart.js';

ChartJS.register(...registerables);

const BarDisease = () => {
    const [barData, setBarData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Disease Data',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    });

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/dashboard/')
            .then(response => {
                const data = response.data;
                console.log(data)

                const icd10Code = 'A001';
                const filteredData = data.filter(record => record.code_id === icd10Code);
                console.log(filteredData)

                const groupedData = filteredData.reduce((acc, record) => {
                    const month = new Date(record.date).toLocaleString('default', { month: 'long' });
                    if (!acc[month]) {
                        acc[month] = 0;
                    }
                    acc[month]++;
                    return acc;
                }, {});

                const labels = Object.keys(groupedData);
                const counts = Object.values(groupedData);

                setBarData({
                    labels: labels,
                    datasets: [
                        {
                            label: `Patients Diagnosed with ${icd10Code}`,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                            data: counts,
                        },
                    ],
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div className="w-full h-full p-4 border">
            <Bar data={barData} />
        </div>
    );
};

export default BarDisease;
