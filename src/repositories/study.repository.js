import prisma from '../config/prisma.client.js';

export function createStudy(data) {
  return prisma.sTUDY.create({
    data,
  });
}

export function getStudy() {
  return prisma.sTUDY.findMany({
    orderBy: { REG_DATE: 'desc' },
  });
}

// 스터디 단건 조회
export async function findStudyById(studyId) {
  return prisma.STUDY.findUnique({
    where: { STUDY_ID: studyId },
  });
}

// 스터디 수정
export async function updateStudy(studyId, data) {
  return prisma.STUDY.update({
    where: { STUDY_ID: Number(studyId) },
    data,
  });
}

// 스터디 삭제
export async function deleteStudy(studyId) {
  return prisma.STUDY.delete({
    where: { STUDY_ID: Number(studyId) },
  });
}

// Warning! : Prisma 모델명이 STUDY라서 prisma.sTUDY 로 접근해야 함
