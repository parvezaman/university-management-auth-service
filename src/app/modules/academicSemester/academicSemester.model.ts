import httpStatus from 'http-status';
import { Schema, model } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import {
  academicSemesterCodes,
  academicSemesterMonths,
  academicSemesterTitles,
} from './academicSemester.constant';
import {
  AcademicSemesterModel,
  IAcademicSemester,
} from './academicSemester.interface';

export const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: { type: String, required: true, enum: academicSemesterTitles },
    year: { type: Number, required: true },
    code: { type: String, required: true, enum: academicSemesterCodes },
    startMonth: { type: String, required: true, enum: academicSemesterMonths },
    endMonth: { type: String, required: true, enum: academicSemesterMonths },
  },
  {
    timestamps: true,
  }
);

// handling same year and same semester issue using mongoose pre hook
academicSemesterSchema.pre('save', async function (next) {
  const doesExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });

  if (doesExist) {
    throw new ApiError(httpStatus.CONFLICT, 'Academic semester already exists');
  }

  next();
});

/* 
You can create same title in different year but not in the same year.eg:
2023 -> Autumn
2024 -> Autumn
2023 -> Summer
2023 -> Fall

but creating again 
2023/2024 -> Autumn is not possible. 

you cant hadle it with title unique. because that way you wont be able to create another Autumn in another year. 
that why you need to handle it manually

our logic is:
sameYear && sameTitle -> duplicate entry.
and we need to prevent the duplicate entry
*/

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema
);
