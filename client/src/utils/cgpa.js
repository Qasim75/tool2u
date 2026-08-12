export const UNIVERSITIES = [
  'Generic 4.0 Scale',
  'COMSATS University Islamabad',
  'FAST-NUCES',
  'NUST',
  'University of the Punjab',
  'UET Lahore',
  'LUMS',
  'Bahria University',
  'Air University',
  'IBA Karachi',
  'Other',
];

// Generic 4.0 grade scale used across all universities in this MVP.
export const GRADE_SCALE = [
  { grade: 'A', points: 4.0 },
  { grade: 'A-', points: 3.7 },
  { grade: 'B+', points: 3.3 },
  { grade: 'B', points: 3.0 },
  { grade: 'B-', points: 2.7 },
  { grade: 'C+', points: 2.3 },
  { grade: 'C', points: 2.0 },
  { grade: 'C-', points: 1.7 },
  { grade: 'D+', points: 1.3 },
  { grade: 'D', points: 1.0 },
  { grade: 'F', points: 0.0 },
];

export const gradeToPoints = (grade) => {
  const found = GRADE_SCALE.find((g) => g.grade === grade);
  return found ? found.points : null;
};

export const createEmptyCourse = (id) => ({
  id,
  name: '',
  creditHours: '',
  grade: '',
});

/**
 * @param {Array<{name:string, creditHours:string|number, grade:string}>} courses
 * @returns {{ totalCredits:number, totalGradePoints:number, cgpa:number|null, validCourseCount:number }}
 */
export function calculateCGPA(courses) {
  let totalCredits = 0;
  let totalGradePoints = 0;
  let validCourseCount = 0;

  for (const course of courses) {
    const credits = parseFloat(course.creditHours);
    const points = gradeToPoints(course.grade);
    if (!Number.isFinite(credits) || credits <= 0 || points === null) continue;

    totalCredits += credits;
    totalGradePoints += credits * points;
    validCourseCount += 1;
  }

  const cgpa = totalCredits > 0 ? totalGradePoints / totalCredits : null;

  return { totalCredits, totalGradePoints, cgpa, validCourseCount };
}

export function validateCourse(course) {
  const errors = {};
  if (!course.name.trim()) errors.name = 'Required';

  const credits = parseFloat(course.creditHours);
  if (course.creditHours === '') errors.creditHours = 'Required';
  else if (!Number.isFinite(credits) || credits <= 0 || credits > 6) {
    errors.creditHours = '1–6';
  }

  if (!course.grade) errors.grade = 'Required';

  return errors;
}
