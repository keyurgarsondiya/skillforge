import schedule from 'node-schedule';
import { Enrollment } from '../models/';

export const scheduler = (): void => {
  schedule.scheduleJob('0 0 * * *', async () => {
    console.log('Running job to check expired enrollments...');
    const now = new Date();

    try {
      const result = await Enrollment.updateMany(
        { expiryDate: { $lte: now }, status: 'enrolled' },
        { $set: { status: 'expired' } },
      );

      console.log(`${result.modifiedCount} enrollments expired.`);
    } catch (error) {
      console.error('Error while processing expired enrollments:', error);
    }
  });
};
