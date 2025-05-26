import React, { useState } from 'react';

const DeveloperBadge: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <button
      aria-label="Toggle Developer Reference Badge"
      onClick={() => setCollapsed(!collapsed)}
      className={\`
        fixed left-1/2 transform -translate-x-1/2 z-30
        bg-pink-100 bg-opacity-20 text-pink-600 font-semibold rounded-full
        px-2 py-0.5 shadow-md select-none
        transition-all duration-300
        focus:outline-none focus:ring-2 focus:ring-pink-400
        \${collapsed ? 'bottom-4 text-xs opacity-50' : 'bottom-10 text-sm opacity-90 px-4 py-1'}
      \`}
      style={{ backdropFilter: 'blur(6px)', cursor: 'pointer' }}
      type="button"
    >
      {collapsed ? 'Dev Ref' : 'Developer Reference'}
    </button>
  );
};

export default DeveloperBadge;
