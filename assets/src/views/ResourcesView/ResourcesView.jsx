import React, { Component } from "react";
import { connect } from "react-redux";


// ui
import { Row, Col} from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";


class ResourcesView extends Component {
    constructor(props) {
        super(props);2

    }


    render() {
        return (
            <div className="content">
                <Row>
                    <Col md={12}>
                        <Card
                            title="Resource"
                            stats="Bunch of article and resource for ILP connectors"
                            content={
                                <div
                                    id="chartPreferences"
                                    className="ct-chart ct-perfect-fourth"
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
    return { };
}

export default connect(mapStateToProps, { })(ResourcesView);
