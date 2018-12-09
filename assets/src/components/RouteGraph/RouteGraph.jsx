import React, { Component } from "react";

import Graph from 'react-graph-vis';

const options = {
    autoResize: true,
    layout: {
        hierarchical: false,
        improvedLayout: true
    },
    nodes:{
        chosen: false,
        font: {
            face: 'Lato',
            size: 17,
            color: '#FFFFFF',
        },
        borderWidth: 0,
        color: {
            background: '#0c1b26',
            border: '#5fdfff'
        }
    },
    edges: {
        arrows: ",",
        width: 2,
        color: 'rgba(255,255,255, .35)',
        shadow: {
            color: 'rgba(0,0,0, .35)'
        }
    }
};

const events = {
    select: function(event) {
        var { nodes, edges } = event;
    }
}


export default class RouteGraph extends Component {
  render() {
      const { graph } = this.props ;

    return (
        <Graph graph={graph} options={options} events={events} />
    );
  }
}
