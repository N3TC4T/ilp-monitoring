import React from "react";
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Table from 'react-bootstrap/lib/Table';
import classNames from 'classnames';
import Datatable from 'react-bs-datatable';

import {
    sortData,
    filterData,
    paginateData,
} from 'react-bs-datatable/lib/utils/ClassHelpers';
import Pagination from 'react-bs-datatable/lib/Pagination';
import PaginationOpts from 'react-bs-datatable/lib/PaginationOpts';
import TableHeader from 'react-bs-datatable/lib/TableHeader';
import TableBody from 'react-bs-datatable/lib/TableBody';
import Filter from 'react-bs-datatable/lib/Filter';


export class CustomTable extends Datatable {
    render() {
        const { sortedProp, filterText, rowsPerPage, currentPage } = this.state;
        const {
            tableHeader,
            tableBody,
            onSort,
            tableClass: customClass,
            keyName,
            labels,
            rowsPerPageOption,
        } = this.props;


        const filteredData = filterData(tableHeader, filterText, undefined, tableBody);

        const sortedData = sortData(sortedProp, onSort, filteredData);


        const paginatedData = paginateData(rowsPerPage, currentPage, sortedData);


        const tableClass = classNames({
            'table-datatable': true,
            [`${customClass}`]: true,
        });


        return (
            <Row>
                <Col xs={12} md={4} className="text-right">
                    <Filter
                        tableHeader={tableHeader}
                        onChangeFilter={this.onChangeFilter}
                        filterText={filterText}
                        keyName={keyName}
                    />
                </Col>
                <Col xs={12}>
                    <Table className={tableClass}>
                        <TableHeader
                            tableHeader={tableHeader}
                            keyName={keyName}
                            sortedProp={sortedProp}
                            onSortChange={this.onSortChange}
                        />
                        <TableBody
                            tableHeader={tableHeader}
                            keyName={keyName}
                            labels={labels}
                            paginatedData={paginatedData}
                        />
                    </Table>
                </Col>
                <Col xs={12} md={4}>
                    <PaginationOpts
                        labels={labels}
                        onRowsPerPageChange={this.onRowsPerPageChange}
                        rowsPerPage={rowsPerPage}
                        rowsPerPageOption={rowsPerPageOption}
                        keyName={keyName}
                    />
                </Col>
                <Col xs={12} md={8}>
                    <Pagination
                        data={sortedData}
                        rowsPerPage={rowsPerPage}
                        keyName={keyName}
                        currentPage={currentPage}
                        onPageNavigate={this.onPageNavigate}
                        labels={labels}
                    />
                </Col>
            </Row>
        );
    }
}

export default CustomTable;
