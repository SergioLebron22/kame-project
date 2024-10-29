import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Chart as ChartJS,
    registerables
} from 'chart.js';

ChartJS.register(...registerables);

const LinePatients = () => {
    const [lineData, setLineData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Patients Visiting by Month',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 2,
                data: [],
            },
        ],
    });

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/dashboard/patients_dashboard/')
            .then(response => {
                const data = response.data;

                // Extract the month labels and counts from the response
                const lineLabels = data.map(item => item.month);  // e.g., 'January 2024'
                const lineCounts = data.map(item => item.count);  // Patient counts for each month

                setLineData({
                    labels: lineLabels,
                    datasets: [
                        {
                            label: 'Patients Visiting by Month',
                            backgroundColor: 'rgba(153, 102, 255, 0.2)',
                            borderColor: 'rgba(153, 102, 255, 1)',
                            borderWidth: 2,
                            data: lineCounts,
                        },
                    ],
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div className="w-full h-full">
            <Line data={lineData} options={{ responsive: true }} />
        </div>
    );
};

export default LinePatients;
