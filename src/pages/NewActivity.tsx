import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createActivity, type ActivityPayload } from "../services/activityService";

export default function NewActivity() {
  const navigate = useNavigate();
  const [form, setForm] = useState<ActivityPayload>({
    name: "",
    description: "",
    type: "อาสา",
    startDate: "",
    endDate: "",
    maxParticipants: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]:
        name === "maxParticipants" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await createActivity(form);
      navigate("/activities");
    } catch (err: any) {
      setError(err.response?.data?.message || "เกิดข้อผิดพลาด");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ถ้ามี Navbar อยู่แล้ว ให้วางตรงนี้ */}

      <main className="flex justify-center py-12 px-4">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-center text-xl font-semibold mb-6">สร้างกิจกรรมใหม่</h2>

          {error && (
            <div className="mb-4 text-sm text-red-600 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* ชื่อกิจกรรม */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                ชื่อกิจกรรม
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400"
                placeholder="เช่น ปลูกต้นไม้ชุมชน"
              />
            </div>

            {/* รายละเอียด */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                รายละเอียด
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400 resize-none"
                placeholder="รายละเอียดกิจกรรม…"
              />
            </div>

            {/* ประเภทกิจกรรม */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                ประเภทกิจกรรม
              </label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400"
              >
                <option value="อาสา">อาสา</option>
                <option value="ช่วยงาน">ช่วยงาน</option>
                <option value="อบรม">อบรม</option>
              </select>
            </div>

            {/* วัน-เวลา เริ่มต้น และ สิ้นสุด */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  วัน-เวลา เริ่มต้น
                </label>
                <input
                  type="datetime-local"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  วัน-เวลา สิ้นสุด
                </label>
                <input
                  type="datetime-local"
                  name="endDate"
                  value={form.endDate}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            {/* จำนวนรับสมัครสูงสุด */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                จำนวนรับสมัครสูงสุด
              </label>
              <input
                type="number"
                name="maxParticipants"
                value={form.maxParticipants}
                onChange={handleChange}
                min={1}
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* ปุ่มสร้าง / ยกเลิก */}
            <div className="flex justify-center space-x-6 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-32 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg disabled:opacity-50 transition"
              >
                {loading ? "กำลังสร้าง..." : "สร้าง"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/activities")}
                className="w-32 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg transition"
              >
                ยกเลิก
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
