import React from "react";

// // column example
// const column = [
//   {
//     label: "Name",
//     key: "name",
//     component: ({ content }) => <div>{content}</div>,
//   },
//   {
//     label: "Age",
//     key: "age",
//   },
// ];

// // collection example
// const collection = [
//   { name: "Manoj", age: 5 },
//   { name: "Ram", age: 15 },
// ];

export const getDataAtDepth = (key, record) => {
  return key.split(".").reduce((recordFrag, frag) => {
    return recordFrag ? recordFrag[frag] : "";
  }, record);
};

const Header = ({ columnSchema, numbered, actions }) => {
  return (
    <thead>
      <tr key={`sn${Math.random()}`}>
        {numbered && <th style={{ maxWidth: "6%", textAlign: "center" }}>#</th>}
        {columnSchema.map((col, index) => {
          return (
            <th
              className={col.className}
              colSpan={col.columns ? col.columns.length : null}
              key={`${index}${Math.random()}`}
              width={col.width || null}
            >
              {col.label}
            </th>
          );
        })}
        {actions && <th></th>}
      </tr>
    </thead>
  );
};

const Body = ({
  columnSchema,
  actions,
  records,
  cellProps,
  collection,
  numbered,
  ...rest
}) => {
  return (
    <tbody>
      {collection.map((row, ndx) => {
        let actionComponent =
          actions &&
          React.cloneElement(actions, { record: row, ...actions.props });
        return (
          <tr key={`${ndx}${Math.random()}`} disabled={row.disabled}>
            {numbered && (
              <td style={{ textAlign: "center" }}>
                {ndx +
                  (collection.record_range ? collection.record_range[0] : 1)}
              </td>
            )}
            {columnSchema.map((cell, index) => {
              if (cell.component)
                return (
                  <td key={`${ndx}${index}${Math.random()}`}>
                    <cell.component
                      {...rest}
                      {...cellProps}
                      record={row}
                      content={getDataAtDepth(cell.key, row)}
                      ckey={cell.key}
                    />
                  </td>
                );
              return (
                <td {...cellProps} key={`${ndx}${index}${Math.random()}`}>
                  {getDataAtDepth(cell.key, row)}
                </td>
              );
            })}
            {!!actions && (
              <td {...cellProps} key={`${ndx}${Math.random()}`}>
                {actionComponent}
              </td>
            )}
          </tr>
        );
      })}
    </tbody>
  );
};

const Footer = ({ collection, columnLength, paginated }) => {
  return (
    <tfoot>
      <tr>
        <th colSpan={columnLength}>
          <div
            style={{
              padding: ".92857143em 1.14285714em",
              lineHight: "1",
              display: "inline-grid",
            }}
          >
            {paginated &&
              `Showing ${collection.record_range[0]} to ${collection.record_range[1]} of ${collection.total_records}`}
          </div>
          {paginated && (
            <div className="ui right floated pagination menu">
              <a className="icon item">
                <i className="left chevron icon"></i>
              </a>
              <a className="item">1</a>
              <a className="item">2</a>
              <a className="item">3</a>
              <a className="item">4</a>
              <a className="icon item">
                <i className="right chevron icon"></i>
              </a>
            </div>
          )}
        </th>
      </tr>
    </tfoot>
  );
};

const Table = (props) => {
  const {
    collection,
    columnSchema,
    handlePageChange,
    numbered,
    actions,
    tableClass,
    basic,
    ...rest
  } = props;
  let columnLength = columnSchema.length;
  if (numbered) {
    columnLength = columnLength + 1;
  }
  if (actions) {
    columnLength = columnLength + 1;
  }
  const paginated = handlePageChange && collection.total_pages > 1;
  return (
    <table className={`ui ${tableClass ? tableClass : "celled compact"} table`}>
      <Header
        columnSchema={columnSchema}
        numbered={numbered}
        actions={!!actions}
      />
      <Body
        {...rest}
        columnSchema={columnSchema}
        handlePageChange={handlePageChange}
        collection={collection.records || collection}
        actions={actions}
        numbered={numbered}
      />
      {!basic && (
        <Footer
          paginated={paginated}
          collection={collection}
          columnLength={columnLength}
        />
      )}
    </table>
  );
};

export { Table };
