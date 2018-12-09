import React, { Component } from "react";
import { connect } from "react-redux";


import isEmpty from 'lodash/isEmpty';

// ui
import { Row, Col} from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import Datatable from "components/DataTable/DataTable.jsx";

// actions
import { fetchAlerts } from "actions/index.jsx";




const header = [
    { title: 'Time', prop: 'time', sortable: true, filterable: false},
    { title: 'Peer', prop: 'peer', sortable: true, filterable: true },
    { title: 'Description', prop: 'desc', sortable: true, filterable: true },
    { title: 'Status', prop: 'status', sortable: true },
    { title: 'Duration', prop: 'duration'} ,
];


class AlertsView extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount(){
        const { alerts, fetchAlerts } = this.props ;

        if (isEmpty(alerts)) {
            fetchAlerts()
        }
    }

    convertMS(timestamp) {
        var string = '',
            periods = {
                d: 86400000,
                h: 3600000,
                m: 60000,
                s: 1000,
                millisecond: 1
            };

        delete periods.millisecond;

        for (var period in periods) {
            var number = Math.floor(timestamp / periods[period]);
            timestamp -= (number * periods[period]);
            string += (number !== 0 ? number + '' + period + ((number !== 1) ? ' ' : ' ') + '' : '');
        }

        return string.trim();
    };

    getTableData(){
        const {alerts} = this.props ;
        let dataTable = [];

        if (isEmpty(alerts)) {
            return dataTable
        }

        alerts.map((p) => {
            let duration = "0s";
            console.log(p)

            if (p.status === 'RESOLVED'){
                duration =  new Date(p.resolve_time) - new Date(p.create_time)
            }else{
                duration =   new Date(p.now) - new Date(p.create_time)
            }
            dataTable.push({
                time: p.create_time,
                peer: p.peer,
                desc: `Connector is down in ${p.peer}`,
                status: p.status === 'RESOLVED' ? (<span className="text-success">RESOVLED</span>) : (<span className="text-danger">PROBLEM</span>),
                duration: this.convertMS(duration)
            })
        });

        return dataTable

    }

    render() {
        return (
            <div className="content">
                <Row>
                    <Col md={12}>
                        <Card
                            title="Alerts"
                            category="List of monitoring alerts"
                            ctTableFullWidth
                            ctTableResponsive
                            content={
                                <Datatable
                                    tableHeader={header}
                                    tableBody={this.getTableData()}
                                    keyName="peersTable"
                                    tableClass="striped hover responsive"
                                    rowsPerPage={10}
                                    initialSort={{prop: "time", isAscending: false}}
                                    rowsPerPageOption={[5, 10, 15, 20]}
                                />
                            }
                        />
                    </Col>

                </Row>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { alerts: state.alerts };
}

export default connect(mapStateToProps, { fetchAlerts })(AlertsView);
