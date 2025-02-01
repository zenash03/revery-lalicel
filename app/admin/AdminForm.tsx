import React, { useState } from 'react';

type AdminFormProps = {
  selectedEntity: string;
};

const AdminForm = ({ selectedEntity }: AdminFormProps) => {
  const [formData, setFormData] = useState<any>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission for add/update/delete
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {selectedEntity === 'flowers' && (
        <>
          <input type="text" name="name" placeholder="Name" value={formData.name || ''} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded" />
          <input type="number" name="basePrice" placeholder="Base Price" value={formData.basePrice || ''} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded" />
          <input type="text" name="colors" placeholder="Colors" value={formData.colors || ''} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded" />
          <input type="text" name="size" placeholder="Size" value={formData.size || ''} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded" />
          <input type="text" name="image_url" placeholder="Image URL" value={formData.image_url || ''} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded" />
        </>
      )}
      {selectedEntity === 'colors' && (
        <>
          <input type="text" name="name" placeholder="Name" value={formData.name || ''} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded" />
          <input type="text" name="hexColor" placeholder="Hex Color" value={formData.hexColor || ''} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded" />
        </>
      )}
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
    </form>
  );
};

export default AdminForm;
