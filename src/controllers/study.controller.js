import * as studyService from '../services/study.service.js';

export async function createStudy(req, res, next) {
  try {
    const result = await studyService.createStudy(req.body);
    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

export async function getStudy(req, res, next) {
  try {
    const result = await studyService.getStudy();
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function getStudyDetail(req, res, next) {
  try {
    const { studyId } = req.params;
    const study = await studyService.getStudyDetail(studyId);
    return res.status(200).json(study);
  } catch (err) {
    next(err);
  }
}
