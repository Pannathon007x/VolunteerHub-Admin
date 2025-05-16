
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

type Activity = {
  id: string;
  name: string;
  description: string;
  type: string;
  startDate: string; // yyyy-MM-dd
  startTime: string; // HH:mm
  endTime: string;   // HH:mm
};

const mock: Activity = {
  id: "123",
  name: "กิจกรรมปลูกป่าเฉลิมพระเกียรติ",
  description: "บรรยายสั้น ๆ เกี่ยวกับกิจกรรมปลูกป่า เพื่อเฉลิมพระเกียรติฯ",
  type: "อบรม",
  startDate: "2025-06-10",
  startTime: "08:30",
  endTime: "12:00",
};

export default function EditActivityDetail() {
  const { id } = useParams<{ id: string }>();
  const [activity, setActivity] = useState<Activity | null>(null);

  useEffect(() => {
    // ตอนนี้ใช้ mock ก่อน
    setActivity(mock);
  }, [id]);

  if (!activity) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12">
      {/* Header Back + Title */}
      <div className="w-full max-w-5xl bg-orange-200 py-4 px-6 shadow flex items-center space-x-3">
        <Link to="/activities/edit" className="text-2xl">←</Link>
        <h1 className="text-2xl font-bold">แก้ไขข้อมูลกิจกรรม</h1>
      </div>

      {/* Card */}
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg mt-8 p-8 relative">
        {/* ปุ่มปิด */}
        <Link
          to="/activities/edit"
          className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 text-2xl"
        >
          ×
        </Link>

        {/* ชื่อกิจกรรม */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-1">ชื่อกิจกรรม</label>
          <input
            type="text"
            value={activity.name}
            readOnly
            className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-2"
          />
        </div>

        {/* รายละเอียด */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-1">รายละเอียด</label>
          <textarea
            value={activity.description}
            readOnly
            rows={4}
            className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-2 resize-none"
          />
        </div>

        {/* วันที่และเวลา */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 mb-1">วันที่จัดกิจกรรม</label>
            <input
              type="date"
              value={activity.startDate}
              readOnly
              className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-2"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">เวลาเริ่มต้น</label>
            <input
              type="time"
              value={activity.startTime}
              readOnly
              className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-2"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">เวลาสิ้นสุด</label>
            <input
              type="time"
              value={activity.endTime}
              readOnly
              className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-2"
            />
          </div>
        </div>

        {/* ประเภท */}
        <div className="mb-8">
          <label className="block text-gray-700 mb-1">ประเภทกิจกรรม</label>
          <input
            type="text"
            value={activity.type}
            readOnly
            className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-2"
          />
        </div>

        {/* ปุ่ม */}
        <div className="flex justify-end space-x-4">
          <Link
            to="/activities/edit"
            className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium rounded-lg"
          >
            ยกเลิก
          </Link>
          <button
            type="button"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
          >
            ยืนยัน
          </button>
        </div>
      </div>
    </div>
  );
}
