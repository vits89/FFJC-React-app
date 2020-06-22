import React, { FunctionComponent } from 'react';
import { Link as RouterLink, useRouteMatch } from 'react-router-dom';

import {
  Button,
  Checkbox,
  Link,
  Paper,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core';

type TableComponentProps = {
  columnNames: { [key: string]: string },
  rowData: { [key: string]: any }[],
  deleteRow?: (id: string) => void;
  changeStatus?: (id: string) => void;
};

export const Table: FunctionComponent<TableComponentProps> = ({ columnNames, rowData, deleteRow, changeStatus }) => {
  const routeMatch = useRouteMatch();

  return (
    <TableContainer component={ Paper }>
      <MuiTable size="small">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            { Object.entries(columnNames).map(([propName, name]) => (
              <TableCell align="right" key={ propName }>{ name }</TableCell>
            )) }
            { deleteRow &&
              <TableCell align="center">Actions</TableCell> }
          </TableRow>
        </TableHead>
        <TableBody>
          { rowData.map((data, index) => (
            <TableRow hover key={ data['id'] || index }>
              <TableCell component="th" scope="row" key={ `number.${ index }` }>{ index + 1 }</TableCell>
              { Object.entries(columnNames).map(([propName, colName], index) => (
                <TableCell align="right" key={ `${ propName }.${ index }` }>
                  { typeof(data[propName]) === 'boolean' ?
                    <Checkbox
                      checked={ data[propName] }
                      color="default"
                      inputProps={ { 'aria-label': colName } }
                      disabled={ !changeStatus }
                      onChange={ changeStatus ? () => changeStatus(data['id'] || index) : undefined }
                    /> :
                    data[propName] ?
                      propName === 'name' ?
                        <Link component={ RouterLink } to={ `${ routeMatch.path }/${ data['id'] || index }` }>
                          { data[propName] }
                        </Link> :
                        data[propName] :
                    '' }
                </TableCell>
              )) }
              { deleteRow &&
                <TableCell align="center" key={ `delete.${ index }` }>
                  <Button variant="contained" color="secondary" onClick={ () => deleteRow(data['id'] || index) }>
                    Delete
                  </Button>
                </TableCell> }
            </TableRow>
          )) }
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};
