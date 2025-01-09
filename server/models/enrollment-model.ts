import { model, Schema, Types } from 'mongoose';
import { EnrollmentStatus } from '../types';

export interface IEnrollment {
  student: Types.ObjectId;
  course: Types.ObjectId;
  enrolledAt: Date;
  expiryDate: Date | null;
  progress: number;
  status: EnrollmentStatus;
  createdAt: Date;
  updatedAt: Date;
}

const enrollmentSchema = new Schema<IEnrollment>(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    enrolledAt: {
      type: Date,
      default: Date.now,
    },
    expiryDate: {
      type: Date,
      required: true, // Auto-calculated from backend
      default: null,
    },
    progress: {
      type: Number,
      default: 0, // Percentage completed
    },
    status: {
      type: String,
      enum: ['enrolled', 'completed', 'dropped', 'expired'],
      default: 'enrolled',
    },
  },
  { timestamps: true },
);

export const Enrollment = model('Enrollment', enrollmentSchema);
