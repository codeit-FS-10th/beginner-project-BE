import * as studyService from '../services/study.service.js';

export async function createStudy(req, res, next) {
  try {
    const result = await studyService.createStudy(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}
