import prisma from '../config/prisma.client.js';

export function createStudy(data) {
  return prisma.sTUDY.create({
    data,
  });
}

// Warning! : Prisma 모델명이 STUDY라서 prisma.sTUDY 로 접근해야 함
