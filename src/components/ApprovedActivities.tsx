import { useState, useEffect } from "react";
import { fetchApprovedActivitiesMock, type Activity } from "../services/activityService";

export default function ApprovedActivities() {
  // --- states ---
  const [all, setAll]             = useState<Activity[]>([]);
  const [search, setSearch]       = useState("");
  const [filterType, setFilterType] = useState<"" | Activity["type"]>("");
  const [page, setPage]           = useState(1);
  const perPage = 10;

  // --- load data ---
  useEffect(() => {
    fetchApprovedActivitiesMock().then(setAll);
  }, []);

  // --- filter & search ---
  const filtered = all
    .filter(a => filterType === "" || a.type === filterType)
    .filter(a => a.name.toLowerCase().includes(search.toLowerCase()));

  // --- pagination ---
  const totalPages = Math.ceil(filtered.length / perPage);
  const displayed  = filtered.slice((page-1)*perPage, page*perPage);

  return (
    <div className="p-6 space-y-4">
      {/* Search + Filter controls */}
      <div className="flex flex-wrap gap-4 items-center">
        <input
          type="text"
          placeholder="ค้นหาชื่อกิจกรรม..."
          value={search}
          onChange={e => { setPage(1); setSearch(e.target.value); }}
          className="border rounded px-3 py-2 flex-1"
        />
        <select
          value={filterType}
          onChange={e => { setPage(1); setFilterType(e.target.value as any); }}
          className="border rounded px-3 py-2"
        >
          <option value="">ทุกประเภท</option>
          <option value="อาสา">อาสา</option>
          <option value="ช่วยงาน">ช่วยงาน</option>
          <option value="อบรม">อบรม</option>
        </select>
      </div>

      {/* List */}
      <ul className="space-y-3">
        {displayed.map(a => (
          <li key={a.id} className="border p-4 rounded hover:shadow">
            <h3 className="text-lg font-bold">{a.name}</h3>
            <p className="text-sm text-gray-600">{a.type} • {new Date(a.startDate).toLocaleDateString()}</p>
            <p className="mt-1">{a.description}</p>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-2">
        <button
          onClick={() => setPage(p => Math.max(1, p-1))}
          disabled={page === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >‹ ก่อนหน้า</button>

        <span>หน้า {page} / {totalPages}</span>

        <button
          onClick={() => setPage(p => Math.min(totalPages, p+1))}
          disabled={page === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >ถัดไป ›</button>
      </div>
    </div>
  );
}
