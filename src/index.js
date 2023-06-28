import React from 'react';

import { createRoot } from 'react-dom/client';

import Figure1 from './jsx/Figure1.jsx';
import Footer from './jsx/Footer.jsx';

const containerFigure1 = document.getElementById('app-root-2023-wir_report_figure1');
if (containerFigure1) {
  const root = createRoot(containerFigure1);
  root.render(<Figure1 />);
}

const containerFooter = document.getElementById('app-root-2023-wir_report_footer');
if (containerFooter) {
  const root = createRoot(containerFooter);
  root.render(<Footer />);
}
