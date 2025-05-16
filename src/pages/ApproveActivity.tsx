import { useState } from "react";
import { Link } from "react-router-dom";

export default function ApproveActivity() {
  const [comment, setComment] = useState("");

  const handleApprove = () => {
    // TODO: เรียก API อนุมัติ
    alert("อนุมัติเรียบร้อย");
  };

  const handleReject = () => {
    // TODO: เรียก API ปฏิเสธ
    alert("ปฏิเสธเรียบร้อย");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Back + Title */}
      <div className="bg-orange-200 py-4 px-6 flex items-center space-x-4 shadow">
        <Link to="/activities/edit" className="text-2xl">←</Link>
        <h1 className="text-2xl font-bold">อนุมัติกิจกรรม</h1>
      </div>

      <div className="max-w-3xl mx-auto bg-blue-50 rounded-2xl p-8 mt-6 shadow">
        {/* ฟอร์มเปล่า */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1 font-medium">ชื่อกิจกรรม</label>
          <input
            type="text"
            placeholder="ชื่อกิจกรรม (mock)"
            className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1 font-medium">วัน–เวลา เริ่มต้น</label>
          <input
            type="text"
            placeholder="15 พฤษภาคม 2566 09:00"
            className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1 font-medium">วัน–เวลา สิ้นสุด</label>
          <input
            type="text"
            placeholder="15 พฤษภาคม 2566 12:00"
            className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1 font-medium">รายละเอียด</label>
          <textarea
            placeholder="รายละเอียดกิจกรรม (mock)…"
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg resize-none"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-1 font-medium">
            ความคิดเห็นเพิ่มเติม (ถ้ามี)
          </label>
          <textarea
            placeholder="เพิ่มความคิดเห็น…"
            value={comment}
            onChange={e => setComment(e.target.value)}
            rows={2}
            className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg resize-none"
          />
        </div>

        <div className="flex space-x-4">
          <button
            onClick={handleReject}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg"
          >
            ปฏิเสธ
          </button>
          <button
            onClick={handleApprove}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg"
          >
            อนุมัติ
          </button>
        </div>
      </div>
    </div>
  );
}
