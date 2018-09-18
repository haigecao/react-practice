/* eslint-disable import/no-dynamic-require, global-require */
import React from 'react';
import './index.scss';

export default function ({ name }) {
  const svg = require(`./icons/${name}.svg`);
  // eslint-disable-next-line
  return <span className="svg-icon" dangerouslySetInnerHTML={{ __html: svg }} />;
}
