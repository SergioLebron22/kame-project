import BarDisease from '../components/BarChart';
import LinePatients from '../components/LineChart';
import PiePatientAge from '../components/PieChart';

export default function AdminPage() {
    return (
        <div className="w-screen p-4 bg-white shadow-lg rounded-lg">
            <div className="flex flex-col space-y-4">
                <BarDisease />
                <div className="flex w-full space-x-4">
                    <div className="w-1/2 h-96 p-4 border">
                        <PiePatientAge />
                    </div>
                    <div className="w-1/2 h-96 p-4 border">
                        <LinePatients />
                    </div>
                </div>
            </div>
        </div>
    );
}
