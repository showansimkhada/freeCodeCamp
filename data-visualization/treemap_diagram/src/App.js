import { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import './App.css';

const DATASETS = {
  videogames: {
    TITLE: 'Video Game Sales',
    DESCRIPTION: 'Top 100 Most Sold Video Games Grouped by Platform',
    FILE_PATH:
      'https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/video-game-sales-data.json'
  },
  movies: {
    TITLE: 'Movie Sales',
    DESCRIPTION: 'Top 100 Highest Grossing Movies Grouped By Genre',
    FILE_PATH:
      'https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/movie-data.json'
  },
  kickstarter: {
    TITLE: 'Kickstarter Pledges',
    DESCRIPTION:
      'Top 100 Most Pledged Kickstarter Campaigns Grouped By Category',
    FILE_PATH:
      'https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/kickstarter-funding-data.json'
  }
};
const dataGames = await d3.json(DATASETS.videogames.FILE_PATH);
const dataMovies = await d3.json(DATASETS.movies.FILE_PATH);
const dataKick = await d3.json(DATASETS.kickstarter.FILE_PATH);

function App() {
  var urlParams = new URLSearchParams(window.location.search);
  var data;
  var DATASET;
  switch (urlParams.get('data')) {
    case 'kickstarter':
      data = dataKick;
      DATASET = DATASETS.kickstarter;
      break;
    case 'movies':
      data = dataMovies;
      DATASET = DATASETS.movies;
      break;
    default:
      data = dataGames;
      DATASET = DATASETS.videogames;
  }

  const svgRef = useRef();
  const legendRef = useRef()

  useEffect(() => {
    document.getElementById('title').innerHTML = DATASET.TITLE;
    document.getElementById('description').innerHTML = DATASET.DESCRIPTION;
    var svg = d3.select(svgRef.current)
      .attr('id', 'tree-map'),
      width = 960,
      height = 570;

    svg
      .attr('width', width)
      .attr('height', height);
    
    var fader = function (color) {
      return d3.interpolateRgb(color, '#fff')(0.2);
    };
    var color = d3.scaleOrdinal().range(
      // Recreate .schemeCategory20
      [
        '#1f77b4',
        '#aec7e8',
        '#ff7f0e',
        '#ffbb78',
        '#2ca02c',
        '#98df8a',
        '#d62728',
        '#ff9896',
        '#9467bd',
        '#c5b0d5',
        '#8c564b',
        '#c49c94',
        '#e377c2',
        '#f7b6d2',
        '#7f7f7f',
        '#c7c7c7',
        '#bcbd22',
        '#dbdb8d',
        '#17becf',
        '#9edae5'
      ].map(fader)
    );

    var treemap = d3.treemap()
      .size([width, height])
      .paddingInner(1);
    
    var root = d3
      .hierarchy(data)
      .eachBefore( d => {
        d.data.id = (d.parent ? d.parent.data.id + '.' : '') + d.data.name;
      })
      .sum(sumBySize)
      .sort((a, b) => {
        return b.height - a.height || b.value - a.value;
      });

    treemap(root);

    var cell = svg
      .selectAll('g')
      .data(root.leaves())
      .enter()
      .append('g')
      .attr('class', 'group')
      .attr('transform', d => {
        return 'translate(' + d.x0 + ',' + d.y0 + ')';
      });

    var tooltip = d3.select('#tooltip').attr('class', 'tooltip');

    cell
      .append('rect')
      .attr('id', d => {
        return d.data.id;
      })
      .attr('class', 'tile')
      .attr('width', d => {
        return d.x1 - d.x0;
      })
      .attr('height', d => {
        return d.y1 - d.y0;
      })
      .attr('data-name', d => {
        return d.data.name;
      })
      .attr('data-category', d=> {
        return d.data.category;
      })
      .attr('data-value', d => {
        return d.data.value;
      })
      .attr('fill', d => {
        return color(d.data.category)
      })
      .on('mousemove', (event, d) => {
        tooltip.style('opacity', 0.9)
        tooltip
          .html(
            'Name: ' +
            d.data.name +
            '<br>Category: ' +
            d.data.category +
            '<br>Value: ' +
            d.data.value
          )
          .attr('data-value', d.data.value)
          .style('left', event.pageX + 10 + 'px')
          .style('top', event.pageY - 28 + 'px');
      })
      .on('mouseout', () => {
        tooltip.style('opacity', 0)
      })

    
    cell
      .append('text')
      .attr('class', 'tile-text')
      .selectAll('tspan')
      .data(d => {
        return d.data.name.split(/(?=[A-Z][^A-Z])/g);
      })
      .enter()
      .append('tspan')
      .attr('x', 4)
      .attr('y', (d, i) => {
        return 13 + i * 10;
      })
      .text(d => {
        return d;
      })

    var categories = root.leaves().map(function (nodes) {
      return nodes.data.category;
    });
    categories = categories.filter(function (category, index, self) {
      return self.indexOf(category) === index;
    });

    // legend
    var legend = d3
      .select(legendRef.current)
      .attr('id', 'legend')
      .attr('width', 500);
    var legendWidth = 500;
    const LEGEND_OFFSET = 10;
    const LEGEND_RECT_SIZE = 15;
    const LEGEND_H_SPACING = 150;
    const LEGEND_V_SPACING = 10;
    const LEGEND_TEXT_X_OFFSET = 3;
    const LEGEND_TEXT_Y_OFFSET = -2;
    var legendElemsPerRow = Math.floor(legendWidth / LEGEND_H_SPACING);

    var legendElem = legend
      .select('g')
      .attr('transform', 'translate(60,' + LEGEND_OFFSET + ')')
      .selectAll('g')
      .data(categories)
      .enter()
      .append('g')
      .attr('transform', (d, i) => {
        return (
          'translate(' +
          (i % legendElemsPerRow) * LEGEND_H_SPACING +
          ',' + 
          (Math.floor(i / legendElemsPerRow) * LEGEND_RECT_SIZE + 
          LEGEND_V_SPACING * Math.floor(i / legendElemsPerRow)) + ')'
        )
      });
    
    legendElem
      .append('rect')
      .attr('width', LEGEND_RECT_SIZE)
      .attr('height', LEGEND_RECT_SIZE)
      .attr('class', 'legend-item')
      .attr('fill', function (d) {
        return color(d);
      });

    legendElem
      .append('text')
      .attr('x', LEGEND_RECT_SIZE + LEGEND_TEXT_X_OFFSET)
      .attr('y', LEGEND_RECT_SIZE + LEGEND_TEXT_Y_OFFSET)
      .text(function (d) {
        return d;
      });

  })

  return (
    <div className="App">
      <a href="?data=videogames">Video Game Data Set</a>
      {" | "}
      <a href="?data=movies">Movies Data Set</a>
      {" | "}
      <a href="?data=kickstarter">Kickstarter Data Set</a>
      {/* eslint-disable-next-line */}
      <h1 id="title"></h1>
      <div id="description"></div>
      <svg ref={svgRef}></svg>
      <svg ref={legendRef}>
        <g></g>
      </svg>
      <div id='tooltip' style={{opacity: 0}}></div>
    </div>
  );
}

function sumBySize(d) {
  return d.value;
}

export default App;
