import * as studyRepo from '../repositories/study.repository.js';
import bcrypt from 'bcrypt';

//============================== createStudy==============================//

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

//============================== getStudy ==============================//

export async function getStudy({ page, limit , sort = "newest "}) {
  const take = limit;
  const skip = (page - 1) * limit;

  const [studies, total] = await Promise.all([
    studyRepo.getStudy({ skip, take , sort}),
    studyRepo.countStudies(),
  ]);

  const safeStudies = studies.map(({ PASSWORD, ...rest }) => rest);

  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    items: safeStudies,
  };
}

//============================== getStudyDetail ==============================//

export async function getStudyDetail(studyId) {
  if (!studyId) {
    const err = new Error('studyId는 필수입니다.');
    err.status = 400;
    throw err;
  }

  const id = Number(studyId);
  if (Number.isNaN(id)) {
    const err = new Error('studyId는 숫자여야 합니다.');
    err.status = 400;
    throw err;
  }

  const study = await studyRepo.findStudyById(id);

  if (!study) {
    const err = new Error('해당 스터디를 찾을 수 없습니다.');
    err.status = 404;
    throw err;
  }

  const { PASSWORD, ...safeStudy } = study;
  return safeStudy;
}

// ============================== verifyStudyPassword ============================== //

export async function verifyStudyPassword(studyId, password) {
  if (!password) {
    const err = new Error('password는 필수입니다.');
    err.status = 400;
    throw err;
  }

  // studyId 유효성 검사 (숫자여야 하니깐)
  const id = Number(studyId);
  if (Number.isNaN(id)) {
    const err = new Error('studyId는 숫자여야 합니다.');
    err.status = 400;
    throw err;
  }

  // 스터디 조회하고 난 뒤
  const study = await studyRepo.findStudyById(id);

  if (!study) {
    const err = new Error('해당 스터디를 찾을 수 없습니다.');
    err.status = 404;
    throw err;
  }

  // 스터디 생성한 비밀번호와 방금 입력한 비밀번호를 비교하겠지?
  const isMatch = await bcrypt.compare(password, study.PASSWORD);

  if (!isMatch) {
    const err = new Error('비밀번호가 일치하지 않습니다.');
    err.status = 401;
    throw err;
  }

  // 성공하면 true 반환
  return { verified: true };
}

// ============================== updateStudy ============================== //

export async function updateStudy(studyId, payload) {
  const id = Number(studyId);
  if (!studyId || Number.isNaN(id)) {
    const err = new Error('유효한 studyId가 필요합니다.');
    err.status = 400;
    throw err;
  }

  const { name, nickname, password, intro, image } = payload || {};

  // 수정할 값이 하나도 없으면 에러
  if (
    name === undefined &&
    nickname === undefined &&
    password === undefined &&
    intro === undefined &&
    image === undefined
  ) {
    const err = new Error('수정할 값이 없습니다.');
    err.status = 400;
    throw err;
  }

  // 실제 UPDATE에 사용할 객체 (DB 컬럼명 기준)
  const updateData = {};

  if (name !== undefined) updateData.NAME = name;
  if (nickname !== undefined) updateData.NICKNAME = nickname;
  if (intro !== undefined) updateData.INTRO = intro;
  if (image !== undefined) updateData.IMAGE = image;

  // 비밀번호 변경 요청이 있으면 해싱 후 반영
  if (password !== undefined) {
    const hashedPassword = await bcrypt.hash(password, 10);
    updateData.PASSWORD = hashedPassword;
  }

  // 존재 여부 확인
  const exist = await studyRepo.findStudyById(id);
  if (!exist) {
    const err = new Error('해당 스터디를 찾을 수 없습니다.');
    err.status = 404;
    throw err;
  }

  // 수정 실행
  const updated = await studyRepo.updateStudy(id, updateData);

  const { PASSWORD, ...safeStudy } = updated;
  return safeStudy;
}

// ============================== deleteStudy ============================== //

export async function deleteStudy(studyId) {
  const id = Number(studyId);
  if (!studyId || Number.isNaN(id)) {
    const err = new Error('유효한 studyId가 필요합니다.');
    err.status = 400;
    throw err;
  }

  const exist = await studyRepo.findStudyById(id);
  if (!exist) {
    const err = new Error('해당 스터디를 찾을 수 없습니다.');
    err.status = 404;
    throw err;
  }

  // 실제 삭제
  await studyRepo.deleteStudy(id);

  return { success: true };
}
