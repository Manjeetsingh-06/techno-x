import React from 'react';
import { EmptyState } from './EmptyState';
import { LoadingState } from './LoadingState';

export const DataTable = ({
  columns = [],
  data = [],
  isLoading = false,
  emptyMessage = 'No records found',
  emptySubtext = 'Try adjusting your search filters or add a new record.',
  onRowClick,
  keyField = 'id',
}) => {
  if (isLoading) {
    return <LoadingState message="Loading data records..." />;
  }

  if (!data || data.length === 0) {
    return <EmptyState title={emptyMessage} description={emptySubtext} />;
  }

  return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-800 bg-navy-900/60 backdrop-blur-md shadow-xl">
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-navy-950/80 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800/80">
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={col.key || idx}
                  className={`px-4 py-3.5 font-semibold ${col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'} ${col.className || ''}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {data.map((row, rowIdx) => (
              <tr
                key={row[keyField] || rowIdx}
                onClick={() => onRowClick && onRowClick(row)}
                className={`transition-colors ${
                  onRowClick ? 'cursor-pointer hover:bg-blue-600/10' : 'hover:bg-slate-800/30'
                }`}
              >
                {columns.map((col, colIdx) => (
                  <td
                    key={col.key || colIdx}
                    className={`px-4 py-3.5 align-middle ${
                      col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                    } ${col.className || ''}`}
                  >
                    {col.render ? col.render(row[col.key], row, rowIdx) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
