
import { Question, Category, Difficulty } from './types';

export const INITIAL_QUESTIONS: Question[] = [
  {
    id: '1',
    question: 'A patient with septic shock is receiving norepinephrine at 0.1 mcg/kg/min. The MAP is 58 mmHg. What is the priority nursing action?',
    options: [
      'Decrease the norepinephrine infusion rate',
      'Increase the norepinephrine infusion rate as per protocol to maintain MAP > 65 mmHg',
      'Administer a 500mL bolus of 0.45% Normal Saline',
      'Notify the provider to switch to dopamine'
    ],
    correctAnswer: 1,
    rationale: 'In septic shock, the goal MAP is typically >65 mmHg. Norepinephrine is the first-line vasopressor and should be titrated to reach hemodynamic goals.',
    category: Category.HEMODYNAMICS,
    difficulty: Difficulty.MEDIUM
  },
  {
    id: '2',
    question: 'A patient on mechanical ventilation (Volume Control) has a sudden high-pressure alarm. Which assessment should the nurse perform first?',
    options: [
      'Check the ventilator tubing for condensation',
      'Assess the patient for biting the ETT or secretions',
      'Adjust the high-pressure limit alarm',
      'Call for a stat chest X-ray'
    ],
    correctAnswer: 1,
    rationale: 'The first action for a high-pressure alarm is always to assess the patient for immediate issues like biting the tube, coughing, or needing suctioning.',
    category: Category.VENTILATION,
    difficulty: Difficulty.EASY
  },
  {
    id: '3',
    question: 'Which of the following is an early sign of Increased Intracranial Pressure (ICP)?',
    options: [
      'Cushing\'s Triad',
      'Fixed and dilated pupils',
      'Altered level of consciousness',
      'Decerebrate posturing'
    ],
    correctAnswer: 2,
    rationale: 'A change in LOC is the most sensitive and earliest indicator of neurological decline and rising ICP.',
    category: Category.NEURO,
    difficulty: Difficulty.EASY
  },
  {
    id: '4',
    question: 'A patient with ARDS has a PaO2 of 55 mmHg on FiO2 of 80% and PEEP of 15. The physician orders prone positioning. What is the primary physiological benefit of proning?',
    options: [
      'Improves drainage of oral secretions',
      'Decreases the work of breathing',
      'Recruits dorsal alveoli and improves V/Q matching',
      'Increases cardiac output by decreasing preload'
    ],
    correctAnswer: 2,
    rationale: 'Prone positioning improves oxygenation by redistributing pulmonary blood flow and recruiting collapsed dorsal alveoli.',
    category: Category.VENTILATION,
    difficulty: Difficulty.HARD
  }
];
