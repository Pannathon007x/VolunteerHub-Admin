import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { XMarkIcon } from "@heroicons/react/24/outline";

export default function CloseActivity() {
  const { id } = useParams<{ id: string }>();
  const nav = useNavigate();

  const [closeDate, setCloseDate] = useState("");
  const [reason, setReason]       = useState("");

  const handleClose = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: เรียก API ปิดกิจกรรม ด้วย id, closeDate, reason
    alert(`ปิดกิจกรรม ${id} วันที่ ${closeDate} เหตุผล: ${reason}`);
    nav("/activities");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Back + Title */}
      <div className="bg-blue-100 border-b border-blue-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">
          <Link to="/activities" className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
            ← กลับ
          </Link>
          <h1 className="text-xl font-bold text-gray-800">ปิดกิจกรรม</h1>
          {/* ปุ่มปิดมุมบนขวา (X) */}
          <Link to="/activities" className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="w-6 h-6" />
          </Link>
        </div>
      </div>

      {/* ฟอร์มปิดกิจกรรม */}
      <div className="max-w-4xl mx-auto mt-8 px-4">
        <form
          onSubmit={handleClose}
          className="bg-white rounded-2xl p-8 shadow-lg"
        >
          {/* วันที่ปิดกิจกรรม */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-1">
              วันที่ปิดกิจกรรม
            </label>
            <input
              type="date"
              value={closeDate}
              onChange={e => setCloseDate(e.target.value)}
              required
              className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* หมายเหตุเพิ่มเติม */}
          <div className="mb-8">
            <label className="block text-gray-700 font-medium mb-1">
              หมายเหตุเพิ่มเติม
            </label>
            <textarea
              placeholder="ใส่รายละเอียดที่เกี่ยวข้อง…"
              value={reason}
              onChange={e => setReason(e.target.value)}
              rows={4}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* ปุ่มปิดกิจกรรม */}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition"
          >
            ปิดกิจกรรม
          </button>
        </form>
      </div>
    </div>
  );
}
