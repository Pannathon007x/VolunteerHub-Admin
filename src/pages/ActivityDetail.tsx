import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  fetchActivityById,
  type Activity,
} from "../services/activityService";
import {
  fetchParticipantsByActivityId,
  type Participant,
} from "../services/participantService";

export default function ActivityDetail() {
  // ดึง id จาก URL params
  const { id } = useParams<{ id: string }>();

  // State
  const [activity, setActivity] = useState<Activity | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(null);

    Promise.all([
      fetchActivityById(id),
      fetchParticipantsByActivityId(id),
    ])
      .then(([actRes, partsRes]) => {
        setActivity(actRes.data);          // ดึง .data ออกมา
        setParticipants(partsRes.data);
      })
      .catch(() => {
        setError("โหลดข้อมูลไม่สำเร็จ");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  // Loading state
  if (loading) {
    return <div className="p-4">กำลังโหลดข้อมูลกิจกรรม…</div>;
  }

  // Error หรือ ไม่พบ activity
  if (error || !activity) {
    return (
      <div className="p-4 text-red-600">
        {error ?? "ไม่พบข้อมูลกิจกรรม"}
      </div>
    );
  }

  // Main render
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* ปุ่มกลับ */}
      <Link to="/activities" className="text-blue-600 hover:underline">
        ← กลับไปยังรายการกิจกรรม
      </Link>

      {/* รายละเอียดกิจกรรม */}
      <section className="bg-white shadow rounded p-6">
        <h1 className="text-3xl font-bold mb-2">{activity.name}</h1>
        <p className="text-gray-600 mb-4">{activity.type}</p>
        <p className="mb-4 whitespace-pre-line">
          {activity.description}
        </p>
        <div className="flex flex-wrap gap-4 text-sm text-gray-700">
          <div>
            เริ่ม: {new Date(activity.startDate).toLocaleString()}
          </div>
          <div>
            สิ้นสุด: {new Date(activity.endDate).toLocaleString()}
          </div>
          <div>รับสูงสุด: {activity.maxParticipants} คน</div>
          <div>สมัครแล้ว: {participants.length} คน</div>
        </div>
      </section>

      {/* รายชื่อนิสิตที่สมัคร */}
      <section className="bg-white shadow rounded p-6">
        <h2 className="text-2xl font-semibold mb-4">
          รายชื่อนิสิตที่สมัคร
        </h2>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">รหัส</th>
              <th className="border px-4 py-2 text-left">ชื่อ–สกุล</th>
              <th className="border px-4 py-2 text-left">สถานะ</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{p.studentId}</td>
                <td className="border px-4 py-2">{p.name}</td>
                <td className="border px-4 py-2">
                  <span
                    className={
                      p.status === "อนุมัติ"
                        ? "text-green-600"
                        : p.status === "ปฏิเสธ"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }
                  >
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
