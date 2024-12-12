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
  ctrlWrapper(studentController.deleteStudentController),
);
router.put(
  '/students/:studentId',
  ctrlWrapper(studentController.upsertStudentController),
);
router.patch(
  '/students/:studentId',
  ctrlWrapper(studentController.patchStudentController),
);
router.post(
  '/',
  validateBody(studentValidator.createStudentSchema),
  ctrlWrapper(studentController.createStudentController),
);
router.put(
  '/students/:studentId',
  validateBody(studentValidator.createStudentSchema),
  ctrlWrapper(studentController.upsertStudentController),
);

router.patch(
  '/students/:studentId',
  validateBody(studentValidator.updateStudentSchema),
  ctrlWrapper(studentController.patchStudentController),
);

export default router;
