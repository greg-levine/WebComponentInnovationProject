import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import * as d3 from 'd3';

@customElement('pie-chart')
export class PieChartElement extends LitElement {

  firstUpdated() {
    this.createChart()
  }

  createChart() {
      let width = 450,
        height = 450,
        margin = 40;

      // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
      let radius = Math.min(width, height) / 2 - margin

      // append the svg object to the div called 'my_dataviz'
      let svg = d3.select(this.renderRoot.querySelector('svg'))
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

      // Create dummy data
      let data = [1, 2, 3, 4, 20]

      // set the color scale
      let color = d3.scaleOrdinal()
        .domain(data as any)
        .range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56'])

      // Compute the position of each group on the pie:
      let pie = d3.pie()
        .value(function (d) { return d as any; })
      let data_ready = pie(data as any)

      // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
      svg
        .selectAll('g')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', d3.arc()
          .innerRadius(0)
          .outerRadius(radius) as any
        )
        .attr('fill', function (d) { return (color((d.data as any) as any)) } as any)
        .attr('stroke', 'black')
        .style('stroke-width', '2px')
        .style('opacity', 0.7)
  }

  render() {
    return html`<svg></svg>`;
  }
}
