import Flourish from '@flourish/live-api';

export function loadStory() {
  const opts = {
    template: '@flourish/line-bar-pie',
    version: '20.4.6',
    api_key: 'OrEH3tBi2BfneA8OnReqr3ysmjZhflFbfpIu8uIlI6zyIA_keWIQYoIQdPxFEtkK',
    container: '#yearInReviewStory',
    bindings: {
      data: {
        label: 'Year',
        metadata: [],
        value: ['Column 1', 'Column 2', 'Column 3', 'Column 4'],
      },
    },
    data: {
      data: [
        {
          Year: '2009', 'Column 1': '36200', 'Column 2': '27200', 'Column 3': '26200', 'Column 4': '17200',
        },
        {
          Year: '2010', 'Column 1': '36600', 'Column 2': '27800', 'Column 3': '26600', 'Column 4': '17800',
        },
        {
          Year: '2011', 'Column 1': '37500', 'Column 2': '28500', 'Column 3': '27500', 'Column 4': '18500',
        },
        {
          Year: '2012', 'Column 1': '38700', 'Column 2': '29400', 'Column 3': '28700', 'Column 4': '19400',
        },
        {
          Year: '2013', 'Column 1': '39600', 'Column 2': '30200', 'Column 3': '29600', 'Column 4': '10200',
        },
        {
          Year: '2014', 'Column 1': '40500', 'Column 2': '30900', 'Column 3': '20500', 'Column 4': '10900',
        },
        {
          Year: '2015', 'Column 1': '41200', 'Column 2': '31500', 'Column 3': '21200', 'Column 4': '11500',
        },
        {
          Year: '2016', 'Column 1': '41803', 'Column 2': '31931', 'Column 3': '21803', 'Column 4': '11931',
        },
        {
          Year: '2017', 'Column 1': '42600', 'Column 2': '32600', 'Column 3': '22600', 'Column 4': '12600',
        },
      ],
    },
  };

  // First we create a new visualization. In this case we're passing in the data here at the beginning,
  // since it's the same data in each slide, but you could just as easily have different data in each slide
  const story = new Flourish.Live(opts);

  // // Create an array of slides. We'll move between these when the user clicks forward and back
  const slides = [
    {
      state: { facet_layout: 'single', chart_type: 'line' },
    },
    {
      state: { facet_layout: 'single', chart_type: 'area_stacked' },
    },
    {
      state: { facet_layout: 'facets', chart_type: 'column_stacked' },
    },
  ];

  // Add some JS to make the controls work
  let currentSlide = 0;
  const prev = document.getElementById('fl-prev');
  const next = document.getElementById('fl-next');

  function updateStory() {
    story.update(slides[currentSlide]);
    prev.setAttribute('class', currentSlide > 0 ? '' : 'disabled');
    next.setAttribute('class', currentSlide === slides.length - 1 ? 'disabled' : '');
  }

  prev.addEventListener('click', () => {
    if (currentSlide > 0) currentSlide -= 1;
    updateStory();
  });
  next.addEventListener('click', () => {
    if (currentSlide < slides.length - 1) currentSlide += 1;
    updateStory();
  });
  updateStory();
}
