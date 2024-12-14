import { Router } from 'express';
import * as studentController from '../controllers/students.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import * as studentValidator from '../validation/students.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

router.get('/students', ctrlWrapper(studentController.getStudentsController));
router.get(
  '/:studentId',
  isValidId,
  ctrlWrapper(studentController.getStudentByIdController),
);
router.post(
  '/students',
  ctrlWrapper(studentController.createStudentController),
);
router.delete(
  '/students/:studentId',
  isValidId,
  ctrlWrapper(studentController.deleteStudentController),
);
router.put(
  '/students/:studentId',
  isValidId,
  validateBody(studentValidator.createStudentSchema),
  ctrlWrapper(studentController.upsertStudentController),
);
router.patch(
  '/students/:studentId',
  isValidId,
  validateBody(studentValidator.updateStudentSchema),
  ctrlWrapper(studentController.patchStudentController),
);
router.post(
  '/',
  validateBody(studentValidator.createStudentSchema),
  ctrlWrapper(studentController.createStudentController),
);

export default router;
