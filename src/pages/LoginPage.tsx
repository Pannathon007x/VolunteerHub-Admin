
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login, type LoginPayload } from "../services/authService";

export default function LoginPage() {
  const nav = useNavigate();
  const [form, setForm] = useState<LoginPayload>({
    student_id: "",
    password: "",
  });
  const [error, setError]     = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await login(form);
      if (res.data.success && res.data.token) {
        // เก็บ token ไว้ใช้ภายหลัง
        localStorage.setItem("token", res.data.token);
        nav("/activities");
      } else {
        setError(res.data.message || "เข้าสู่ระบบไม่สำเร็จ");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "เกิดข้อผิดพลาด");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit}
            className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-lg space-y-4">
        <h2 className="text-2xl font-bold text-center">เข้าสู่ระบบ</h2>
        {error && <div className="text-red-600">{error}</div>}

        <input name="student_id" placeholder="รหัสนิสิต"
               value={form.student_id} onChange={handleChange}
               required className="w-full px-4 py-2 border rounded-lg"/>

        <input type="password" name="password" placeholder="รหัสผ่าน"
               value={form.password} onChange={handleChange}
               required className="w-full px-4 py-2 border rounded-lg"/>

        <button type="submit" disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg">
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
