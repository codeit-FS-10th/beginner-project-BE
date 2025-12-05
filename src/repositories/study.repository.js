import prisma from '../config/prisma.client.js';

export function createStudy(data) {
  return prisma.sTUDY.create({
    data,
  });
}

export async function getStudy({ skip, take, sort = "newest" }) {
  if (sort === "point_desc" || sort === "point_asc") {
    const direction = sort === "point_desc" ? "DESC" : "ASC";
    
    const studies = await prisma.$queryRawUnsafe(`
      SELECT s.*
      FROM STUDY s
      LEFT JOIN POINT_MASTER p ON s.STUDY_ID = p.STUDY_ID
      ORDER BY COALESCE(p.TOTAL_POINT, 0) ${direction}, s.STUDY_ID DESC
      LIMIT ? OFFSET ?
    `, take, skip);
    
    return Promise.all(
      studies.map(async (study) => {
        const studyId = Number(study.STUDY_ID);

        const pointMaster = await prisma.pOINT_MASTER.findUnique({
          where: { STUDY_ID: studyId },
        });
        
        const emojis = await prisma.eMOJI.findMany({
          where: { STUDY_ID: studyId },
        });
        
        return {
          ...study,
          STUDY_ID: studyId,
          POINT_MASTER: pointMaster,
          EMOJI: emojis,
        };
      })
    );
  }

  let orderBy;

  switch (sort) {
    case "newest":
      orderBy = { REG_DATE: "desc" }; 
      break;
    case "oldest":
      orderBy = { REG_DATE: "asc" }; 
      break;
    default:
      orderBy = { REG_DATE: "desc" }; 
  }

  return prisma.sTUDY.findMany({
    skip,
    take,
    orderBy,
    include: {
      POINT_MASTER: true, 
      EMOJI: {
        select: {
          CODE: true,
          COUNTING: true,
        },
      },
    },
  });
}

// 전체 개수 카운트용
export function countStudies() {
  return prisma.sTUDY.count();
}

// 스터디 단건 조회
export async function findStudyById(studyId) {
  return prisma.sTUDY.findUnique({
    where: { STUDY_ID: studyId },
    include: {
      POINT_MASTER: true,
      EMOJI: {
        select: {
          CODE: true,
          COUNTING: true,
        },
      },
    },
  });
}

// 스터디 수정
export async function updateStudy(studyId, data) {
  return prisma.sTUDY.update({
    where: { STUDY_ID: Number(studyId) },
    data,
  });
}

// 스터디 삭제
export async function deleteStudy(studyId) {
  return prisma.sTUDY.delete({
    where: { STUDY_ID: Number(studyId) },
  });
}

// Warning! : Prisma 모델명이 STUDY라서 prisma.sTUDY 로 접근해야 함
