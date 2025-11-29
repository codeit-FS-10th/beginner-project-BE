import * as habitService from "../services/habit.service.js";

// ========== 컨트롤러 구현 ==========

// 전체 습관 목록 조회
export const getHabits = async (req, res) => {
  const studyId = +req.params.studyId;

  try {
    const habits = await habitService.getHabits(studyId);
    res.json(habits);
  } catch {
    res.status(500).json({ message: "습관 불러오기 실패" });
  }
};

// 습관 생성
export const createHabit = async (req, res) => {
  const studyId = +req.params.studyId;
  const { name, days = [] } = req.body;

  try {
    const habit = await habitService.createHabit(studyId, req.body);
    res.status(201).json(habit);
  } catch {
    res.status(500).json({ message: "습관 생성 실패" });
  }
};

// 습관 삭제
export const deleteHabit = async (req, res) => {
  const habitId = +req.params.habitId;

  try {
    await habitService.deleteHabit(habitId);
    res.json({ message: "습관 삭제" });
  } catch {
    res.status(500).json({ message: "습관 삭제 실패" });
  }
};

// 오늘의 습관 조회
export const getTodayHabits = async (req, res) => {
  const studyId = +req.params.studyId;
  const today = new Date();
//   const todayStart = startOfDay(today);
//   const tomorrowStart = startOfNextDay(today);

  const weekMap = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const todayKey = weekMap[today.getDay()];

  try {
    const habits = await prisma.hABIT.findMany({
      where: { STUDY_ID: studyId, [todayKey]: true },
      orderBy: { HABIT_ID: "asc" },
    });

    const habitIds = habits.map((h) => h.HABIT_ID);
    const records = await prisma.hABIT_RECORD.findMany({
      where: {
        HABIT_ID: { in: habitIds },
        DATE: { gte: todayStart, lt: tomorrowStart },
      },
    });

    const result = habits.map((h) => {
      const record = records.find((r) => r.HABIT_ID === h.HABIT_ID);
      return { ...h, isDoneToday: record ? record.IS_DONE : false };
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "오늘의 습관 불러오기 실패" });
  }
};

// 오늘 체크 갱신
export const toggleTodayHabit = async (req, res) => {
  const habitId = +req.params.habitId;
  const { isDone } = req.body;
  const today = startOfDay(new Date());

  try {
    const record = await prisma.hABIT_RECORD.upsert({
      where: {
        HABIT_ID_DATE: {
          HABIT_ID: habitId,
          DATE: today,
        },
      },
      update: { IS_DONE: isDone },
      create: { HABIT_ID: habitId, DATE: today, IS_DONE: isDone },
    });

    res.json(record);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "갱신 실패" });
  }
};
