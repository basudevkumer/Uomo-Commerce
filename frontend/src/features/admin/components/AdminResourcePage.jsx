import { Download, MoreHorizontal, Plus, Search } from "lucide-react";
import { AdminCard, AdminPageIntro, AdminStatus } from "./AdminShell";

export function MetricGrid({ items }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map(([label, value, note]) => (
        <AdminCard key={label} className="p-5">
          <p className="text-[12px] text-second">{label}</p>
          <p className="mt-2 text-[26px] font-bold tracking-[-.04em]">
            {value}
          </p>
          {note && (
            <p className="mt-3 text-[11px] font-semibold text-[#16834b]">
              {note}
            </p>
          )}
        </AdminCard>
      ))}
    </div>
  );
}

export function ResourceTable({ columns, rows, statusColumn = -1 }) {
  return (
    <AdminCard className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-footer px-5 py-4 sm:px-6">
        <div>
          <p className="text-[12px] font-semibold">{rows.length} records</p>
          <p className="mt-1 text-[11px] text-second">
            Static dashboard preview
          </p>
        </div>
        <MoreHorizontal size={18} className="text-second" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left">
          <thead className="bg-secondbg text-[10px] uppercase tracking-[.12em] text-second">
            <tr>
              {columns.map((column) => (
                <th key={column} className="px-6 py-3 font-semibold">
                  {column}
                </th>
              ))}
              <th />
            </tr>
          </thead>
          <tbody className="divide-y divide-footer">
            {rows.map((row, index) => (
              <tr key={`${row[0]}-${index}`} className="hover:bg-secondbg/60">
                {row.map((cell, cellIndex) => (
                  <td
                    key={`${cell}-${cellIndex}`}
                    className="px-6 py-5 text-[12px] text-second"
                  >
                    {cellIndex === 0 ? (
                      <span className="font-semibold text-head">{cell}</span>
                    ) : cellIndex === statusColumn ? (
                      <AdminStatus
                        type={
                          cell === "Active" ||
                          cell === "In stock" ||
                          cell === "Approved" ||
                          cell === "Paid" ||
                          cell === "Delivered"
                            ? "green"
                            : cell === "Pending" ||
                                cell === "Processing" ||
                                cell === "Under review"
                              ? "orange"
                              : "blue"
                        }
                      >
                        {cell}
                      </AdminStatus>
                    ) : (
                      cell
                    )}
                  </td>
                ))}
                <td className="px-6 py-5">
                  <button
                    aria-label={`More options for ${row[0]}`}
                    className="rounded-lg p-2 text-second hover:bg-secondbg"
                  >
                    <MoreHorizontal size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminCard>
  );
}

export function ResourceHeader({
  placeholder = "Search...",
  action = "Add new",
}) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row">
      <div className="flex h-11 flex-1 items-center gap-3 rounded-xl border border-footer bg-white px-3.5 text-[12px] text-second">
        <Search size={16} />
        <span>{placeholder}</span>
      </div>
      <button className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-head px-4 text-[11px] font-semibold text-white hover:bg-black">
        <Plus size={14} />
        {action}
      </button>
    </div>
  );
}

export function ExportButton() {
  return (
    <button className="inline-flex items-center gap-2 rounded-xl border border-footer px-3 py-2 text-[11px] font-semibold">
      <Download size={14} /> Export
    </button>
  );
}

export default function AdminResourcePage({
  eyebrow,
  title,
  description,
  metrics,
  columns,
  rows,
  statusColumn,
  placeholder,
  action,
}) {
  return (
    <div>
      <AdminPageIntro
        eyebrow={eyebrow}
        title={title}
        description={description}
      />
      {metrics && (
        <div className="mb-5">
          <MetricGrid items={metrics} />
        </div>
      )}
      <ResourceHeader placeholder={placeholder} action={action} />
      <ResourceTable
        columns={columns}
        rows={rows}
        statusColumn={statusColumn}
      />
    </div>
  );
}
