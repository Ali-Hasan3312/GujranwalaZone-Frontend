import { Column, TableOptions, useTable } from 'react-table';
function TableHOC<T extends Object>(
    columns: Column<T>[],
    data: T[],
    heading: string
){
    return function HOC(){
        const options: TableOptions<T> = {
            columns,
            data
        }
        const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = useTable(options);
        return (
            <div className='overflow-x-auto bg-white shadow-md rounded-lg w-full p-4 '>
                <h2 className='  mt-6 mx-0 mb-8 tracking-[0.2rem] uppercase font-semibold '>{heading}</h2>
                <table {...getTableProps()} className='table'>
                    <thead>
                        {headerGroups.map((headerGroup)=>(
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column)=>(
                                    <th {...column.getHeaderProps()} className=' p-2 text-left font-bold text-base  pb-8 px-4' >
                                        {column.render("Header")}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row) => {
                            prepareRow(row);
                            return(
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell)=>(
                                        <td {...cell.getCellProps()} className=' p-2 text-left'>
                                            {cell.render("Cell")}
                                            </td>
                                    ))}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default TableHOC