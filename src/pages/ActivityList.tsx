import { useEffect, useState } from "react";
import { Link } from "react-router-dom";            // ← import Link
import { fetchActivities, type Activity } from "../services/activityService";

export default function ActivityList() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchActivities()
            .then(res => setActivities(res))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div className="p-4">กำลังโหลดกิจกรรม...</div>;
    }

    return (
        <div className="p-4 space-y-4">
            {activities.map(a => (
                <div
                    key={a.id}
                    className="flex items-center justify-between border p-4 rounded hover:shadow"
                >
                    {/* ชื่อและประเภทกิจกรรม */}
                    <div>
                        <h3 className="text-lg font-bold">{a.name}</h3>
                        <p className="text-sm text-gray-600">{a.type}</p>
                    </div>

                    {/* ปุ่มดูรายละเอียด */}
                    <Link
                        to={`/activities/${a.id}`}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    >
                        ดูรายละเอียด
                    </Link>
                </div>
            ))}
        </div>
    );
}
