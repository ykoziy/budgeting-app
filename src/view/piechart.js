import * as d3 from 'd3';
const backgroundColor = '#f0f7f4';

class PieChart {
  constructor(chartContainer, data = null) {
    this.chartContainer = chartContainer;
    this.data = this.#convertData(data);
  }

  #convertData(data) {
    let newData = [];
    let totalSum = data.sum();
    for (const key in data.get()) {
      let sum = data.sumCategory(key);
      let percent = sum / totalSum;
      let item = { category: key, total: sum, percent: percent };
      newData.push(item);
    }
    return newData;
  }

  show() {
    const width = 800;
    const height = 500;
    const radius = 190;

    const svg = d3
      .select('svg')
      .attr('width', width)
      .attr('height', height)
      .attr(
        'style',
        `max-width: 100%; height: auto; height: intrinsic; background-color: ${backgroundColor};`,
      );

    const g = svg
      .append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    //generate colors
    let ordinalScale = d3.scaleOrdinal().domain(this.data);
    if (this.data.length <= 10) {
      ordinalScale.range(d3.schemeCategory10);
    } else {
      ordinalScale.range(d3.schemeSpectral(this.data.length));
    }

    //generate pie
    let pie = d3.pie().value(function (d) {
      return d.total;
    });

    const pieData = pie(this.data);

    let arc = g.selectAll('arc').data(pieData).enter();

    // fill chart
    let path = d3.arc().outerRadius(radius).innerRadius(0);
    arc
      .append('path')
      .attr('d', path)
      .attr('fill', function (d) {
        return ordinalScale(d.data.category);
      })
      .attr('stroke', 'black')
      .style('stroke-width', '2px');

    //add label
    const label = d3.arc().outerRadius(radius).innerRadius(0);

    arc
      .append('text')
      .attr('transform', function (d) {
        return 'translate(' + label.centroid(d) + ')';
      })
      .text(function (d) {
        return `${Math.round(d.data.percent * 100)}%`;
      })
      .style('font-family', 'arial')
      .style('font-size', 15);

    //legend
    const legend = svg
      .append('g')
      .attr('transform', `translate(${radius * 2 + 250}, 20)`);

    let labelHeight = 16;

    legend
      .selectAll(null)
      .data(pieData)
      .enter()
      .append('rect')
      .attr('y', (d) => labelHeight * d.index * 1.8)
      .attr('width', labelHeight)
      .attr('height', labelHeight)
      .attr('fill', function (d) {
        return ordinalScale(d.data.category);
      })
      .attr('stroke', 'grey')
      .style('stroke-width', '1px');

    legend
      .selectAll(null)
      .data(pie(this.data))
      .enter()
      .append('text')
      .text((d) => d.data.category)
      .attr('x', labelHeight * 1.2)
      .attr('y', (d) => labelHeight * d.index * 1.8 + labelHeight)
      .style('font-family', 'sans-serif')
      .style('font-size', `${labelHeight}px`);
  }

  #showLegend(svg, radius) {
    console.log('show legend!');
  }
}

export default PieChart;
