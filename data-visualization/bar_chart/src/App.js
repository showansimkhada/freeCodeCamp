import React, { useEffect, useRef } from 'react';
import './App.css';
import * as d3 from 'd3';
const data = await d3.json(
  'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json'
);

function App() {
  const svgRef = useRef();

  const width = 800,
        height = 400;

  useEffect (() => {
    const  barWidth = width / 275;

    // select tooltip and overlay
    var tooltip = d3.select('#tooltip');
    var overlay = d3.select('.overlay');

    // svg container
    const svgContainer = d3.select(svgRef.current);

    // separate times by quater 
    var years = data.data.map(function (item) {
      var quarter;
      var temp = item[0].substring(5, 7);
      if (temp === '01') {
        quarter = 'Q1';
      } else if (temp === '04') {
        quarter = 'Q2';
      } else if (temp === '07') {
        quarter = 'Q3';
      } else if (temp === '10') {
        quarter = 'Q4';
      }

      return item[0].substring(0, 4) + ' ' + quarter;
    });

    // select different date
    var yearsDate = data.data.map(function (item) {
      return new Date(item[0]);
    });

    // find max date
    var xMax = new Date(d3.max(yearsDate));
    xMax.setMonth(xMax.getMonth() + 3);

    // select required data from given data
    var GDP = data.data.map(function (item) {
      return item[1];
    });

    var scaledGDP = [];

    var gdpMax = d3.max(GDP);

    var linearScale = d3.scaleLinear().domain([0, gdpMax]).range([0, height]);

    scaledGDP = GDP.map(function (item) {
      return linearScale(item);
    });

    // Y-axis
    // create y-axis text
    svgContainer
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', -200)
        .attr('y', 60+20)
        .text('Gross Domestic Product');

    // create y-axis scale
    var yAxisScale = d3.scaleLinear().domain([0, gdpMax]).range([height, 0]);

    // create y-axis
    var yAxis = d3.axisLeft(yAxisScale);

    // add y-axis to svg
    svgContainer
          .select('.y-axis')
          .attr('id', 'y-axis')
          .style('transform', `translateX{${width}px}`)
          .call(yAxis);

    
    // x-axis
    // create x-axis text
    svgContainer
        .append('text')
        .attr('x', width / 2 + 120)
        .attr('y', height + 50)
        .text('More Information: http://www.bea.gov/national/pdf/nipaguid.pdf')
        .attr('class', 'info');

    // create x-axis scale
    var xScale = d3
        .scaleTime()
        .domain([d3.min(yearsDate), xMax])
        .range([0, width]);

    // create x-axis
    var xAxis = d3.axisBottom(xScale);

    // add x-axis to svg
    svgContainer
        .select('.x-axis')
        .attr('id', 'x-axis')
        .attr('transform', 'translate(60, 400)')
        .call(xAxis);

    // fill the svg using datas
    d3
      .select('svg')
      .selectAll('.rect')
      .data(scaledGDP)
      .enter()
      .append('rect')
      .attr('data-date', function (d, i) {
        return data.data[i][0];
      })
      .attr('data-gdp', function (d, i) {
        return data.data[i][1];
      })
      .attr('class', 'bar')
      .attr('x', function (d, i) {
        return xScale(yearsDate[i]);
      })
      .attr('y', function (d) {
        return height - d;
      })
      .attr('width', barWidth)
      .attr('height', function (d) {
        return d;
      })
      .attr('index', (d, i) => i)
      .style('fill', '#33adff')
      .attr('transform', 'translate(60, 0)')
      // on mouse hover
      .on('mouseover', function (event, d) {
        // d or datum is the height of the
        // current rect
        var i = this.getAttribute('index');
        overlay
          .transition()
          .duration(0)
          .style('height', (d + 'px'))
          .style('width', barWidth + 'px')
          .style('opacity', 0.9)
          .style('left', i * barWidth + 0 + 'px')
          .style('top', height - d + 'px')
          .style('transform', 'translateX(60px)');
        tooltip.transition().duration(200).style('opacity', 0.9);
        tooltip
          .html(
            years[i] +
              '<br>' +
              '$' +
              GDP[i].toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') +
              ' Billion'
          )
          .attr('data-date', data.data[i][0])
          .style('left', i * barWidth + 30 + 'px')
          .style('top', height - 100 + 'px')
          .style('transform', 'translateX(60px)');
      })
      .on('mouseout', function () {
        tooltip.transition().duration(200).style('opacity', 0);
        overlay.transition().duration(200).style('opacity', 0);
      });
  }, [])

  return (
    <React.Fragment>
      <div className='main'>
        <div className='container'>
          <div id='title'>United States GDP</div>
          <div className='visHolder'>
            <div id='tooltip' style={{opacity: 0}}></div>
            <div className='overlay' style={{opacity: 0}}></div>
            <svg width={width+100} height={height+60} ref={svgRef}>
              <g className={'x-axis'} transform={'translate(60, 0)'}></g>
              <g className={'y-axis'} transform={'translate(60, 0)'}></g>
            </svg>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;