import './App.css';
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

var data = await d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json");

function App() {
  const svgRef = useRef();
  const svgWidth = 920,
        svgHeight = 630;

  useEffect(() => {
    var margin = {
      top: 100,
      right: 20,
      bottom: 30,
      left: 60
    },
      width = svgWidth - margin.left - margin.right,
      height = svgHeight - margin.top - margin.bottom;

    data.map(item => {
      item.Place += item.Place;
      if (typeof(item.Time) === 'string') {
        var parsedTime = item.Time.split(':');
        item.Time = new Date(1970, 0, 1, 0, parsedTime[0], parsedTime[1])
      }
      return data;
    });

    // select tooltip
    var tooltip = d3.select('.tooltip');

    // select svg container
    var svgContainer = d3.select(svgRef.current)
      .select('g').attr('transform', 'translate(60, 100)');

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var timeFormat = d3.timeFormat('%M:%S');

    // Y-AXIS
      
    var yScale = d3.scaleTime().range([0, height]);

    yScale.domain(
      d3.extent(data, d => {
        return d.Time;
      })
    );

    var yAxis = d3.axisLeft(yScale).tickFormat(timeFormat);

    // add y-axis to svg
    svgContainer
      .selectAll('#y-axis')
      .attr('class', 'y axis')
      .call(yAxis);

    svgContainer
      .select('#y-text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -160)
      .attr('y', -44)
      .style('font-size', 18)
      .text('Time in Minutes');


    // X-AXIS

    var xScale = d3.scaleLinear().range([0, width])

    xScale.domain([
      d3.min(data, d => {
        return d.Year - 1
      }),
      d3.max(data, d => {
        return d.Year + 1
      })
    ]);

    var xAxis = d3.axisBottom(xScale).tickFormat(d3.format('d'));

    // add xAxis to svg
    svgContainer
      .select('#x-axis')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);

    // plot scatter graph
    d3
      .select('#plot')
      .selectAll('.rect')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('r', 6)
      .attr('cx', function (d) {
        return xScale(d.Year);
      })
      .attr('cy', function (d) {
        return yScale(d.Time);
      })
      .attr('data-xvalue', function (d) {
        return d.Year;
      })
      .attr('data-yvalue', function (d) {
        return d.Time.toISOString();
      })
      .style('fill', function (d) {
        return color(d.Doping !== '');
      })
      .on('mouseover', function (event, d) {
        tooltip.style('opacity', 0.9);
        tooltip.attr('data-year', d.Year);
        tooltip
          .html(
            d.Name +
              ': ' +
              d.Nationality +
              '<br/>' +
              'Year: ' +
              d.Year +
              ', Time: ' +
              timeFormat(d.Time) +
              (d.Doping ? '<br/><br/>' + d.Doping : '')
          )
          .style('left', event.pageX + 'px')
          .style('top', event.pageY - 28 + 'px');
      })
      .on('mouseout', function () {
        tooltip.style('opacity', 0);
      });

    // add title
    svgContainer
      .select('#title')
      .attr('x', width / 2)
      .attr('y', 0 - margin.top / 2)
      .attr('text-anchor', 'middle')
      .style('font-size', '30px')
      .text('Doping in Professional Bicycle Racing');

    // add description
    svgContainer
      .select('#desc')
      .attr('x', width / 2)
      .attr('y', 0 - margin.top / 2 + 25)
      .attr('text-anchor', 'middle')
      .style('font-size', '20px')
      .text("35 Fastest times up Alpe d'Huez");

    var legend1 = svgContainer
      .select('#legend1')
      .attr('class', 'legend-label');

    legend1
      .select('#rect-legend1')
      .attr('x', width - 18)
      .attr('width', 18)
      .attr('height', 18)
      .style('fill', 'rgb(31, 119, 180)');

    legend1
      .select('#text-legend1')
      .attr('x', width - 24)
      .attr('y', 9)
      .attr('dy', '.35em')
      .style('text-anchor', 'end')
      .text('Riders with doping allegations');

    var legend2 = svgContainer
      .select('#legend2')
      .attr('class', 'legend-label');
    
    legend2
      .select('#rect-legend2')
      .attr('x', width - 18)
      .attr('width', 18)
      .attr('height', 18)
      .style('fill', 'rgb(255, 127, 14)');

    legend2
      .select('#text-legend2')
      .attr('x', width - 24)
      .attr('y', 9)
      .attr('dy', '.35em')
      .style('text-anchor', 'end')
      .text('No doping allegations');
  })

  return (
    <div className='main'>
      <div className='container'>
        <div className='visHoldar'>
          <div className='tooltip' style={{opacity: 0}}></div>
          <svg className='graph' width={svgWidth} height={svgHeight} ref={svgRef}>
            <g id='plot'>
              <g id='x-axis'></g>
              <g id='y-axis'></g>
              <text id='y-text'></text>
              <text id='title'></text>
              <text id='desc'></text>
              <g id='legend'>
                <g id='legend1' transform='translate(0,250)'>
                  <rect id='rect-legend1'></rect>
                  <text id='text-legend1'></text>
                </g>
                <g id='legend2' transform='translate(0,230)'>
                  <rect id='rect-legend2'></rect>
                  <text id='text-legend2'></text>
                </g>
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default App;
