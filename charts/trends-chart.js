// All three measures from GBD 2023, China, all ages, both sexes, 1990–2023.
const years = [
  1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,
  2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,
  2018,2019,2020,2021,2022,2023
];

const deaths = [
  149415,145411,140625,139059,135342,130859,125526,120386,116749,111620,
  108117,105166,103027,99057,94901,90777,86538,83031,77564,73231,68892,
  63470,62025,59222,57996,57676,57216,55537,51734,47782,45447,45633,
  44830,43471
];

const incidence = [
  448029,441964,434197,425029,414977,404661,393974,382539,370527,358257,
  346188,334129,321856,309739,298344,288239,279209,270636,262590,255405,
  249062,243128,237280,231996,227852,225251,223695,222299,221693,222933,
  226585,229367,227485,227022
];

// DALYs are in the millions, so we divide by 1,000,000 to show "millions" on the axis
const dalys = [
  10652151,10350521,9996211,9854918,9568042,9204618,8762395,8332258,8006364,
  7577990,7264542,7000659,6787510,6447943,6114199,5779874,5446903,5154315,
  4748347,4411863,4091749,3723527,3576772,3381302,3243626,3149316,3032321,
  2867557,2633808,2413577,2266540,2170663,2050367,2006463
].map(v => v / 1000000);

const ctx = document.getElementById('trendsChart').getContext('2d');

new Chart(ctx, {
  type: 'line',
  data: {
    labels: years,
    datasets: [
      {
        label: '溺水死亡人数',
        data: deaths,
        borderColor: '#ff0000',
        borderWidth: 1.5,
        pointRadius: 0,
        tension: 0.3,
        yAxisID: 'y'           // left axis
      },
      {
        label: '溺水发生人数',
        data: incidence,
        borderColor: '#202020',
        borderWidth: 1.5,
        pointRadius: 0,
        tension: 0.3,
        yAxisID: 'y'           // left axis
      },
      {
        label: 'DALYs（百万）',
        data: dalys,
        borderColor: '#ff9900',
        borderWidth: 1.5,
        borderDash: [4, 4],    // dashed so it's clearly the right-axis line
        pointRadius: 0,
        tension: 0.3,
        yAxisID: 'y1'          // right axis
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: {
        labels: { color: '#999999', font: { size: 11 }, boxWidth: 20 }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#999999', font: { size: 10 } }
      },
      y: {                     // left axis — people
        position: 'left',
        grid: { color: '#f0f0f0' },
        ticks: { color: '#999999', font: { size: 10 } },
        title: { display: true, text: '人数', color: '#999999', font: { size: 10 } }
      },
      y1: {                    // right axis — DALYs in millions
        position: 'right',
        grid: { drawOnChartArea: false },   // don't double up the gridlines
        ticks: { color: '#ff9900', font: { size: 10 } },
        title: { display: true, text: 'DALYs（百万）', color: '#ff9900', font: { size: 10 } }
      }
    }
  }
});


// ===== Second chart: Global vs China death counts (2010–2023) =====
// Global data only goes back to 2010 in this export, so this chart starts there.
const compYears = [
  2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023
];

const globalDeaths = [
  347478,336148,330948,325839,320259,318004,316865,310602,302680,297131,
  297209,304915,292640,291140
];

const chinaDeaths = [
  68892,63470,62025,59222,57996,57676,57216,55537,51734,47782,
  45447,45633,44830,43471
];

// "Asia" = East Asia + South Asia + Southeast Asia + High-income Asia Pacific,
// summed year by year. (Central Asia is not included in this total.)
const asiaDeaths = [
  217804,209932,204999,200076,193550,191256,189599,184150,177198,171614,
  170747,177026,165572,162277
];

const ctx2 = document.getElementById('comparisonChart').getContext('2d');

new Chart(ctx2, {
  type: 'line',
  data: {
    labels: compYears,
    datasets: [
      {
        label: '全球',
        data: globalDeaths,
        borderColor: '#202020',
        borderWidth: 1.5,
        pointRadius: 0,
        tension: 0.3
      },
      {
        label: '亚洲',
        data: asiaDeaths,
        borderColor: '#00adb3',
        borderWidth: 1.5,
        pointRadius: 0,
        tension: 0.3
      },
      {
        label: '中国',
        data: chinaDeaths,
        borderColor: '#cc0000',
        borderWidth: 1.5,
        pointRadius: 0,
        tension: 0.3
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: {
        labels: { color: '#999999', font: { size: 11 }, boxWidth: 20 }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#999999', font: { size: 10 } }
      },
      y: {
        grid: { color: '#f0f0f0' },
        ticks: { color: '#999999', font: { size: 10 } },
        title: { display: true, text: '人数', color: '#999999', font: { size: 10 } }
      }
    }
  }
});


// ===== Third chart: drowning deaths by age group (Global, 2010–2023 total) =====
// Each value is the sum of that GBD age bucket across all years 2010–2023.
const ageLabels = ['儿童（0–14岁）', '成年人（15–69岁）', '老年人（70岁以上）'];
const ageDeaths = [1790874, 2118378, 482605];

const ageTotal = ageDeaths.reduce((sum, v) => sum + v, 0);

const ctx3 = document.getElementById('ageChart').getContext('2d');

new Chart(ctx3, {
  type: 'doughnut',
  data: {
    labels: ageLabels,
    datasets: [{
      data: ageDeaths,
      backgroundColor: ['#031A6B', '#3988a5', '#04c2c9'],
      borderColor: '#ffffff',
      borderWidth: 2
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: { color: '#666666', font: { size: 12 }, boxWidth: 14, padding: 16 }
      },
      tooltip: {
        callbacks: {
          // Show both the count and its percentage of the total
          label: function(item) {
            const value = item.parsed;
            const percent = ((value / ageTotal) * 100).toFixed(1);
            return ' ' + value.toLocaleString() + ' 人（' + percent + '%）';
          }
        }
      }
    }
  }
});


// ===== Fourth chart: drowning deaths by age group (China, 2010–2023 total) =====
const ageDeathsChina = [256615, 352602, 151716];
const ageTotalChina = ageDeathsChina.reduce((sum, v) => sum + v, 0);

const ctx4 = document.getElementById('ageChartChina').getContext('2d');

new Chart(ctx4, {
  type: 'doughnut',
  data: {
    labels: ageLabels,                 // reuse the same age labels from the global pie
    datasets: [{
      data: ageDeathsChina,
      backgroundColor: ['#031A6B', '#3988a5', '#04c2c9'],
      borderColor: '#ffffff',
      borderWidth: 2
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: { color: '#666666', font: { size: 12 }, boxWidth: 14, padding: 16 }
      },
      tooltip: {
        callbacks: {
          label: function(item) {
            const value = item.parsed;
            const percent = ((value / ageTotalChina) * 100).toFixed(1);
            return ' ' + value.toLocaleString() + ' 人（' + percent + '%）';
          }
        }
      }
    }
  }
});
