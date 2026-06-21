// China drowning deaths by age, GBD 2023, 2010–2023.
const guideYears = [
  2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023
];

// Children under 15 = the <5 bucket + the 5–14 bucket, added together each year.
const kidsUnder15 = [
  28844,25985,24553,23052,21755,20635,19270,17661,15807,14112,
  12952,11553,9953,10484
];

// Elderly = the 70+ bucket.
const elderly70plus = [
  10118,9638,9871,9611,9909,10500,11340,11835,11375,10773,
  10637,11841,12216,12052
];

// Shared look so both charts match the minimal style.
const guideAxes = {
  x: {
    grid: { display: false },
    ticks: { color: '#999999', font: { size: 10 } }
  },
  y: {
    grid: { color: '#f0f0f0' },
    ticks: { color: '#999999', font: { size: 10 } },
    title: { display: true, text: '人数', color: '#999999', font: { size: 10 } }
  }
};

// ===== Chart 1: child drowning decline =====
new Chart(document.getElementById('kidsChart').getContext('2d'), {
  type: 'line',
  data: {
    labels: guideYears,
    datasets: [{
      label: '0–14岁儿童',
      data: kidsUnder15,
      borderColor: '#0071e3',
      backgroundColor: 'rgba(0, 113, 227, 0.08)',
      borderWidth: 1.5,
      pointRadius: 0,
      fill: true,
      tension: 0.3
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: '#999999', font: { size: 11 }, boxWidth: 20 } }
    },
    scales: guideAxes
  }
});

// ===== Chart 2: kids (falling) vs elderly (rising) =====
new Chart(document.getElementById('kidsElderlyChart').getContext('2d'), {
  type: 'line',
  data: {
    labels: guideYears,
    datasets: [
      {
        label: '0–14岁儿童',
        data: kidsUnder15,
        borderColor: '#0071e3',
        borderWidth: 1.5,
        pointRadius: 0,
        tension: 0.3
      },
      {
        label: '70岁以上老年人',
        data: elderly70plus,
        borderColor: '#cc4422',
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
      legend: { labels: { color: '#999999', font: { size: 11 }, boxWidth: 20 } }
    },
    scales: guideAxes
  }
});
