import data from '../Dictionary.json';

export const fetchCourseData = () => {
  return new Promise((resolve, reject) => {
    if (data) {
      resolve(data);
    } else {
      reject(new Error('Error fetching course data'));
    }
  });
};