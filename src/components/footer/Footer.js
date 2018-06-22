import React from 'react';
import {Button, Cell, GridList} from 'react-md';

const FRONTEND_URL = 'https://github.com/nirdizati-research/predict-react';
const BACKEND_URL = 'https://github.com/nirdizati-research/predict-python';

const Footer = () => (
  <GridList component="footer" className="md-grid footer">
    <Cell component="section" size={4}>
      <h4 className="md-title">Contact</h4>
      <Button flat primary href="mailto:nirdizati.research@gmail.com" iconChildren="mail">
        Nirdizati Research
      </Button>
      <Button flat primary href="mailto:tonis.kasekamp@gmail.com" iconChildren="mail">
        Tõnis Kasekamp
      </Button>
    </Cell>
    <Cell component="section" size={8}>
      <h4 className="md-title">Source code</h4>
      <p className="md-body-2">
        Application code is available in public Github repositories.
      </p>
      <Button flat secondary href={FRONTEND_URL} iconClassName="fab fa-github">
        Frontend
      </Button>
      <Button flat secondary href={BACKEND_URL} iconClassName="fab fa-github">
        Backend
      </Button>
    </Cell>
  </GridList>
);

export default Footer;
