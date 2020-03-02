import React from 'react';
import Tree from 'react-d3-tree';

const myTreeData = [
  {
    name: 'Top Level',
    attributes: {
      keyA: 'val A',
      keyB: 'val B',
      keyC: 'val C',
    },
    children: [
      {
        name: 'Level 2: A',
        attributes: {
          keyA: 'val A',
          keyB: 'val B',
          keyC: 'val C',
        },
        children: [
            {
              name: 'Level 2: A',
              attributes: {
                keyA: 'val A',
                keyB: 'val B',
                keyC: 'val C',
              },
            },
            {
              name: 'Level 2: B',
            },
            {
              name: 'Level 3: B',
            },
            {
              name: 'Level4 : B',
              attributes: {
                  keyA: 'val A',
                  keyB: 'val B',
                  keyC: 'val C',
                },
            },
          ]
      },
      {
        name: 'Level 2: B',
      },
      {
        name: 'Level 3: B',
      },
      {
        name: 'Level4 : B',
        attributes: {
            keyA: 'val A',
            keyB: 'val B',
            keyC: 'val C',
          },
      },
    ],
  },
];
class R3DecisionTree extends React.Component {
  render() {
    return (
      <div style={{width: '80em', height: '100em'}}>
        <Tree data={myTreeData} />
        </div>
    );
}
}
export default R3DecisionTree;

