import React from 'react';

const ExampleComponent = () => {
  const isDiv = true; // This should be a string instead of a boolean

  return (
    <div div={isDiv.toString()}> {/* Convert boolean to string */}
      Content goes here
    </div>
  );
};

export default ExampleComponent;
