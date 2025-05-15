import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function CancelActivity() {
  const { id } = useParams<{ id: string }>();
  const nav    = useNavigate();

  const [reason, setReason] = useState("");

  const handleCancel = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: เรียก API ยกเลิกกิจกรรม ด้วย id, reason
    alert(`ยกเลิกกิจกรรม ${id}\nเหตุผล: ${reason}`);
    nav("/activities");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Back + Title */}
      <div className="bg-blue-100 border-b border-blue-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">
          {/* ปุ่ม Back */}
          <Link to="/activities" className="text-gray-700 hover:text-gray-900">
            ←
          </Link>
          <h1 className="text-xl font-bold text-gray-800">ยกเลิกกิจกรรม</h1>
          {/* ปุ่มปิด X */}
          <Link to="/activities" className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="w-6 h-6" />
          </Link>
        </div>
      </div>

      {/* ฟอร์มยกเลิก */}
      <div className="max-w-3xl mx-auto mt-8 px-4">
        <form
          onSubmit={handleCancel}
          className="bg-red-50 border border-red-200 rounded-2xl p-8 shadow-lg"
        >
          {/* เหตุผลยกเลิก */}
          <div className="mb-6">
            <label className="block text-red-700 font-medium mb-1">เหตุผลการยกเลิก</label>
            <textarea
              placeholder="โปรดระบุเหตุผลในการยกเลิกกิจกรรมนี้…"
              value={reason}
              onChange={e => setReason(e.target.value)}
              rows={4}
              required
              className="w-full bg-white border border-red-300 rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          {/* ปุ่มยืนยันการยกเลิก */}
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition"
          >
            ยืนยันการยกเลิก
          </button>
        </form>
      </div>
    </div>
);
}
