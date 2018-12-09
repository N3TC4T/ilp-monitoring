import React, { Component } from "react";
import { connect } from "react-redux";


// ui
import { Row, Col} from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";


class MapView extends Component {
    constructor(props) {
        super(props);2

    }


    render() {
        return (
            <div className="content">
                <Row>
                    <Col md={12}>
                        <Card
                            title="Map View"
                            category="Global"
                            stats="Distribution connectors over the earth"
                            content={
                                <div
                                >
                                    <h1 className={"text-center"}>
                                       THIS SECTION IS UNDER CODING ...
                                    </h1>

                                </div>
                            }
                        />
                    </Col>

                </Row>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { peers: state.peers };
}

export default connect(mapStateToProps, { })(MapView);
