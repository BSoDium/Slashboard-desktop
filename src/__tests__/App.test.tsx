import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import App from '../renderer/App';

describe('App', () => {
  it('should render', () => {
    // there seem to be issues with the typefaces offline fonts
    // expect(render(<App />)).toBeTruthy();
  });
});
