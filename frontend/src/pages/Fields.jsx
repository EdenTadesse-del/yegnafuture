import { useState } from 'react';
import Modal from '../components/Modal.jsx';
import { useToast } from '../components/Toast.jsx';

const FIELDS = [
  {
    id: 1,
    name: 'Medicine & Health Sciences',
    icon: '🩺',
    description: 'Understanding the human body and helping people stay healthy.',
    subjects: ['Biology', 'Chemistry', 'Mathematics'],
    skills: ['Attention to detail', 'Empathy', 'Scientific reasoning'],
    degrees: ['Medicine (MD)', 'Nursing', 'Pharmacy', 'Public Health'],
    careers: ['Doctor', 'Nurse', 'Pharmacist', 'Researcher'],
  },
  {
    id: 2,
    name: 'Engineering & Technology',
    icon: '⚙️',
    description: 'Designing and building solutions to real-world problems.',
    subjects: ['Mathematics', 'Physics', 'ICT'],
    skills: ['Problem solving', 'Logical thinking', 'Creativity'],
    degrees: ['Civil Engineering', 'Mechanical Engineering', 'Electrical Engineering'],
    careers: ['Civil Engineer', 'Mechanical Engineer', 'Electrical Engineer'],
  },
  {
    id: 3,
    name: 'Computer Science & AI',
    icon: '💻',
    description: 'Software, algorithms, and intelligent systems.',
    subjects: ['Mathematics', 'ICT', 'Physics'],
    skills: ['Programming', 'Algorithms', 'Data analysis'],
    degrees: ['Computer Science', 'Software Engineering', 'Data Science'],
    careers: ['Software Engineer', 'Data Scientist', 'AI Engineer'],
  },
  {
    id: 4,
    name: 'Business & Economics',
    icon: '📊',
    description: 'How money, markets, and organizations work.',
    subjects: ['Mathematics', 'Economics', 'English'],
    skills: ['Analytical thinking', 'Communication', 'Leadership'],
    degrees: ['Business Administration', 'Economics', 'Accounting'],
    careers: ['Entrepreneur', 'Economist', 'Accountant'],
  },
  {
    id: 5,
    name: 'Natural Sciences & Research',
    icon: '🔬',
    description: 'Exploring the physical and natural world through experiments.',
    subjects: ['Biology', 'Chemistry', 'Physics'],
    skills: ['Observation', 'Experimentation', 'Data analysis'],
    degrees: ['Biology', 'Chemistry', 'Physics', 'Environmental Science'],
    careers: ['Research Scientist', 'Lab Technician', 'Ecologist'],
  },
  {
    id: 6,
    name: 'Social Sciences & Humanities',
    icon: '🏛️',
    description: 'Understanding people, societies, and cultures.',
    subjects: ['History', 'Geography', 'English'],
    skills: ['Critical thinking', 'Writing', 'Research'],
    degrees: ['Psychology', 'Sociology', 'History', 'Law'],
    careers: ['Lawyer', 'Psychologist', 'Journalist', 'Diplomat'],
  },
  {
    id: 7,
    name: 'Creative Arts & Design',
    icon: '🎨',
    description: 'Expressing ideas through visual, written, and performing arts.',
    subjects: ['English', 'History', 'ICT'],
    skills: ['Creativity', 'Visual thinking', 'Storytelling'],
    degrees: ['Fine Arts', 'Graphic Design', 'Architecture'],
    careers: ['Graphic Designer', 'Architect', 'Writer', 'Filmmaker'],
  },
];

export default function Fields() {
  const toast = useToast();
  const [selected, setSelected] = useState(null);

  const chooseField = (field) => {
    toast.push(`Exploring ${field.name}!`, 'success');
    setSelected(null);
  };

  return (
    <div className="space-y-6 animate-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Explore Fields</h1>
        <p className="text-sm text-slate-500">
          Discover fields of study that match your interests.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FIELDS.map((f) => (
          <div key={f.id} className="card-hover flex flex-col p-5">
            <span className="text-3xl">{f.icon}</span>
            <h3 className="mt-3 font-bold text-slate-800">{f.name}</h3>
            <p className="mt-1 flex-1 text-sm text-slate-500">{f.description}</p>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {f.subjects.slice(0, 3).map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>

            <button
              onClick={() => setSelected(f)}
              className="btn-primary mt-4 w-full text-sm"
            >
              View details
            </button>
          </div>
        ))}
      </div>

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.name}
        wide
        footer={
          <>
            <button className="btn-secondary" onClick={() => setSelected(null)}>
              Close
            </button>
            <button
              className="btn-primary"
              onClick={() => chooseField(selected)}
            >
              Explore this field
            </button>
          </>
        }
      >
        {selected && (
          <div className="space-y-4">
            <p className="text-sm text-slate-600">{selected.description}</p>

            <div>
              <h4 className="text-sm font-semibold text-slate-700">
                📚 Important subjects
              </h4>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {selected.subjects.map((s) => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-slate-700">
                🛠️ Skills to develop
              </h4>
              <ul className="mt-2 space-y-1">
                {selected.skills.map((s) => (
                  <li key={s} className="text-sm text-slate-600">
                    • {s}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-slate-700">
                🎓 University degrees
              </h4>
              <ul className="mt-2 space-y-1">
                {selected.degrees.map((d) => (
                  <li key={d} className="text-sm text-slate-600">
                    • {d}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-slate-700">
                💼 Possible careers
              </h4>
              <ul className="mt-2 space-y-1">
                {selected.careers.map((c) => (
                  <li key={c} className="text-sm text-slate-600">
                    • {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}