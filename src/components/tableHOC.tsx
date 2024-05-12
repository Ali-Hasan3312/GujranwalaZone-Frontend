import { AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai';
import { Column, TableOptions, useTable,useSortBy,usePagination } from 'react-table';
function TableHOC<T extends Object>(
    columns: Column<T>[],
    data: T[],
    heading: string,
    showPagination: boolean = false
){
    return function HOC(){
        const options: TableOptions<T> = {
            columns,
            data,
            initialState:{
                pageSize : 4
            },
            
           
        }
        const {getTableProps,
             getTableBodyProps,
              headerGroups,
              page,
               prepareRow,
               nextPage,
               pageCount,
               state:{pageIndex},
               previousPage,
               canNextPage,
               canPreviousPage} = useTable(options,useSortBy,usePagination,);
        return (
            <div className='overflow-x-auto bg-white shadow-md rounded-lg w-full p-4 '>
                <h2 className='  mt-6 mx-0 mb-8 tracking-[0.2rem] uppercase font-semibold'>{heading}</h2>
                <table {...getTableProps()} className='table'>
                    <thead>
                        {headerGroups.map((headerGroup)=>(
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column)=>(
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())} className=' p-2 text-left font-bold text-base  pb-8 px-4' >
                                        {column.render("Header")}
                                        {column.isSorted &&( <span>  {column.isSortedDesc? (<AiOutlineSortDescending/>) : (<AiOutlineSortAscending/>)} </span>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row) => {
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
                {showPagination && (
                    <div className='flex flex-row justify-center items-center gap-4 p-8'>
                        <button disabled={!canPreviousPage} onClick={previousPage} className=' py-2 px-4 border-none outline-none rounded-lg cursor-pointer bg-blue-400 text-white disabled:bg-blue-400 disabled:opacity-40 disabled:cursor-not-allowed'>Prev</button>
                        <span>{`${pageIndex + 1} of ${pageCount}`}</span>
                        <button disabled={!canNextPage} onClick={nextPage} className=' py-2 px-4 border-none outline-none rounded-lg cursor-pointer bg-blue-400 text-white disabled:bg-blue-400 disabled:opacity-40 disabled:cursor-not-allowed'>Next</button>
                    </div>
                )}
            </div>
        )
    }
}

export default TableHOC