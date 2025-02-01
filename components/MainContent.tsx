import React from 'react';
// import AdminForm from './AdminForm';

type MainContentProps = {
  selectedEntity: string;
};

const MainContent = ({ selectedEntity }: MainContentProps) => {
  return (
    <main className="flex-1 p-4">
      <h2 className="text-2xl font-bold mb-4">
        {selectedEntity.charAt(0).toUpperCase() + selectedEntity.slice(1)}
      </h2>
      {/* <AdminForm selectedEntity={selectedEntity} /> */}
    </main>
  );
};

export default MainContent;