import React from 'react';

const SevenDay = (props) => {
  return <>{props.boolSwitch ? 'Gathering info' : props.children}</>;
};

export default SevenDay;
