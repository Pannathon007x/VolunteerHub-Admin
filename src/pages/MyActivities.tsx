// src/pages/MyActivities.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { type Activity, fetchMyActivities } from "../services/activityService";

const TYPE_COLORS: Record<Activity["type"], string> = {
  อาสา: "bg-pink-300",
  ช่วยงาน: "bg-green-200",
  อบรม: "bg-green-200",
};

export default function MyActivities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchMyActivities()
      .then(list => {
        setActivities(list);
      })
      .catch(() => setError("โหลดกิจกรรมของฉันไม่สำเร็จ"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="p-4">กำลังโหลดกิจกรรมของฉัน...</div>;
  }
  if (error) {
    return <div className="p-4 text-red-600">{error}</div>;
  }
  if (activities.length === 0) {
    return <div className="p-4">คุณยังไม่ได้สมัครเข้าร่วมกิจกรรมใด</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header กลับ */}
      <div className="bg-orange-200 py-4 px-6 mb-4 shadow">
        <Link to="/" className="text-2xl mr-4">←</Link>
        <span className="text-2xl font-bold">กิจกรรมของฉัน</span>
      </div>

      <div className="px-6 space-y-4">
        {activities.map(a => (
          <div
            key={a.id}
            className="flex overflow-hidden rounded-lg shadow-lg bg-white"
          >
            {/* แถบสีฝั่งซ้าย */}
            <div className={`${TYPE_COLORS[a.type]} w-48 flex items-center justify-center`}>
              <span className="text-xl font-bold">{a.type}</span>
            </div>

            {/* เนื้อหา */}
            <div className="flex-1 p-6">
              <h2 className="text-2xl font-semibold mb-1">{a.name}</h2>
              <p className="italic text-gray-700 mb-2">"{a.description}"</p>
              <p className="text-red-600">
                วันที่ {new Date(a.startDate).toLocaleDateString()} –{" "}
                {new Date(a.endDate).toLocaleDateString()}
              </p>
            </div>

            {/* ปุ่มยกเลิกสมัคร */}
            <div className="flex items-center pr-6">
              <button className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-full transition">
                ยกเลิก
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
