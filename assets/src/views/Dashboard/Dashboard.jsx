import React, { Component } from "react";
import { connect } from "react-redux";
import ChartistGraph from "react-chartist";

import filter from 'lodash/filter'
import isEmpty from 'lodash/isEmpty'
import orderBy from 'lodash/orderBy'

// Components
import { Grid, Row, Col, Table } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import Datatable from "components/DataTable/DataTable.jsx";


// actions
import { fetchPeers } from "actions/index.jsx";


const dataPie = {
    labels: ["XRP", "ETH", "BTC"],
    series: [100, 0, 0]
};


const header = [
    { title: '', prop: 'up', sortable: true, filterable: false},
    { title: 'Prefix', prop: 'prefix', sortable: true, filterable: true },
    { title: 'Support Assets', prop: 'support_assets', sortable: true, filterable: true },
    { title: 'Peers', prop: 'peers', sortable: true },
    { title: 'Details', prop: 'details'}
];

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.upPeers = this.upPeers.bind(this);
        this.downPeers = this.downPeers.bind(this);
        this.newPeerCount = this.newPeerCount.bind(this);
    }


    componentDidMount(){
        const { peers, fetchPeers } = this.props ;

        if (isEmpty(peers)) {
            fetchPeers()
        }
    }

    getTableData(){
        const {peers} = this.props ;
        let dataTable = [];

        if (isEmpty(peers)) {
            return dataTable
        }

        peers.map((p) => {
            dataTable.push({
                up: p.up ? (<span className="colorIcon green"></span>) : (<span className="colorIcon red"></span>),
                prefix: this.isNew(p.register_time) ? (<span>{p.prefix} <span className="badge badge-secondary">New</span></span>) : (<span>{p.prefix}</span>),
                support_assets: "XRP",
                peers: p.peers ? p.peers.length : 0,
                details:(<a href={"#"}>Details</a>),
                register_time: p.register_time
            })
        });

        return orderBy(dataTable, 'register_time', 'desc')

    }

    upPeers(){
        const {peers} = this.props;
        return filter(peers, function(o) { return o.up; });
    }

    downPeers(){
        const {peers} = this.props;
        return filter(peers, function(o) { return !o.up; });
    }

    isNew = (d) => {
        let date = new Date();
        date.setDate( date.getDate() - 3 );
        return new Date(d) - date > 0
    };

    newPeerCount(){
        const {peers} = this.props;
        return filter(peers, (o) => {
            return this.isNew(o.register_time);
        }).length;
    }

    render() {

        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col lg={3} sm={6}>
                            <StatsCard
                                bigIcon={<img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMS4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDI5MCAyOTAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDI5MCAyOTA7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNjRweCIgaGVpZ2h0PSI2NHB4Ij4KPGc+Cgk8cGF0aCBpZD0iY2lyY2xlMTE1NjciIGQ9Ik0yNTUsMGMtMTkuMjcxLDAtMzUsMTUuNzI5LTM1LDM1YzAsMTcuNTczLDEzLjA4MiwzMi4xOTYsMzAsMzQuNjM3VjE0MGgtNzAuMzYzICAgYy0yLjQ0MS0xNi45MTgtMTcuMDY0LTMwLTM0LjYzNy0zMHMtMzIuMTk2LDEzLjA4Mi0zNC42MzcsMzBIMzVjLTIuNzYxLDAtNSwyLjIzOS01LDV2NzUuMzYzQzEzLjA4MiwyMjIuODA0LDAsMjM3LjQyNywwLDI1NSAgIGMwLDE5LjI3MSwxNS43MjksMzUsMzUsMzVzMzUtMTUuNzI5LDM1LTM1YzAtMTcuNTczLTEzLjA4Mi0zMi4xOTYtMzAtMzQuNjM3VjE1MGg3MC4zNjNjMi40NDEsMTYuOTE4LDE3LjA2NCwzMCwzNC42MzcsMzAgICBzMzIuMTk2LTEzLjA4MiwzNC42MzctMzBIMjU1YzIuNzYxLDAsNS0yLjIzOSw1LTVWNjkuNjM3YzE2LjkxOC0yLjQ0MSwzMC0xNy4wNjQsMzAtMzQuNjM3QzI5MCwxNS43MjksMjc0LjI3MSwwLDI1NSwweiBNMjU1LDEwICAgYzEzLjg2NiwwLDI1LDExLjEzNCwyNSwyNXMtMTEuMTM0LDI1LTI1LDI1cy0yNS0xMS4xMzQtMjUtMjVTMjQxLjEzNCwxMCwyNTUsMTB6IE0yNTUsMTcuNWMtOS42MzUsMC0xNy41LDcuODY1LTE3LjUsMTcuNSAgIGMtMC4wMiwxLjM4MSwxLjA4NCwyLjUxNiwyLjQ2NSwyLjUzNWMxLjM4MSwwLjAyLDIuNTE2LTEuMDg0LDIuNTM1LTIuNDY1YzAtMC4wMjQsMC0wLjA0NywwLTAuMDcxYzAtNi45MzMsNS41NjctMTIuNSwxMi41LTEyLjUgICBjMS4zODEsMC4wMiwyLjUxNi0xLjA4NCwyLjUzNS0yLjQ2NXMtMS4wODQtMi41MTYtMi40NjUtMi41MzVDMjU1LjA0NywxNy41LDI1NS4wMjQsMTcuNSwyNTUsMTcuNXogTTE0NSwxMjAgICBjMTMuODY2LDAsMjUsMTEuMTM0LDI1LDI1cy0xMS4xMzQsMjUtMjUsMjVzLTI1LTExLjEzNC0yNS0yNVMxMzEuMTM0LDEyMCwxNDUsMTIweiBNMTQ1LDEyNy41Yy05LjYzNSwwLTE3LjUsNy44NjUtMTcuNSwxNy41ICAgYy0wLjAyLDEuMzgxLDEuMDg0LDIuNTE2LDIuNDY1LDIuNTM1YzEuMzgxLDAuMDIsMi41MTYtMS4wODQsMi41MzUtMi40NjVjMC0wLjAyNCwwLTAuMDQ3LDAtMC4wNzFjMC02LjkzMyw1LjU2Ny0xMi41LDEyLjUtMTIuNSAgIGMxLjM4MSwwLjAyLDIuNTE2LTEuMDg0LDIuNTM1LTIuNDY1YzAuMDItMS4zODEtMS4wODQtMi41MTYtMi40NjUtMi41MzVDMTQ1LjA0NywxMjcuNSwxNDUuMDI0LDEyNy41LDE0NSwxMjcuNXogTTM1LDIzMCAgIGMxMy44NjYsMCwyNSwxMS4xMzQsMjUsMjVzLTExLjEzNCwyNS0yNSwyNXMtMjUtMTEuMTM0LTI1LTI1UzIxLjEzNCwyMzAsMzUsMjMweiBNMzUsMjM3LjVjLTkuNjM1LDAtMTcuNSw3Ljg2NS0xNy41LDE3LjUgICBjLTAuMDIsMS4zODEsMS4wODQsMi41MTYsMi40NjUsMi41MzVzMi41MTYtMS4wODQsMi41MzUtMi40NjVjMC0wLjAyNCwwLTAuMDQ3LDAtMC4wNzFjMC02LjkzMyw1LjU2Ny0xMi41LDEyLjUtMTIuNSAgIGMxLjM4MSwwLjAyLDIuNTE2LTEuMDg0LDIuNTM1LTIuNDY1YzAuMDItMS4zODEtMS4wODQtMi41MTYtMi40NjUtMi41MzVDMzUuMDQ3LDIzNy41LDM1LjAyNCwyMzcuNSwzNSwyMzcuNXoiIGZpbGw9IiMwMDAwMDAiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" />}
                                statsText="Peer Count"
                                statsValue={this.upPeers().length}
                                statsIconText="Active ILP connectors"
                                statusRight={<span className={"text-success"}>+{this.newPeerCount()}</span> }
                            />
                        </Col>
                        <Col lg={3} sm={6}>
                            <StatsCard
                                bigIcon={<img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjY0cHgiIGhlaWdodD0iNjRweCIgdmlld0JveD0iMCAwIDUwMS4xOTUgNTAxLjE5NSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTAxLjE5NSA1MDEuMTk1OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPHBhdGggZD0iTTIzOC44NjgsMjM1LjY0MWwtMjMuOTc5LTYuNjI0bC0xNC41MjgtMjMuNjM5bC03LjgwOSw3LjgxMmMtMjguNjI1LTEzLjM5OC02My44NDItOC4yOTYtODcuNDQ0LDE1LjMwOGwtODIuNTEyLDgyLjUyNiAgIGMtMzAuMTI5LDMwLjEyMy0zMC4xMjksNzkuMTQ0LTAuMDA2LDEwOS4yNjVjMzAuMTI0LDMwLjEyNCw3OS4xNDIsMzAuMTI0LDEwOS4yNjUtMC4wMDVsODIuNTI0LTgyLjUxOSAgIGMyNC42My0yNC42MjQsMjkuMS02MS44NjYsMTMuNDY2LTkxLjEwM0wyMzguODY4LDIzNS42NDF6IE0xODkuMTYsMzEyLjU1NWwtODIuNTE4LDgyLjUxOGMtMTYuMjI2LDE2LjIyNS00Mi42MTEsMTYuMjI1LTU4LjgzNiwwICAgcy0xNi4yMjUtNDIuNjEsMC01OC44MzVsODIuNTIzLTgyLjUyNmM5LjE4My05LjE3OSwyMS42MjYtMTMuMTU3LDMzLjY0My0xMS45NDJsLTIyLjAzMSwyMi4wMzYgICBjLTkuNDc4LDkuNDcyLTkuNDc4LDI0Ljg5NywwLDM0LjM4NmM5LjQ3Myw5LjQ3OCwyNC45MDMsOS40NzgsMzQuMzg2LTAuMDA2bDI0LjAwMS0yNCAgIEMyMDMuMjUsMjg3LjU5MSwxOTkuNTYyLDMwMi4xNTMsMTg5LjE2LDMxMi41NTV6IE00OTYuMjgyLDEwOC40NjZjLTE0Ljk0NS0zOS44ODgtNTkuNTY5LTYwLjE4NC05OS40NTMtNDUuMjM0bC0xMDkuMjk0LDQwLjk0MyAgIGMtMzEuMjU2LDExLjcxMS01MC40ODMsNDEuNjQzLTUwLjE0LDczLjI0N2wtMjAuMjc4LDcuNTkybDMuMjUsMjYuMDM5bDIwLjM3MiwxNy4wMzRsMTIuNTA5LTQuNjg5ICAgYzIwLjEzOSwyNi4zNDIsNTUuODk2LDM3LjY4OCw4OC41MDQsMjUuNDY3bDEwOS4yODEtNDAuOTQzQzQ5MC45MzEsMTkyLjk4MSw1MTEuMjI0LDE0OC4zNjgsNDk2LjI4MiwxMDguNDY2eiBNNDM4LjUyLDE3NC41MzUgICBsLTEwOS4yODEsNDAuOTQ0Yy0xMy43NzQsNS4xNjEtMjguNTYxLDIuNDkzLTM5LjU0OC01LjcyNmwxOS42NDQtNy4zNTdjMTIuNTU2LTQuNzA3LDE4LjkzOC0xOC43NDUsMTQuMjQtMzEuMjk0ICAgYy00LjcwNy0xMi41NTYtMTguNzQxLTE4Ljk0NC0zMS4yOTYtMTQuMjQ0bC0xNy4wMzQsNi4zODljMy44NjItMTEuNDQyLDEyLjY0LTIxLjEyNSwyNC43OTktMjUuNjhMNDA5LjMzLDk2LjYyMiAgIGMyMS40ODYtOC4wNTIsNDUuNTA2LDIuODgxLDUzLjU2LDI0LjM2NEM0NzAuOTI4LDE0Mi40NjMsNDYwLjAwMiwxNjYuNDkxLDQzOC41MiwxNzQuNTM1eiBNMjQ4LjQzMywyMzUuNjAybDMzLjMwNywxOS43ODYgICBsLTEyLjY0OSw0Ni4zMjFsLTkuMzgxLTIuNTU5bDEwLjY5OC0zOS4xNzdsLTMxLjY4OS0xOC44MzFMMjQ4LjQzMywyMzUuNjAyeiBNMTcwLjg5NSwxODMuMzg5bC0xOS43MzItMzcuMTM4bDguNTkxLTQuNTYyICAgbDE3LjM4OSwzMi43MTdsMTguNjkyLDIuNDlsMTIuNTY5LDIwLjQ0NmwtNy4wNzYsNy4wN2wtMTEuMzY1LTE4LjQ5TDE3MC44OTUsMTgzLjM4OXoiIGZpbGw9IiMwMDAwMDAiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" />}
                                statsText="Peer Count"
                                statsValue={this.downPeers().length}
                                statsIconText="Inactive ILP connectors"
                            />
                        </Col>
                        <Col lg={3} sm={6}>
                            <StatsCard
                                bigIcon={<img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSItNTEgMCA1MTIgNTEyIiB3aWR0aD0iNjRweCIgaGVpZ2h0PSI2NHB4Ij48cGF0aCBkPSJtMTMwIDIwNmMtNS40Njg3NSAwLTkuOTIxODc1IDQuMzk4NDM4LTEwIDkuODU5Mzc1di4xNDA2MjVjMCA1LjUxOTUzMSA0LjQ4MDQ2OSAxMCAxMCAxMHMxMC00LjQ4MDQ2OSAxMC0xMGMwLS4wNTA3ODEgMC0uMDg5ODQ0IDAtLjE0MDYyNS0uMDc4MTI1LTUuNDYwOTM3LTQuNTMxMjUtOS44NTkzNzUtMTAtOS44NTkzNzV6bTAgMCIgZmlsbD0iIzAwMDAwMCIvPjxwYXRoIGQ9Im0xMzAgMGMtNjQuNjAxNTYyIDAtMTMwIDE3LjE3NTc4MS0xMzAgNTB2MzEyYzAgMzIuODI0MjE5IDY1LjM5ODQzOCA1MCAxMzAgNTAgMS45NDkyMTkgMCAzLjg4MjgxMi0uMDE5NTMxIDUuNzk2ODc1LS4wNDY4NzUgMTcuNjEzMjgxIDU5LjA3ODEyNSA3Mi4wNjI1IDEwMC4wNDY4NzUgMTM0LjIwMzEyNSAxMDAuMDQ2ODc1IDc3LjE5NTMxMiAwIDE0MC02Mi44MDQ2ODggMTQwLTE0MHMtNjIuODA0Njg4LTE0MC0xNDAtMTQwYy0zLjM1NTQ2OSAwLTYuNzIyNjU2LjEzMjgxMi0xMC4wODU5MzguMzcxMDk0LjAwNzgxMy02LjU2NjQwNi4wNTA3ODItMTA1LjY3MTg3NS4wNTQ2ODgtMTE4LjU1NDY4OC4wMTE3MTktLjI3MzQzNy4wMzEyNS0uNTQ2ODc1LjAzMTI1LS44MTY0MDYgMC0uMTk1MzEyLS4wMTk1MzEtLjM4MjgxMi0uMDI3MzQ0LS41NzQyMTlsLjAyNzM0NC02Mi40MjE4NzV2LS4wMDM5MDZjMC0zMi44MjQyMTktNjUuMzk4NDM4LTUwLTEzMC01MHptNi43ODUxNTYgMzI4LjkzMzU5NGMtMi4yOTY4NzUuMDQyOTY4LTQuNTY2NDA2LjA2NjQwNi02Ljc4NTE1Ni4wNjY0MDYtMzEuMDAzOTA2IDAtNjAuMDE1NjI1LTMuOTgwNDY5LTgxLjY4NzUtMTEuMjAzMTI1LTIyLjM5NDUzMS03LjQ2NDg0NC0yOC4zMTI1LTE1LjU1ODU5NC0yOC4zMTI1LTE4Ljc5Njg3NXYtMzUuMDU4NTk0YzI0LjI4NTE1NiAxNC41NTg1OTQgNjcuMzEyNSAyMi4wNTg1OTQgMTEwIDIyLjA1ODU5NCAxMC4zNTU0NjkgMCAyMC42NTIzNDQtLjQzNzUgMzAuNjE3MTg4LTEuMjg1MTU2LTEwLjUwNzgxMyAxMy4xODM1OTQtMTguNjQwNjI2IDI4LjIxODc1LTIzLjgzMjAzMiA0NC4yMTg3NXptNDcuMTk5MjE5LTY3LjM3MTA5NGMtMTYuNDk2MDk0IDIuODk0NTMxLTM1LjA4OTg0NCA0LjQzNzUtNTMuOTg0Mzc1IDQuNDM3NS0zMS4wMDM5MDYgMC02MC4wMTU2MjUtMy45ODA0NjktODEuNjg3NS0xMS4yMDMxMjUtMjIuMzk0NTMxLTcuNDY0ODQ0LTI4LjMxMjUtMTUuNTU4NTk0LTI4LjMxMjUtMTguNzk2ODc1di0zMS45NzI2NTZjNS41ODU5MzggMy4zMjgxMjUgMTEuNTU0Njg4IDUuOTkyMTg3IDE3LjY4MzU5NCA4LjIzNDM3NSAxNi4zMTI1IDYuMTE3MTg3IDQ2LjE4NzUgMTEuNDY4NzUgNTIuMzg2NzE4IDExLjQ2ODc1IDUuMDExNzE5IDAgOS4zMzU5MzgtMy43NTc4MTMgOS45MjE4NzYtOC44NTE1NjMuNjM2NzE4LTUuNDg4MjgxLTMuMzAwNzgyLTEwLjQ0OTIxOC04Ljc4NTE1Ny0xMS4wODIwMzEtMy4xOTkyMTktLjUyMzQzNy0zOC40NTcwMzEtNC4wNTQ2ODctNTkuOTUzMTI1LTE2LjM0NzY1Ni04LjU2MjUtNC44NjMyODEtOS42MDkzNzUtNy43OTI5NjktMTEuMTQ0NTMxLTEwLjU3MDMxMy0uMjYxNzE5LTEuNDE0MDYyLS4wMTE3MTkgMS4zODY3MTktLjEwOTM3NS0zNS45Mzc1IDI0LjI4NTE1NiAxNC41NTg1OTQgNjcuMzEyNSAyMi4wNTg1OTQgMTEwIDIyLjA1ODU5NCAzMi42ODM1OTQgMCA2My42NTYyNS00LjI1IDg3LjIxMDkzOC0xMS45NjQ4NDQgOS40NjA5MzctMy4wOTc2NTYgMTcuMDAzOTA2LTYuNDg0Mzc1IDIyLjg0NzY1Ni05Ljk3NjU2Mi0uMDIzNDM4IDM2LjY5NTMxMi0uMDA3ODEzIDM1LjUwNzgxMi0uMDIzNDM4IDM1LjYwNTQ2OC0uNDAyMzQ0IDEuODc1LTEuOTg4MjgxIDMuNjk1MzEzLTMuMzU1NDY4IDUuMDM5MDYzLS4xMDE1NjMuMDM5MDYzLTE1LjY1MjM0NCAxNi4xNDQ1MzEtNjcuNzY1NjI2IDIyLjA3ODEyNWwtLjEyMTA5My4wMTU2MjVjLTUuNDg4MjgxLjYzMjgxMy05LjQyMTg3NSA1LjU5Mzc1LTguNzg5MDYzIDExLjA4MjAzMS41ODk4NDQgNS4wOTM3NSA0LjkxMDE1NiA4Ljg1MTU2MyA5LjkyMTg3NSA4Ljg1MTU2MyAxMS45ODgyODEgMCA1MS4yMTQ4NDQtOC40NDkyMTkgNzAuMTAxNTYzLTE5LjY1NjI1bC0uMDE1NjI1IDMxLjE3NTc4MWMtMjAuMzEyNSA0LjQ2MDkzOC0zOS41NTA3ODEgMTMuNDU3MDMxLTU2LjAyNzM0NCAyNi4zMTI1em01Ni4wNDY4NzUtODQuODQzNzVjMC0uMDA3ODEyLjAwMzkwNi0uMDE1NjI1LjAwMzkwNi0uMDIzNDM4LS4wMDc4MTIuMDMxMjUtLjAwMzkwNi4wMjM0MzgtLjAwMzkwNi4wMjM0Mzh6bS4wMzkwNjItNjMuMzc1Yy0uMzQzNzUgMy4zNzEwOTQtNi44NjcxODcgMTEuNDEwMTU2LTI5LjA4NTkzNyAxOC42ODc1LTIxLjU5NzY1NiA3LjA3NDIxOS01MC4zNTkzNzUgMTAuOTY4NzUtODAuOTg0Mzc1IDEwLjk2ODc1LTMxLjAwMzkwNiAwLTYwLjAxNTYyNS0zLjk4MDQ2OS04MS42ODc1LTExLjIwMzEyNS0yMi4zOTQ1MzEtNy40NjQ4NDQtMjguMzEyNS0xNS41NTg1OTQtMjguMzEyNS0xOC43OTY4NzV2LTM1LjA1ODU5NGMyNC4yODUxNTYgMTQuNTU4NTk0IDY3LjMxMjUgMjIuMDU4NTk0IDExMCAyMi4wNTg1OTQgNDIuNjc5Njg4IDAgODUuODAwNzgxLTcuNSAxMTAuMDg1OTM4LTIyLjA1MDc4MXptLTE5MS43NTc4MTItODIuMTQwNjI1YzIxLjY3MTg3NS03LjIyMjY1NiA1MC42ODM1OTQtMTEuMjAzMTI1IDgxLjY4NzUtMTEuMjAzMTI1czYwLjAxNTYyNSAzLjk4MDQ2OSA4MS42ODc1IDExLjIwMzEyNWMyMi4zOTQ1MzEgNy40NjQ4NDQgMjguMzEyNSAxNS41NTg1OTQgMjguMzEyNSAxOC43OTY4NzVzLTUuOTE3OTY5IDExLjMzMjAzMS0yOC4zMTI1IDE4Ljc5Njg3NWMtMjEuNjcxODc1IDcuMjIyNjU2LTUwLjY4MzU5NCAxMS4yMDMxMjUtODEuNjg3NSAxMS4yMDMxMjVzLTYwLjAxNTYyNS0zLjk4MDQ2OS04MS42ODc1LTExLjIwMzEyNWMtMjIuMzk0NTMxLTcuNDY0ODQ0LTI4LjMxMjUtMTUuNTU4NTk0LTI4LjMxMjUtMTguNzk2ODc1czUuOTE3OTY5LTExLjMzMjAzMSAyOC4zMTI1LTE4Ljc5Njg3NXptMCAzNDkuNTkzNzVjLTIyLjM5NDUzMS03LjQ2NDg0NC0yOC4zMTI1LTE1LjU1ODU5NC0yOC4zMTI1LTE4Ljc5Njg3NXYtMzUuMDU4NTk0YzI0LjI4NTE1NiAxNC41NTg1OTQgNjcuMzEyNSAyMi4wNTg1OTQgMTEwIDIyLjA1ODU5NC42MjUgMCAxLjI2MTcxOS0uMDA3ODEyIDEuODkwNjI1LS4wMDc4MTItMS4yNSA3LjU3MDMxMi0xLjg5MDYyNSAxNS4yNjk1MzEtMS44OTA2MjUgMjMuMDA3ODEyIDAgNi43MTA5MzguNDc2NTYyIDEzLjM5ODQzOCAxLjQyMTg3NSAxOS45OTIxODgtLjQ3NjU2My4wMDM5MDYtLjk0NTMxMy4wMDc4MTItMS40MjE4NzUuMDA3ODEyLTMxLjAwMzkwNiAwLTYwLjAxNTYyNS0zLjk4MDQ2OS04MS42ODc1LTExLjIwMzEyNXptMzQxLjY4NzUtOC43OTY4NzVjMCA2Ni4xNjc5NjktNTMuODMyMDMxIDEyMC0xMjAgMTIwLTU2LjA0Mjk2OSAwLTEwNC4wODk4NDQtMzguMDUwNzgxLTExNi44NDM3NS05Mi41MzEyNS0uMDA3ODEyLS4wMjczNDQtLjAxMTcxOS0uMDUwNzgxLS4wMTU2MjUtLjA3ODEyNS0uMDAzOTA2LS4wMTE3MTktLjAwNzgxMy0uMDI3MzQ0LS4wMTE3MTktLjA0Mjk2OS0yLjA3NDIxOC04Ljg5NDUzMS0zLjEyODkwNi0xOC4wOTM3NS0zLjEyODkwNi0yNy4zNDc2NTYgMC0xMC4zNjMyODEgMS4zMTY0MDYtMjAuNjMyODEyIDMuOTE0MDYyLTMwLjUyMzQzOCAxMy4zODI4MTMtNTEuMDM5MDYyIDU5Ljk1NzAzMi04OS40NzY1NjIgMTE2LjA4NTkzOC04OS40NzY1NjIgNjYuMTY3OTY5IDAgMTIwIDUzLjgzMjAzMSAxMjAgMTIwem0wIDAiIGZpbGw9IiMwMDAwMDAiLz48cGF0aCBkPSJtMjQwIDM1MmMwIDE2LjU0Mjk2OSAxMy40NTcwMzEgMzAgMzAgMzAgNS41MTU2MjUgMCAxMCA0LjQ4NDM3NSAxMCAxMHMtNC40ODQzNzUgMTAtMTAgMTBjLTQuMjczNDM4IDAtOC44ODY3MTktMi42ODc1LTEyLjk4NDM3NS03LjU2MjUtMy41NTQ2ODctNC4yMzA0NjktOS44NjMyODEtNC43NzczNDQtMTQuMDg5ODQ0LTEuMjIyNjU2LTQuMjMwNDY5IDMuNTU0Njg3LTQuNzczNDM3IDkuODYzMjgxLTEuMjE4NzUgMTQuMDg5ODQ0IDUuMzQzNzUgNi4zNTkzNzQgMTEuNjMyODEzIDEwLjc5Mjk2OCAxOC4yOTI5NjkgMTMuMDIzNDM3djExLjY3MTg3NWMwIDUuNTIzNDM4IDQuNDc2NTYyIDEwIDEwIDEwczEwLTQuNDc2NTYyIDEwLTEwdi0xMS43MTg3NWMxMS42NDA2MjUtNC4xMjg5MDYgMjAtMTUuMjQ2MDk0IDIwLTI4LjI4MTI1IDAtMTYuNTQyOTY5LTEzLjQ1NzAzMS0zMC0zMC0zMC01LjUxNTYyNSAwLTEwLTQuNDg0Mzc1LTEwLTEwczQuNDg0Mzc1LTEwIDEwLTEwYzMuNTQyOTY5IDAgNy4yODEyNSAxLjgwODU5NCAxMC44MTY0MDYgNS4yMjY1NjIgMy45Njg3NSAzLjgzOTg0NCAxMC4zMDA3ODIgMy43MzQzNzYgMTQuMTQwNjI1LS4yMzA0NjggMy44Mzk4NDQtMy45NzI2NTYgMy43MzQzNzUtMTAuMzAwNzgyLS4yMzQzNzUtMTQuMTQwNjI1LTUuMDc0MjE4LTQuOTE0MDYzLTEwLjE1MjM0NC03LjY5MTQwNy0xNC43MjI2NTYtOS4yMDcwMzF2LTExLjY0ODQzOGMwLTUuNTIzNDM4LTQuNDc2NTYyLTEwLTEwLTEwcy0xMCA0LjQ3NjU2Mi0xMCAxMHYxMS43MTg3NWMtMTEuNjQwNjI1IDQuMTI4OTA2LTIwIDE1LjI0NjA5NC0yMCAyOC4yODEyNXptMCAwIiBmaWxsPSIjMDAwMDAwIi8+PC9zdmc+Cg==" />}
                                statsText="Assets"
                                statsValue="1"
                                statsIconText="Supported Assets and Currencies"
                            />
                        </Col>
                        <Col lg={3} sm={6}>
                            <StatsCard
                                bigIcon={<img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUyIDUyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MiA1MjsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI2NHB4IiBoZWlnaHQ9IjY0cHgiPgo8Zz4KCTxwYXRoIGQ9Ik0yNiwwQzExLjY2NCwwLDAsMTEuNjYzLDAsMjZzMTEuNjY0LDI2LDI2LDI2czI2LTExLjY2MywyNi0yNlM0MC4zMzYsMCwyNiwweiBNMjYsNTBDMTIuNzY3LDUwLDIsMzkuMjMzLDIsMjYgICBTMTIuNzY3LDIsMjYsMnMyNCwxMC43NjcsMjQsMjRTMzkuMjMzLDUwLDI2LDUweiIgZmlsbD0iIzAwMDAwMCIvPgoJPHBhdGggZD0iTTI2LDEwYy0wLjU1MiwwLTEsMC40NDctMSwxdjIyYzAsMC41NTMsMC40NDgsMSwxLDFzMS0wLjQ0NywxLTFWMTFDMjcsMTAuNDQ3LDI2LjU1MiwxMCwyNiwxMHoiIGZpbGw9IiMwMDAwMDAiLz4KCTxwYXRoIGQ9Ik0yNiwzN2MtMC41NTIsMC0xLDAuNDQ3LTEsMXYyYzAsMC41NTMsMC40NDgsMSwxLDFzMS0wLjQ0NywxLTF2LTJDMjcsMzcuNDQ3LDI2LjU1MiwzNywyNiwzN3oiIGZpbGw9IiMwMDAwMDAiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" />}
                                statsText="Alerts"
                                statsValue="0"
                                statsIconText="Monitoring Alerts"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={8}>
                            <Card
                                title="Peer Data"
                                category="List of current discovered peers"
                                ctTableFullWidth
                                ctTableResponsive
                                content={
                                    <Datatable
                                        tableHeader={header}
                                        tableBody={this.getTableData()}
                                        keyName="peersTable"
                                        tableClass="striped hover responsive"
                                        rowsPerPage={10}
                                        rowsPerPageOption={[5, 10, 15, 20]}
                                    />
                                }
                            />
                            />
                        </Col>
                        <Col md={4}>
                            <Card
                                statsIcon="fa fa-clock-o"
                                title="Assets Support"
                                category="Currently"
                                stats="Assets and Currency Support on Connectors"
                                content={
                                        <ChartistGraph data={dataPie} type="Pie" />
                                }
                                legend={
                                    <div className="legend">
                                        <i className={"glyphicon glyphicon-minus text-info"}/>XRP
                                        <i className={"glyphicon glyphicon-minus text-success"}/> ETH
                                        <i className={"glyphicon glyphicon-minus text-warning"}/> BTC
                                    </div>
                                }
                            />
                            <Card
                                statsIcon="fa fa-clock-o"
                                title="Top Peers"
                                stats="Top Peers by total connected prefix "
                                content={
                                    <Table striped hover>
                                        <thead>
                                        <tr>
                                            <th>Prefix</th>
                                            <th>Peer Count</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>Under Coding ...</tr>
                                        </tbody>
                                    </Table>
                                }
                            />
                        </Col>
                    </Row>

                </Grid>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { peers: state.peers };
}

export default connect(mapStateToProps, { fetchPeers })(Dashboard);

