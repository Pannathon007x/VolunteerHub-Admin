// src/services/activityService.ts
import api from "../utils/api";
import type { AxiosResponse } from "axios";

export interface ActivityPayload {
  name: string;
  description: string;
  type: "อาสา" | "ช่วยงาน" | "อบรม";
  startDate: string;
  endDate: string;
  maxParticipants: number;
}

export interface Activity extends ActivityPayload {
  id: string;
}

// 0. ฟังก์ชันเดิม: ดึง list ทั้งหมด
export function fetchActivities(): Promise<Activity[]> {
  return fetch("/mocks/activities.json")
    .then(res => {
      if (!res.ok) throw new Error("ไม่สามารถโหลด mock ได้");
      return res.json() as Promise<Activity[]>;
    });
}

// 1. ฟังก์ชันเดิม: ดึงรายละเอียดตาม ID
export function fetchActivityById(
  id: string
): Promise<AxiosResponse<Activity>> {
  return api.get<Activity>(`/activities/${id}`);
}

// 2. ฟังก์ชันเดิม: สร้างกิจกรรมใหม่
export function createActivity(
  data: ActivityPayload
): Promise<AxiosResponse<Activity>> {
  return api.post<Activity>("/activities", data);
}

// 3. ฟังก์ชันเดิม: แก้ไขกิจกรรม
export function updateActivity(
  id: string,
  data: ActivityPayload
): Promise<AxiosResponse<Activity>> {
  return api.put<Activity>(`/activities/${id}`, data);
}

// ────────────────────────────────────────────────────

// 4. ดึงรายการที่รออนุมัติ (เฉพาะ status = pending)
export function fetchPendingActivities(): Promise<AxiosResponse<Activity[]>> {
  return api.get<Activity[]>("/activities", {
    params: { status: "pending" },
  });
}

// 5. อนุมัติกิจกรรม
export function approveActivity(
  id: string
): Promise<AxiosResponse<void>> {
  return api.patch<void>(`/activities/${id}/approve`);
}

// 6. ปฏิเสธกิจกรรม
export function rejectActivity(
  id: string
): Promise<AxiosResponse<void>> {
  return api.patch<void>(`/activities/${id}/reject`);
}


