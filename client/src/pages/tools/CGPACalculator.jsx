import { useMemo, useState } from 'react';
import { Plus, Trash2, RotateCcw, Copy, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { useClipboard } from '@/hooks/useClipboard';
import {
  UNIVERSITIES,
  GRADE_SCALE,
  createEmptyCourse,
  calculateCGPA,
  validateCourse,
} from '@/utils/cgpa';

let nextId = 1;

export default function CGPACalculator() {
  const [university, setUniversity] = useState(UNIVERSITIES[0]);
  const [courses, setCourses] = useState([createEmptyCourse(nextId++), createEmptyCourse(nextId++)]);
  const [errors, setErrors] = useState({});
  const [showResult, setShowResult] = useState(false);
  const { copy } = useClipboard();

  const result = useMemo(() => calculateCGPA(courses), [courses]);

  const updateCourse = (id, patch) => {
    setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));
    setShowResult(false);
  };

  const addCourse = () => {
    setCourses((prev) => [...prev, createEmptyCourse(nextId++)]);
    setShowResult(false);
  };

  const removeCourse = (id) => {
    setCourses((prev) => (prev.length > 1 ? prev.filter((c) => c.id !== id) : prev));
    setShowResult(false);
  };

  const handleReset = () => {
    setCourses([createEmptyCourse(nextId++), createEmptyCourse(nextId++)]);
    setErrors({});
    setShowResult(false);
    setUniversity(UNIVERSITIES[0]);
  };

  const handleCalculate = () => {
    const nextErrors = {};
    courses.forEach((course) => {
      const courseErrors = validateCourse(course);
      if (Object.keys(courseErrors).length > 0) nextErrors[course.id] = courseErrors;
    });
    setErrors(nextErrors);
    setShowResult(Object.keys(nextErrors).length === 0);
  };

  const handleCopy = () => {
    if (result.cgpa === null) return;
    const summary = [
      `University: ${university}`,
      `Total Credit Hours: ${result.totalCredits}`,
      `Total Grade Points: ${result.totalGradePoints.toFixed(2)}`,
      `CGPA: ${result.cgpa.toFixed(2)} / 4.0`,
    ].join('\n');
    copy(summary, 'Result copied to clipboard');
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="p-6">
        <Select
          label="University"
          value={university}
          onChange={(e) => setUniversity(e.target.value)}
          hint="Grading is calculated on a generic 4.0 scale for every university"
        >
          {UNIVERSITIES.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </Select>

        {/* Dynamic Animated List */}
        <div className="mt-6 flex flex-col gap-4">
          <AnimatePresence initial={false}>
            {courses.map((course, i) => {
              const courseErrors = errors[course.id] || {};
              return (
                <motion.div
                  key={course.id}
                  layout
                  initial={{ opacity: 0, y: -12, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className="grid grid-cols-1 gap-3 rounded-xl border border-ink/10 p-4 sm:grid-cols-[1fr_120px_120px_44px] sm:items-start dark:border-white/10"
                >
                  <Input
                    label={i === 0 ? 'Course name' : undefined}
                    aria-label={i === 0 ? undefined : 'Course name'}
                    placeholder={`Course ${i + 1}`}
                    value={course.name}
                    onChange={(e) => updateCourse(course.id, { name: e.target.value })}
                    error={courseErrors.name}
                  />
                  <Input
                    label={i === 0 ? 'Credit hrs' : undefined}
                    aria-label={i === 0 ? undefined : 'Credit hours'}
                    type="number"
                    min="1"
                    max="6"
                    placeholder="3"
                    value={course.creditHours}
                    onChange={(e) => updateCourse(course.id, { creditHours: e.target.value })}
                    error={courseErrors.creditHours}
                  />
                  <Select
                    label={i === 0 ? 'Grade' : undefined}
                    aria-label={i === 0 ? undefined : 'Grade'}
                    value={course.grade}
                    onChange={(e) => updateCourse(course.id, { grade: e.target.value })}
                    error={courseErrors.grade}
                  >
                    <option value="">Select</option>
                    {GRADE_SCALE.map((g) => (
                      <option key={g.grade} value={g.grade}>
                        {g.grade} ({g.points.toFixed(1)})
                      </option>
                    ))}
                  </Select>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => removeCourse(course.id)}
                    disabled={courses.length === 1}
                    aria-label={`Remove ${course.name || `course ${i + 1}`}`}
                    className={`flex h-11 items-center justify-center self-end rounded-xl border border-ink/10 text-ink-soft transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-500 disabled:pointer-events-none disabled:opacity-30 dark:border-white/10 dark:hover:bg-red-500/10 ${i === 0 ? 'sm:mt-6' : ''
                      }`}
                  >
                    <Trash2 className="size-4" />
                  </motion.button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 flex flex-wrap gap-3">
          <motion.div whileTap={{ scale: 0.96 }}>
            <Button variant="secondary" icon={Plus} onClick={addCourse}>
              Add course
            </Button>
          </motion.div>
          <motion.div whileTap={{ scale: 0.96 }}>
            <Button icon={GraduationCap} onClick={handleCalculate}>
              Calculate CGPA
            </Button>
          </motion.div>
          <motion.div whileTap={{ scale: 0.96 }}>
            <Button variant="ghost" icon={RotateCcw} onClick={handleReset}>
              Reset
            </Button>
          </motion.div>
        </div>
      </Card>

      {/* Animated Result Card */}
      <AnimatePresence>
        {showResult && result.cgpa !== null && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            <Card className="relative overflow-hidden p-6">
              <span className="absolute inset-x-0 top-0 h-1 bg-cat-students" aria-hidden="true" />
              <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
                <div>
                  <p className="text-sm font-medium text-ink-soft dark:text-white/55">Your CGPA</p>
                  <p className="font-mono-num text-5xl font-bold text-teal-800 dark:text-mint-400">
                    {result.cgpa.toFixed(2)}
                    <span className="text-lg font-medium text-ink-soft dark:text-white/40"> / 4.0</span>
                  </p>
                </div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="secondary" icon={Copy} onClick={handleCopy}>
                    Copy result
                  </Button>
                </motion.div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 border-t border-ink/10 pt-5 dark:border-white/10">
                <div>
                  <p className="text-xs uppercase tracking-wide text-ink-soft/70 dark:text-white/40">Total Credits</p>
                  <p className="font-mono-num text-xl font-semibold text-ink dark:text-white">{result.totalCredits}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-ink-soft/70 dark:text-white/40">Grade Points</p>
                  <p className="font-mono-num text-xl font-semibold text-ink dark:text-white">
                    {result.totalGradePoints.toFixed(2)}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}