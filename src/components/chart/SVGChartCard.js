import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3'
import { Container, Row, Col } from 'react-grid-system';
class SVGChartCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        this.drawChart();
    }

    drawChart() {

        var data = [
            {
                "name": "Activity code_3",
                "value": 0.24807285452217048.toFixed(2)
            },
            {
                "name": "Producer code_5",
                "value": 0.19676176369136064.toFixed(2)
            },
            {
                "name": "prefix_5",
                "value": -0.19606909432404898.toFixed(2)
            },
            {
                "name": "Producer code_4",
                "value": 0.18384356602405988.toFixed(2)
            },
            {
                "name": "Producer code_3",
                "value": 0.95686481440872443.toFixed(2)
            }
        ];

        var margin = { top: 10, right: 0, bottom: 0, left:0 },
            width = 400 - margin.left - margin.right,
            height = 150 - margin.top - margin.bottom;

        var svg = d3.select(".chart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var x = d3.scaleLinear()
            .range([150, 350]);

        var y = d3.scaleBand()
            .rangeRound([height, 0])
            .padding(0.2);

       
        x.domain(d3.extent(data, function (d) {
            return d.value;
        }));
        
        y.domain(data.map(function (d) { return d.name; }));
        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function (d) { return d.value < 0 ? x(d.value) : x(0); })
            .attr("width", function (d) { return d.value < 0 ? x(d.value * -1) - x(0) : x(d.value) - x(0); })
            .attr("y", function (d) { return y(d.name); })
            .attr("height", y.bandwidth())
            .attr("fill", function (d) { return d.value < 0 ? "#d7191c" : "#1a9641"; });

        svg.selectAll(".value")
            .data(data)
            .enter().append("text")
            .attr("class", "value")
            .attr("x", function (d) {
                if (d.value < 0) {
                    return (x(d.value * -1) - x(0)) > 20 ? x(d.value) + 2 : x(d.value) - 1;
                } else {
                    return (x(d.value) - x(0)) > 20 ? x(d.value) - 2 : x(d.value) + 1;
                }
            })
            .attr("y", function (d) { return y(d.name); })
            .attr("dy", y.bandwidth() - 2.55)
            .attr("text-anchor", function (d) {
                if (d.value < 0) {
                    return (x(d.value * -1) - x(0)) > 20 ? "start" : "end";
                } else {
                    return (x(d.value) - x(0)) > 20 ? "end" : "start";
                }
            })
            .style("fill", function (d) {
                if (d.value < 0) {
                    return (x(d.value * -1) - x(0)) > 20 ? "#fff" : "#3a403d";
                } else {
                    return (x(d.value) - x(0)) > 20 ? "#fff" : "#3a403d";
                }
            })
            .text(function (d) { return d.value; });

        svg.selectAll(".name")
            .data(data)
            .enter().append("text")
            .attr("class", "name")
            .attr("x", function (d) { return d.value < 0 ? x(0) + 2.55 : x(0) - 2.55 })
            .attr("y", function (d) { return y(d.name); })
            .attr("dy", y.bandwidth() - 2.55)
            .attr("text-anchor", function (d) { return d.value < 0 ? "start" : "end"; })
            .text(function (d) { return d.name; });

        svg.append("line")
            .attr("x1", x(0))
            .attr("x2", x(0))
            .attr("y1", 0 + margin.top)
            .attr("y2", height - margin.top)
            .attr("stroke", "#3a403d")
            .attr("stroke-width", "1px");
    }
    render() {
        return <Container>
            <Row > 
            <Col xs={3}>
                </Col>
                <Col xs={3}>
                    <div>BPM</div>
                </Col>
                <Col xs={6}>
                    <div> SPM</div>
                </Col>
            </Row>
            <Row>
            <Col>
                    <div className="chart" ></div>
                </Col>
            </Row>
        </Container>
    }
}

SVGChartCard.propTypes = {
};

export default SVGChartCard;
