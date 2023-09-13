import React, { useEffect, useRef } from 'react';
import './App.css';
import * as d3 from 'd3'
const data =  await d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json');

function App() {
  const svgRef = useRef();
  var colorbrewer = {
    RdYlBu: {
      3: ['#fc8d59', '#ffffbf', '#91bfdb'],
      4: ['#d7191c', '#fdae61', '#abd9e9', '#2c7bb6'],
      5: ['#d7191c', '#fdae61', '#ffffbf', '#abd9e9', '#2c7bb6'],
      6: ['#d73027', '#fc8d59', '#fee090', '#e0f3f8', '#91bfdb', '#4575b4'],
      7: [
        '#d73027',
        '#fc8d59',
        '#fee090',
        '#ffffbf',
        '#e0f3f8',
        '#91bfdb',
        '#4575b4'
      ],
      8: [
        '#d73027',
        '#f46d43',
        '#fdae61',
        '#fee090',
        '#e0f3f8',
        '#abd9e9',
        '#74add1',
        '#4575b4'
      ],
      9: [
        '#d73027',
        '#f46d43',
        '#fdae61',
        '#fee090',
        '#ffffbf',
        '#e0f3f8',
        '#abd9e9',
        '#74add1',
        '#4575b4'
      ],
      10: [
        '#a50026',
        '#d73027',
        '#f46d43',
        '#fdae61',
        '#fee090',
        '#e0f3f8',
        '#abd9e9',
        '#74add1',
        '#4575b4',
        '#313695'
      ],
      11: [
        '#a50026',
        '#d73027',
        '#f46d43',
        '#fdae61',
        '#fee090',
        '#ffffbf',
        '#e0f3f8',
        '#abd9e9',
        '#74add1',
        '#4575b4',
        '#313695'
      ]
    },
    RdBu: {
      3: ['#ef8a62', '#f7f7f7', '#67a9cf'],
      4: ['#ca0020', '#f4a582', '#92c5de', '#0571b0'],
      5: ['#ca0020', '#f4a582', '#f7f7f7', '#92c5de', '#0571b0'],
      6: ['#b2182b', '#ef8a62', '#fddbc7', '#d1e5f0', '#67a9cf', '#2166ac'],
      7: [
        '#b2182b',
        '#ef8a62',
        '#fddbc7',
        '#f7f7f7',
        '#d1e5f0',
        '#67a9cf',
        '#2166ac'
      ],
      8: [
        '#b2182b',
        '#d6604d',
        '#f4a582',
        '#fddbc7',
        '#d1e5f0',
        '#92c5de',
        '#4393c3',
        '#2166ac'
      ],
      9: [
        '#b2182b',
        '#d6604d',
        '#f4a582',
        '#fddbc7',
        '#f7f7f7',
        '#d1e5f0',
        '#92c5de',
        '#4393c3',
        '#2166ac'
      ],
      10: [
        '#67001f',
        '#b2182b',
        '#d6604d',
        '#f4a582',
        '#fddbc7',
        '#d1e5f0',
        '#92c5de',
        '#4393c3',
        '#2166ac',
        '#053061'
      ],
      11: [
        '#67001f',
        '#b2182b',
        '#d6604d',
        '#f4a582',
        '#fddbc7',
        '#f7f7f7',
        '#d1e5f0',
        '#92c5de',
        '#4393c3',
        '#2166ac',
        '#053061'
      ]
    }
  };

  useEffect(() => {
    // add title
    d3.select('#title').text('Monthly Global Land-Surface Temperature');

    // add description
    d3.select('#description').html(
      data.monthlyVariance[0].year +
      ' - ' +
      data.monthlyVariance[data.monthlyVariance.length - 1].year + 
      ': base temperature ' + 
      data.baseTemperature +
      '&#8451;'
    )

    var fontSize = 16,
      width = 5 * Math.ceil(data.monthlyVariance.length / 12),
      height = 33 * 12,
      padding = {
        left: 9 * fontSize,
        right: 9 * fontSize,
        top: 1 * fontSize,
        bottom: 8 * fontSize
      }
    
    var svgContainer = d3.select(svgRef.current);

    var tip = d3
      .select('#tooltip')
      .attr('class', 'd3-tip')
      // .attr('id', 'tooltip')
      // .html(function (d) {
      //   return d;
      // })
      // .direction('n')
      // .offset([-10, 0]);

    svgContainer
      .attr('width', width + padding.left + padding.right)
      .attr('height', height + padding.top + padding.bottom);

    // y-axis
    var yScale = d3.scaleBand()
      .domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
      .rangeRound([0, height])
      .padding(0);
    
    var yAxis = d3.axisLeft()
      .scale(yScale)
      .tickValues(yScale.domain())
      .tickFormat(month => {
        var date = new Date(0);
        date.setUTCMonth(month);
        var format = d3.utcFormat('%B');
        return format(date);
      })
      .tickSize(10, 1);

    svgContainer.select('#y-axis')
      .classed('y-axis', true)
      .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')')
      .call(yAxis)
      .append('text')
      .text('Months')
      .style('text-anchor', 'middle')
      .attr('transform', `translate(${-7 * fontSize}, ${height / 2})rotate(-90)`)
      .attr('fill', 'black');

    // x-axis

    var xScale = d3
      .scaleBand()
      .domain(
        data.monthlyVariance.map(v => {
          return v.year;
        })
      )
      .range([0, width])
      .padding(0);
    
    var xAxis = d3.axisBottom()
      .scale(xScale)
      .tickValues(
        xScale.domain().filter(y => {
          return y % 10 === 0;
        })
      )
      .tickFormat(y => {
        var date = new Date(0);
        date.setUTCFullYear(y);
        var format = d3.utcFormat('%Y');
        return format(date);
      })
      .tickSize(10, 1);

    svgContainer
      .select('#x-axis')
      .classed('x-axis', true)
      .attr(
        'transform',
        'translate(' + padding.left + ',' + (height + padding.top) + ')'
      )
      .call(xAxis)
      .append('text')
      .text('Years')
      .style('text-anchor', 'middle')
      .attr('transform', 'translate(' + width / 2 + ',' + 3 * fontSize + ')')
      .attr('fill', 'black');
        
    // legend
    var legendColour = colorbrewer.RdYlBu[11].reverse(),
        legendWidth = 400,
        legendHeight = 300 / legendColour.length;

    var variance = data.monthlyVariance.map(v => {
      return v.variance;
    })

    var minTemp = data.baseTemperature + Math.min.apply(null, variance);
    var maxTemp = data.baseTemperature + Math.max.apply(null, variance);

    var legendThreshold = d3
      .scaleThreshold()
      .domain(( function (min, max, count){
        var array = [],
          step = (max - min) / count,
          base = min;
        for (let i = 1; i < count; i++) {
          array.push(base + i * step);
        }
        return array;
      })(minTemp, maxTemp, legendColour.length))
      .range(legendColour);
    
    var legendX = d3
      .scaleLinear()
      .domain([minTemp, maxTemp])
      .range([0, legendWidth]);

    var legendXAxis = d3
      .axisBottom()
      .scale(legendX)
      .tickSize(10, 0)
      .tickValues(legendThreshold.domain())
      .tickFormat(d3.format('.1f'));

    var legend = svgContainer
      .select('#legend')
      .classed('legend', true)
      .attr(
        'transform',
        'translate(' +
          padding.left +
          ',' +
          (padding.top + height + padding.bottom - 2 * legendHeight) +
          ')'
      );
    
      legend
      .select('g')
      .selectAll('rect')
      .data(
        legendThreshold.range().map(function (color) {
          var d = legendThreshold.invertExtent(color);
          if (d[0] === null) {
            d[0] = legendX.domain()[0];
          }
          if (d[1] === null) {
            d[1] = legendX.domain()[1];
          }
          return d;
        })
      )
      .enter()
      .append('rect')
      .style('fill', function (d) {
        return legendThreshold(d[0]);
      })
      .attr('x', d => legendX(d[0]))
      .attr('y', 0)
      .attr('width', d => 
        d[0] && d[1] ? legendX(d[1]) - legendX(d[0]) : legendX(null)
      )
      .attr('height', legendHeight);

      svgContainer
        .select('#legend-level')
        .attr('transform', 'translate(0,' + legendHeight + ')')
        .call(legendXAxis);


      // draw heat map
      svgContainer
        .select('#map')
        .classed('map', true)
        .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')')
        .selectAll('rect')
        .data(data.monthlyVariance)
        .enter()
        .append('rect')
        .attr('class', 'cell')
        .attr('data-month', d => {
          return d.month;
        })
        .attr('data-year', d => {
          return d.year;
        })
        .attr('dta-temp', d => {
          return data.baseTemperature + d.variance;
        })
        .attr('x', d => xScale(d.year))
        .attr('y', d => yScale(d.month))
        .attr('width', d => xScale.bandwidth(d.year))
        .attr('height', d => yScale.bandwidth(d.month))
        .attr('fill', d => {
          return legendThreshold(data.baseTemperature + d.variance);
        })
        .on('mouseover', (event, d) => {
          var date = new Date(d.year, d.month);
          tip.html(
            "<span class='date'>" +
            d3.utcFormat('%Y - %B')(date) +
            '</span>' +
            '<br />' +
            "<span class='temperature'>" +
            d3.format('.1f')(data.baseTemperature + d.variance) +
            '&#8451;' +
            '</span>' +
            '<br />' +
            "<span class='variance'>" +
            d3.format('+.1f')(d.variance) +
            '&#8451;' +
            '</span>')
            .attr('data-year', d.year)
            .style('opacity', 0.9)
            .style('position', 'absolute')
            .style('left', event.pageX + 'px')
            .style('top', event.pageY + 'px');
        })
        .on('mouseout', () => {
          tip.style('opacity', 0);
        })
  })

  return (
    <div className='App'>
      <section>
        <header>
          {/* eslint-disable-next-line */}
          <h1 id='title'></h1>
          {/* eslint-disable-next-line */}
          <h3 id='description'></h3>
        </header>
        <svg ref={svgRef}>
          <g id='x-axis'></g>
          <g id='y-axis'></g>
          <g id='legend'>
            <g></g>
            <g id='legend-level'></g>
          </g>
          <g id='map'></g>
        </svg>
      </section>
      <div id='tooltip' style={{opacity: 0}}></div>
    </div>
  );
}

export default App;
