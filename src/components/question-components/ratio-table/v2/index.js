import { TableHead, TableRow, TableContainer, TableBody, Table, TableCell } from '@mui/material';
import { useTheme, styled } from '@mui/system';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
        backgroundColor: theme.palette.primary.light,
    },
}));

export default function CustomizedTables(props) {
    const { showingAttrs, children } = props;
    const { numbers, headers } = showingAttrs;
    const theme = useTheme();

    let childrenIndex = 0;

    return (
        <TableContainer sx={{ my: 3, borderRadius: 2, width: { xs: '100%', md: '50%' }, mx: 'auto' }}>
            <Table>
                <TableHead>
                    <StyledTableRow>
                        {headers?.map((headerCell) => (
                            <TableCell
                                sx={{
                                    textAlign: 'center',
                                    backgroundColor: theme.palette.primary.dark,
                                    color: 'white',
                                }}
                            >
                                {headerCell}
                            </TableCell>
                        ))}
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {numbers.map((row) => (
                        <StyledTableRow>
                            {row.map((bodyCell) => (
                                <TableCell sx={{ textAlign: 'center' }}>
                                    {bodyCell === 0 ? children[childrenIndex++] : bodyCell}
                                </TableCell>
                            ))}
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
