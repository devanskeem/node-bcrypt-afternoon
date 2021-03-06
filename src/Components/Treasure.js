import React from 'react';
import AddTreasure from './AddTreasure';

export default function Treasure(props) {
  console.log('props.treasure', props.treasure)
  const treasure = props.treasure.map((item, index) => {
    return <img src={item.image_url} key={index} alt="" />;
  });
  return (
    <div>
      {props.addMyTreasure ? <AddTreasure addMyTreasure={props.addMyTreasure}/> : null}
      {treasure}
    </div>
  );
}
