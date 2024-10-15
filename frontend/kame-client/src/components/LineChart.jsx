import { Line } from 'react-chartjs-2';
import { useEffect, useState, useRef } from 'react';
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
                label: 'Patients Visiting Today',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
                data: [],
            },
        ],
    });

    const chartRef = useRef(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/dashboard/patients_dashboard/')
            .then(response => {
                const data = response.data;

                const lineLabels = data.map(record => new Date(record.date).toLocaleDateString());
                const lineCounts = data.map(record => record.last_visited);

                setLineData({
                    labels: lineLabels,
                    datasets: [
                        {
                            label: 'Patients Visiting Today',
                            backgroundColor: 'rgba(153, 102, 255, 0.2)',
                            borderColor: 'rgba(153, 102, 255, 1)',
                            borderWidth: 1,
                            data: lineCounts,
                        },
                    ],
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.destroy();
        }
    }, [lineData]);

    return (
        <div className="w-full h-full">
            <Line data={lineData} />
        </div>
    );
};

export default LinePatients;
