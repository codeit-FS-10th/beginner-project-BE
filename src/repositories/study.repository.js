import prisma from '../config/prisma.client.js';

export function createStudy(data) {
  return prisma.sTUDY.create({
    data,
  });
}

export function getStudy({ skip, take } = {}) {
  let orderBy;

  switch (sort) {
    case "newest":
      orderBy = { createdAt: "desc" }; 
      break;
    case "oldest":
      orderBy = { createdAt: "asc" }; 
      break;
    case "point_desc":
      orderBy = { totalPoint: "desc" }; 
      break;
    case "point_asc":
      orderBy = { totalPoint: "asc" }; 
      break;
    default:
      orderBy = { createdAt: "desc" }; 
  }

  return prisma.sTUDY.findMany({
    skip,
    take,
    orderBy: { REG_DATE: 'desc' },
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
