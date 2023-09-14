import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { feature } from 'topojson-client';
import './App.css';
const education = await d3.json('https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json');
const country = await d3.json('https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json')

function App() {
  const svgRef = useRef();

  useEffect(() => {
    var svgContainer = d3.select(svgRef.current);

    svgContainer
      .attr('width', 960)
      .attr('height', 600);

    var color = d3.scaleThreshold()
      .domain(d3.range(2.6, 75.1, (75.1 -2.6) / 8 ))
      .range(d3.schemeGreens[9]);

    // tooltip
    var tooltip = d3
      .select('#tooltip')
      .classed('tooltip', true)
      .style('opacity', 0);

    var path = d3.geoPath();

    // x-axis
    var xScale = d3.scaleLinear()
      .domain([2.6, 75.1])
      .rangeRound([600, 860]);

    // y-axis


    // legend 
    var legend = svgContainer
      .select('#legend')
      .classed('key', true)
      .attr('transform', 'translate(0,40)');

    legend.selectAll('rect')
      .data(
        color.range().map(d => {
          d = color.invertExtent(d);
          if (d[0] === null) {
            d[0] = xScale.domain()[0];
          }
          if (d[1] === null) {
            d[1] = xScale.domain()[1];
          }
          return d;
        })
      )
      .enter()
      .append('rect')
      .attr('height', 8)
      .attr('x', d => {
        return xScale(d[0]);
      })
      .attr('width', d => {
        return d[0] && d[1] ? xScale(d[1]) - xScale(d[0]) : null
      })
      .attr('fill', d => {
        return color(d[0]);
      });

    legend
      .append('text')
      .attr('class', 'caption')
      .attr('x', xScale.range()[0])
      .attr('y', -6)
      .attr('fill', '#000')
      .attr('text-anchor', 'start')
      .attr('font-weight', 'bold');
    
    legend
      .call(
        d3
          .axisBottom(xScale)
          .tickSize(13)
          .tickFormat(d => {
            return Math.round(d) + '%';
          })
          .tickValues(color.domain())
      )
      .select('.domain')
      .remove();

    ready(country, education);

    function ready(us, edu) {
      svgContainer
        .select('#country')
        .attr('class', 'counties')
        .selectAll('path')
        .data(feature(us, us.objects.counties).features)
        .enter()
        .append('path')
        .attr('class', 'county')
        .attr('data-fips', d => {
          return d.id;
        })
        .attr('data-education', d => {
          var result = edu.filter(obj => {
            return obj.fips === d.id;
          })
          if (result[0]) {
            return result[0].bachelorsOrHigher;
          }
          return 0;
        })
        .attr('fill', d => {
          var result = edu.filter(obj => {
            return obj.fips === d.id;
          })
          if (result[0]) {
            return color(result[0].bachelorsOrHigher);
          }
          return color(0);
        })
        .attr('d', path)
        .on('mouseover', (event, d) => {
          tooltip.style('opacity', 0.9);
          tooltip
            .html( () => {
              var result = edu.filter(function (obj) {
                return obj.fips === d.id;
              });
              if (result[0]) {
                return (
                  result[0]['area_name'] +
                  ', ' +
                  result[0]['state'] +
                  ': ' +
                  result[0].bachelorsOrHigher +
                  '%'
                );
              }
              // could not find a matching fips id in the data
              return 0;
            })
            .attr('data-education', () => {
              var result = edu.filter(function (obj) {
                return obj.fips === d.id;
              });
              if (result[0]) {
                return result[0].bachelorsOrHigher;
              }
              // could not find a matching fips id in the data
              return 0;
            })
            .style('left', event.pageX + 10 + 'px')
            .style('top', event.pageY - 28 + 'px');
        })
        .on('mouseout', () => {
          tooltip.style('opacity', 0);
        })

      svgContainer.select('#states')
        .datum(
          feature(us, us.objects.states, function (a, b) {
            return a !== b;
          })
        )
        .attr('class', 'states')
        .attr('d', path);
    }
  })

  return (
    <div className="App">
      <div id='main'>
        <h1 id='title'>United States Educational Attainment</h1>
        <div id='description'>
          Percentage of adults age 25 and older with a bachelor's degree or higher
          (2010-2014)
        </div>
        <svg ref={svgRef}>
          <g id='legend'></g>
          <g id='country'></g>
          <path id='states'></path>
        </svg>
        <div id='source'>
          Source:
          <a href="https://www.ers.usda.gov/data-products/county-level-data-sets/download-data.aspx">USDA Economic Research Service</a>
        </div>
      </div>
      <div id='tooltip'></div>
    </div>
  );
}

export default App;
