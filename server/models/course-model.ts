import { model, Schema, Types } from 'mongoose';

export interface ICourse extends Document {
  title: string;
  description: string;
  price: number;
  instructor: Types.ObjectId; // Reference to the instructor's user ID
  category: string; // Category of the course
  duration: number; // Duration in days (e.g., 365 for a year)
  createdAt: Date;
  updatedAt: Date;
}

const courseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    instructor: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }, // Only instructors can create courses
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    }, // Category (e.g., Web Development, Data Science)
    duration: {
      type: Number,
      required: true,
    }, // Duration in days
  },
  { timestamps: true },
);

export const Course = model('Course', courseSchema);
