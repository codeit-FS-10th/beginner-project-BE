import bcrypt from 'bcrypt';
import * as studyRepo from '../repositories/study.repository.js';

export async function createStudy(payload) {
  const { name, nickname, password, intro, image } = payload;

  // 1) 최소한의 유효성 검사
  if (!name || !nickname || !password) {
    const err = new Error('name, nickname, password는 필수입니다.');
    err.status = 400;
    throw err;
  }

  // 2) 비밀번호 해싱
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3) DB 저장
  const study = await studyRepo.createStudy({
    NAME: name,
    NICKNAME: nickname,
    PASSWORD: hashedPassword,
    INTRO: intro ?? null,
    IMAGE: image ?? null,
    // REG_DATE, UPT_DATE는 DB default 사용
  });

  // 4) 비밀번호는 응답에서 빼주는 게 보통 좋음
  const { PASSWORD, ...safeStudy } = study;
  return safeStudy;
}
