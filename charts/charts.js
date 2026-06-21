const deaths = [
  {year:1990,mean:149415},{year:1991,mean:145411},
  {year:1992,mean:140625},{year:1993,mean:139059},{year:1994,mean:135342},
  {year:1995,mean:130859},{year:1996,mean:125526},{year:1997,mean:120386},
  {year:1998,mean:116749},{year:1999,mean:111620},{year:2000,mean:108117},
  {year:2001,mean:105166},{year:2002,mean:103027},{year:2003,mean:99057},
  {year:2004,mean:94901},{year:2005,mean:90777},{year:2006,mean:86538},
  {year:2007,mean:83031},{year:2008,mean:77564},{year:2009,mean:73231},
  {year:2010,mean:68892},{year:2011,mean:63470},{year:2012,mean:62025},
  {year:2013,mean:59222},{year:2014,mean:57996},{year:2015,mean:57676},
  {year:2016,mean:57216},{year:2017,mean:55537},{year:2018,mean:51734},
  {year:2019,mean:47782},{year:2020,mean:45447},{year:2021,mean:45633},
  {year:2022,mean:44830},{year:2023,mean:43471}
];

// Incidence = number of drowning cases (survivors + deaths). Starts in 1990.
const incidence = [
  {year:1990,mean:448029},{year:1991,mean:441964},{year:1992,mean:434197},
  {year:1993,mean:425029},{year:1994,mean:414977},{year:1995,mean:404661},
  {year:1996,mean:393974},{year:1997,mean:382539},{year:1998,mean:370527},
  {year:1999,mean:358257},{year:2000,mean:346188},{year:2001,mean:334129},
  {year:2002,mean:321856},{year:2003,mean:309739},{year:2004,mean:298344},
  {year:2005,mean:288239},{year:2006,mean:279209},{year:2007,mean:270636},
  {year:2008,mean:262590},{year:2009,mean:255405},{year:2010,mean:249062},
  {year:2011,mean:243128},{year:2012,mean:237280},{year:2013,mean:231996},
  {year:2014,mean:227852},{year:2015,mean:225251},{year:2016,mean:223695},
  {year:2017,mean:222299},{year:2018,mean:221693},{year:2019,mean:222933},
  {year:2020,mean:226585},{year:2021,mean:229367},{year:2022,mean:227485},
  {year:2023,mean:227022}
];

const years = deaths.map(d => d.year);
const means = deaths.map(d => d.mean);

// Line up incidence with the death years: use the value if we have it for that
// year, otherwise null so Chart.js leaves a gap (incidence has no 1980s data)
const incidenceMeans = years.map(y => {
  const match = incidence.find(d => d.year === y);
  return match ? match.mean : null;
});

// This keeps track of whether we have drawn the chart yet
let chartDrawn = false;

function drawChart() {
  const ctx = document.getElementById('deathsChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: years,
      datasets: [
        {
          label: '溺水死亡人数',
          data: means,
          borderColor: '#1a1a1a',
          borderWidth: 1.5,
          pointRadius: 0,
          fill: false,
          tension: 0.3
        },
        {
          label: '溺水发生人数',
          data: incidenceMeans,
          borderColor: '#0071e3',
          borderWidth: 1.5,
          pointRadius: 0,
          fill: false,
          tension: 0.3,
          spanGaps: true
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: '#999999',
            font: { size: 11 },
            boxWidth: 20
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: '#999999', font: { size: 10 } }
        },
        y: {
          grid: { color: '#f0f0f0' },
          ticks: { color: '#999999', font: { size: 10 } }
        }
      }
    }
  });
}

window.addEventListener('scroll', () => {
  // Pan from 30% down to at most 90% — percentages stay inside the image, so no white
  const percent = Math.min(30 + window.scrollY * 0.05, 90);
  document.body.style.backgroundPositionY = percent + '%';
});

document.querySelectorAll('section h2').forEach(heading => {
  heading.addEventListener('click', () => {
    const section = heading.parentElement;
    const slot = section.querySelector('.image-slot');
    const content = section.querySelector('.section-content');

    if (content.style.maxHeight) {
      // Closing: hide the content, bring the image back
      content.style.maxHeight = null;
      slot.style.display = 'flex';
    } else {
      // Opening: show the content, hide the image
      content.style.maxHeight = content.scrollHeight + 'px';
      slot.style.display = 'none';
      // If this section has the chart and we haven't drawn it yet, draw it now
      if (content.querySelector('#deathsChart') && !chartDrawn) {
        drawChart();
        chartDrawn = true;
      }
    }
  });
});
