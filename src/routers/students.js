import { Router } from 'express';
import * as studentController from '../controllers/students.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import * as studentValidator from '../validation/students.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../constants/index.js';

const router = Router();

router.use(authenticate);

router.get(
  '/',
  checkRoles(ROLES.TEACHER),
  ctrlWrapper(studentController.getStudentsController),
);
router.get(
  '/:studentId',
  checkRoles(ROLES.TEACHER),
  isValidId,
  ctrlWrapper(studentController.getStudentByIdController),
);

router.post(
  '/students',
  checkRoles(ROLES.TEACHER),
  validateBody(studentValidator.createStudentSchema),
  ctrlWrapper(studentController.createStudentController),
);
router.delete(
  '/:studentId',
  checkRoles(ROLES.TEACHER),
  isValidId,
  ctrlWrapper(studentController.deleteStudentController),
);
router.put(
  '/:studentId',
  checkRoles(ROLES.TEACHER),
  isValidId,
  validateBody(studentValidator.createStudentSchema),
  ctrlWrapper(studentController.upsertStudentController),
);
router.patch(
  '/:studentId',
  checkRoles(ROLES.TEACHER),
  isValidId,
  validateBody(studentValidator.updateStudentSchema),
  ctrlWrapper(studentController.patchStudentController),
);

export default router;
