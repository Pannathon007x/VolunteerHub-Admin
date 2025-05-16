// src/pages/EditActivities.tsx
import { Link } from "react-router-dom";

type ActivityCard = {
  id: string;
  type: "อบรม" | "อาสา";
  name: string;
  desc: string;
  startDate: string;
  endDate: string;
};

const TYPE_COLORS: Record<ActivityCard["type"], string> = {
  อบรม: "bg-green-200",
  อาสา: "bg-pink-300",
};

const mockActivities: ActivityCard[] = [
  {
    id: "1",
    type: "อบรม",
    name: "Lorem Ipsum",
    desc: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet...",
    startDate: "6/1/2025",
    endDate: "6/1/2025",
  },
  {
    id: "2",
    type: "อบรม",
    name: "Lorem Ipsum",
    desc: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet...",
    startDate: "7/1/2025",
    endDate: "7/1/2025",
  },
  {
    id: "3",
    type: "อาสา",
    name: "Lorem Ipsum",
    desc: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet...",
    startDate: "8/10/2025",
    endDate: "8/10/2025",
  },
  {
    id: "4",
    type: "อบรม",
    name: "Lorem Ipsum",
    desc: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet...",
    startDate: "9/15/2025",
    endDate: "9/15/2025",
  },
];

export default function EditActivities() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Back + Title */}
      <div className="bg-orange-200 py-4 px-6 flex items-center space-x-3 shadow">
        <Link to="/activities" className="text-2xl">
          ←
        </Link>
        <h1 className="text-2xl font-bold">แก้ไขข้อมูลกิจกรรม</h1>
      </div>

      {/* List of cards */}
      <div className="px-6 py-4 space-y-4">
        {mockActivities.map((a) => (
          <div
            key={a.id}
            className="flex overflow-hidden rounded-xl shadow bg-white"
          >
            {/* แถบสีฝั่งซ้าย */}
            <div
              className={`${TYPE_COLORS[a.type]} w-40 flex items-center justify-center`}
            >
              <span className="text-lg font-bold">{a.type}</span>
            </div>

            {/* เนื้อหา */}
            <div className="flex-1 p-6">
              <h2 className="text-xl font-semibold mb-1">{a.name}</h2>
              <p className="italic text-gray-700 mb-2">{a.desc}</p>
              <p className="text-red-600">
                วันที่ {a.startDate} – {a.endDate}
              </p>
            </div>

            {/* ปุ่มแก้ไข */}
            <div className="flex items-center pr-6">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full transition">
                แก้ไข
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
