import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const DataAnalysis = () => {
    const canvasRef = useRef(null);
    const chartRef = useRef(null);

    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d');

        // Destroy the previous chart instance if it exists
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        // Create a new chart instance
        chartRef.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        label: 'Monthly Sales',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                        data: [65, 59, 80, 81, 56, 55, 40],
                    },
                ],
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Month',
                        },
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Sales',
                        },
                    },
                },
            },
        });

        // Cleanup function to destroy the chart instance when the component unmounts
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, []);

    return (
        <div className="w-[800px] p-4 bg-white shadow-lg rounded-lg">
            <canvas ref={canvasRef} width="800" height="400" className="border border-gray-300 bg-gray-100"></canvas>
        </div>
    );
};

export default DataAnalysis;
