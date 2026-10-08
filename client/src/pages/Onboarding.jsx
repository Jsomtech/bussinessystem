import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const STEPS = [
  { title: "What's your business name?", field: 'name', placeholder: 'ABC Furniture' },
  { title: 'What type of business?', field: 'type', options: ['Retail', 'Wholesale', 'Restaurant', 'Furniture', 'Pharmacy', 'Services', 'Other'] },
  { title: 'Upload your logo', field: 'logo' },
  { title: 'Add your first products', field: 'products' },
  { title: 'Add your first customer', field: 'customer' },
  { title: 'Choose your plan', field: 'plan', options: ['Free / Trial', 'Starter', 'Business', 'Enterprise'] },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({});
  const current = STEPS[step];

  const next = async () => {
    if (step < STEPS.length - 1) return setStep(step + 1);
    try {
      const { api } = await import('../api/client');
      await api.post('/onboarding/bootstrap', {
        businessName: data.name,
        businessType: data.type,
        plan: data.plan,
      });
    } catch (e) {
      console.error('Bootstrap failed', e);
    }
    navigate('/app');
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white/70 backdrop-blur-md rounded-2xl shadow p-8">
        <div className="text-xs text-slate-400 mb-2">Step {step + 1} of {STEPS.length}</div>
        <h2 className="text-2xl font-bold text-primary mb-6">{current.title}</h2>

        {current.options ? (
          <div className="space-y-2 mb-6">
            {current.options.map((o) => (
              <label key={o} className="flex items-center gap-2 border rounded-lg p-3">
                <input type="radio" name={current.field} onChange={() => setData({ ...data, [current.field]: o })} />
                {o}
              </label>
            ))}
          </div>
        ) : current.field === 'logo' ? (
          <input type="file" accept="image/*" className="mb-6" />
        ) : (
          <input
            className="w-full border rounded-lg p-3 mb-6"
            placeholder={current.placeholder || 'Skip for now'}
            onChange={(e) => setData({ ...data, [current.field]: e.target.value })}
          />
        )}

        <button onClick={next} className="w-full bg-primary text-white rounded-lg py-3 font-semibold">
          {step < STEPS.length - 1 ? 'Continue' : "You're ready!"}
        </button>
      </div>
    </div>
  );
}
