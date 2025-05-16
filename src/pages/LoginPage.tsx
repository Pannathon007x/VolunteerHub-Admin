// src/pages/LoginPage.tsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginStudent, type LoginPayload } from "../services/authService";
import { setToken } from "../utils/token";

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<LoginPayload>({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await loginStudent(form);
      const { token, message } = res.data;

      if (token) {
        // เก็บ token
        setToken(token);
        // นำทางไปหน้า activities
        navigate("/activities");
      } else {
        setError(message ?? "เข้าสู่ระบบไม่สำเร็จ");
      }
    } catch (err: any) {
      setError(err.response?.data?.message ?? "เกิดข้อผิดพลาดในการเชื่อมต่อ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">เข้าสู่ระบบ (นักศึกษา)</h2>

        {error && <div className="text-red-600 text-center">{error}</div>}

        <input
          name="email"
          type="email"
          placeholder="อีเมล"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />

        <input
          name="password"
          type="password"
          placeholder="รหัสผ่าน"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg disabled:opacity-50"
        >
          {loading ? "กำลังเข้าสู่ระบบ…" : "เข้าสู่ระบบ"}
        </button>

        <p className="text-center text-sm text-gray-600">
          ยังไม่มีบัญชี?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            ลงทะเบียน
          </Link>
        </p>
      </form>
    </div>
  );
}
