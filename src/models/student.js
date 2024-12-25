import { model, Schema } from 'mongoose';
import { typeList } from '../constants/index.js';
import { handleSaveError, setUpdateSettings } from '../db/models/hooks.js';

const studentsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: typeList,
    },
    avgMark: {
      type: Number,
      required: true,
    },
    onDuty: {
      type: Boolean,
      required: true,
      default: false,
    },
    parentId: {
      // нова властивість
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
studentsSchema.post('save', handleSaveError);
studentsSchema.pre('findOneAndUpdate', setUpdateSettings);
studentsSchema.post('findOneAndUpdate', handleSaveError);

export const StudentsCollection = model('students', studentsSchema);
