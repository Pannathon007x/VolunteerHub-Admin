import { Link } from "react-router-dom";

export interface ActivityCardProps {
  id: string;
  name: string;
  description: string;
  type: "อาสา" | "ช่วยงาน" | "อบรม";
  startDate: string; // ISO string
  endDate: string;   // ISO string
  leftColor: string; // Tailwind class เช่น "bg-pink-300"
}

export default function ActivityCard({
  id,
  name,
  description,
  type,
  startDate,
  endDate,
  leftColor,
}: ActivityCardProps) {
  return (
    <div className="flex overflow-hidden rounded-lg shadow bg-gray-100">
      {/* แถบสีฝั่งซ้าย */}
      <div className={`${leftColor} w-24 flex items-center justify-center`}>
        <span className="font-bold">{type}</span>
      </div>

      {/* เนื้อหา */}
      <div className="flex-1 p-4">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-gray-700 italic mb-2">"{description}"</p>
        <p className="text-sm text-red-600">
          วันที่ {new Date(startDate).toLocaleDateString()} –{" "}
          {new Date(endDate).toLocaleDateString()}
        </p>
      </div>

      {/* ปุ่มดูรายละเอียด */}
      <div className="flex items-center pr-4">
        <Link
          to={`/activities/${id}`}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
        >
          ดูรายละเอียด
        </Link>
      </div>
    </div>
  );
}
