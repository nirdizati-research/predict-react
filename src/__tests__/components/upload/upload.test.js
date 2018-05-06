import {shallow} from 'enzyme/build/index';
import UploadCard from '../../../components/upload/UploadCard';

import * as React from 'react';
import ServerUpload from '../../../components/upload/ServerUpload';
import UploadDouble from '../../../components/upload/UploadDouble';
import UploadDoubleCard from '../../../components/upload/UploadDoubleCard';
import {TextField} from 'react-md';

it('renders single card', () => {
  const element = shallow(<UploadCard/>);
  expect(element).toBeDefined();
  expect(element.find(ServerUpload).length).toBe(1);
});

it('renders upload single', () => {
  const element = shallow(<ServerUpload/>);
  expect(element).toBeDefined();
  expect(element.find(TextField).length).toBe(1);
});

it('renders double card', () => {
  const element = shallow(<UploadDoubleCard/>);
  expect(element).toBeDefined();
  expect(element.find(UploadDouble).length).toBe(1);
});


it('renders upload double', () => {
  const element = shallow(<UploadDouble/>);
  expect(element).toBeDefined();
  expect(element.find(TextField).length).toBe(2);
});
