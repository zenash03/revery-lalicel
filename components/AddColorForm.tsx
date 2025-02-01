import React, { useState } from 'react';

const AddColorForm = () => {
  const [name, setName] = useState('');
  const [hex, setHex] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission (e.g., API call)
    console.log({ name, hex });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block">Hex Code</label>
        <input
          type="text"
          value={hex}
          onChange={(e) => setHex(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Color
      </button>
    </form>
  );
};

export default AddColorForm;