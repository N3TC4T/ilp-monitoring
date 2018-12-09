import React, { Component } from "react";
import { connect } from "react-redux";

// utils

import filter from 'lodash/filter'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import forEach from 'lodash/forEach'

// ui
import { Row, Col } from "react-bootstrap";

// components
import RouteGraph from "components/RouteGraph/RouteGraph"


// actions
import { fetchPeers } from "actions/index.jsx";

class RouteView extends Component {
    constructor(props) {
        super(props);2

    }

    componentDidMount(){
        const { peers, fetchPeers } = this.props ;

        if (isEmpty(peers)) {
            fetchPeers()
        }
    }

    routingData() {
        const {peers} = this.props;

        let nodes = [];
        let edges = [];

        forEach(peers , (p) => {
            const { routingTable } = p;

            nodes.push({
                id: p.prefix,
                label: p.prefix
            });

            if(isEmpty(routingTable)) return;

            let peer = p.prefix;

            forEach(routingTable , (node) => {
                const pathStr = node.path;
                const path = pathStr ? pathStr.split(' ') : [ node ];

                if (path.length === 1){
                    if (path[0] !== peer){
                        edges.push({
                            from: peer,
                            to: path[0]
                        })
                    }

                }else{
                    for (let i = 0; i < path.length; i++) {
                        if(path[i +1 ] !== undefined){
                            let edge = {
                                from: path[i],
                                to: path[i + 1]
                            };
                            if (isEmpty(filter(edges, o => { return isEqual(o, edge); }))){
                                edges.push(edge)
                            }

                        }
                    }
                }

            })

        });

        return{
            edges,
            nodes
        }

    }


    render() {
        return (
            <div className="content">
                <div id="flash-notices">
                    <Row className={"margin-zero"}>
                        <Col md={12}>
                            <div className="alert-box info-flash">
                                Notice: Current routing map is base on one peer routing table
                            </div>
                        </Col>
                    </Row>
                </div>
                <Row>
                    <Col md={12} id={"network"}>
                        <RouteGraph graph={this.routingData()} />
                    </Col>

                </Row>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { peers: state.peers };
}

export default connect(mapStateToProps, { fetchPeers })(RouteView);
