import { Router } from 'express';
import * as studyController from '../controllers/study.controller.js';

const router = Router();

router.post('/', studyController.createStudy); // 스터디 생성
router.get('/', studyController.getStudy); // 스터디 목록 조회
router.get('/:studyId', studyController.getStudyDetail); // 스터디 단건 조회
router.patch('/:studyId', studyController.updateStudy); // 스터디 수정
router.delete('/:studyId', studyController.deleteStudy); // 스터디 삭제

// 비밀번호 검증 API 추가
router.post('/:studyId/verify-password', studyController.verifyStudyPassword);

export default router;
