import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Seoul");

// KST 현재 시각
export function getNowKST() {
  return dayjs().tz();
}

// 출력용 포맷 설정
export function formatDateKST(date) {
  return dayjs(date).tz().format("YYYY-MM-DD HH:mm:ss");
}

// KST 기준 주차 계산
export function getWeekNumber() {
  const now = getNowKST();
  const firstDay = now.startOf("year");
  return Math.floor(now.diff(firstDay, "week")) + 1;
}

// 오늘 요일 (DB 칼럼 키)
export function getTodayField() {
  const dow = getNowKST().day(); // 0 (SUN) ~ 6 (SAT);
  return ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][dow];
}