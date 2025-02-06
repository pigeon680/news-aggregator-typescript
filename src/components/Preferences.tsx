// components/Preferences.tsx
import { useState } from 'react';

const Preferences = ({ onSave }: { onSave: (prefs: any) => void }) => {
  const [sources, setSources] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [authors, setAuthors] = useState<string[]>([]);

  const handleSave = () => {
    onSave({ sources, categories, authors });
  };

  return (
    <div className="p-4 border rounded">
      <h3>Select Your Preferences</h3>
      <input type="text" placeholder="Preferred Sources (comma-separated)" onChange={(e) => setSources(e.target.value.split(','))} className="border p-2 rounded w-full" />
      <input type="text" placeholder="Preferred Categories (comma-separated)" onChange={(e) => setCategories(e.target.value.split(','))} className="border p-2 rounded w-full mt-2" />
      <input type="text" placeholder="Preferred Authors (comma-separated)" onChange={(e) => setAuthors(e.target.value.split(','))} className="border p-2 rounded w-full mt-2" />
      <button onClick={handleSave} className="bg-blue-500 text-white p-2 rounded mt-2">Save Preferences</button>
    </div>
  );
};

export default Preferences;
