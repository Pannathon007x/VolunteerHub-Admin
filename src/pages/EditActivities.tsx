// src/pages/EditActivities.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchActivities, type Activity } from "../services/activityService";

// แมปสีบาร์ซ้ายตามประเภท
const TYPE_COLORS: Record<Activity["type"], string> = {
    อาสา: "bg-pink-300",
    ช่วยงาน: "bg-green-200",
    อบรม: "bg-green-200",
};

export default function EditActivities() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchActivities()
            .then(list => setActivities(list))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div className="p-4">กำลังโหลดกิจกรรม...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar จะอยู่ด้านบน */}

            {/* Header เบื้องต้น */}
            <div className="bg-orange-200 py-4 px-6 mb-4 shadow">
                <Link to="/activities/edit" className="text-2xl mr-4">←</Link>
                <span className="text-2xl font-bold">แก้ไขข้อมูลกิจกรรม</span>
            </div>

            <div className="px-6 space-y-4">
                {activities.map((a, idx) => (
                    <div
                        key={a.id}
                        className="flex overflow-hidden rounded-lg shadow-lg bg-gray-200"
                    >
                        {/* แถบสีฝั่งซ้าย */}
                        <div
                            className={`${TYPE_COLORS[a.type]} w-48 flex items-center justify-center`}
                        >
                            <span className="text-xl font-bold">{a.type}</span>
                        </div>

                        {/* เนื้อหา */}
                        <div className="flex-1 p-6">
                            <h2 className="text-2xl font-semibold mb-2">{a.name}</h2>
                            <p className="italic text-gray-700 mb-4">"{a.description}"</p>
                            <p className="text-red-600 mb-2">
                                วันที่ {new Date(a.startDate).toLocaleDateString()} –{" "}
                                {new Date(a.endDate).toLocaleDateString()}
                            </p>
                        </div>

                        {/* ปุ่ม */}
                        <div className="flex items-center pr-6">
                            {idx === 0 ? (
                                <button className="bg-gray-700 text-white px-4 py-2 rounded-full">
                                    ยกเลิก
                                </button>
                            ) : (
                                <Link
                                    to={`/activities/${a.id}/edit`}
                                    className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-full transition"
                                >
                                    แก้ไข
                                </Link>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
