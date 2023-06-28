import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Load helpers.
// import { transpose } from 'csv-transpose';
import CSVtoJSON from './helpers/CSVtoJSON.js';
import ChartLine from './components/ChartLine.jsx';

import '../styles/styles.less';

function Figure2({ lang }) {
  // Data states.
  const [dataFigure, setDataFigure] = useState(false);

  const cleanData = (data) => data.map(el => {
    const labels = Object.keys(el).filter(val => val !== 'Name').map(val => Date.UTC(parseInt(val, 10), 0, 1));
    const values = Object.values(el).map(val => (parseFloat(val))).filter(val => !Number.isNaN(val));

    return ({
      data: values.map((e, i) => ({
        x: labels[i],
        y: e
      })),
      name: el.Name,
      yAxis: 0
    });
  });

  useEffect(() => {
    const data_file = `${(window.location.href.includes('unctad.org')) ? 'https://storage.unctad.org/2023-wir_report/' : './'}assets/data/2023-wir_report_figure2_en.csv`;
    try {
      fetch(data_file)
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.text();
        })
        .then(body => setDataFigure(cleanData(CSVtoJSON((body)))));
    } catch (error) {
      console.error(error);
    }
  }, [lang]);

  return (
    <div className="app">
      {dataFigure && (
      <ChartLine
        data={dataFigure}
        idx="1"
        lang={lang}
        line_width={5}
        note={lang === 'fr' ? '<em>Note:</em>' : (lang === 'es' ? '<em>Nota:</em>' : '<em>Note:</em> ')}
        show_first_label
        source={lang === 'fr' ? '<em>Source:</em>' : (lang === 'es' ? '<em>Fuente:</em> ' : '<em>Source:</em> ')}
        subtitle={lang === 'fr' ? '' : (lang === 'es' ? '' : '')}
        suffix="%"
        title={lang === 'fr' ? '' : (lang === 'es' ? '' : '')}
        xlabel={lang === 'fr' ? '' : (lang === 'es' ? '' : '')}
        ylabel=""
        ymax={100}
        ymin={0}
      />
      )}
      <noscript>Your browser does not support JavaScript!</noscript>
    </div>
  );
}

Figure2.propTypes = {
  lang: PropTypes.string
};

Figure2.defaultProps = {
  lang: 'en'
};

export default Figure2;
