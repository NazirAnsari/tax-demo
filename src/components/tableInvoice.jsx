import React, { useState, useEffect } from 'react'

export default function TableInvoice() {
  const [tableData, setTableData] = useState([
    { itemDescription: 'item', quantity: 1, unitPrice: 100, lineTotal: 100, },
  ].map((row, index) => ({ ...row, id: index }))
  );
  const [newRow, setNewRow] = useState({ id: tableData.length, itemDescription: 'item', quantity: 2, unitPrice: 100, lineTotal: 200 });

  const handleAddRow = () => {
    setTableData([...tableData, newRow]);
    setNewRow({ id: tableData.length, itemDescription: 'item', quantity: 3, unitPrice: 100, lineTotal: 300 })
  }

  const [total, setTotal] = useState(100)
  const [gst, setGst] = useState(0)

  const deleteTableRows = (index) => {
    const rows = [...tableData];
    const deleteValue = rows.splice(--index, 1)
    setTableData(rows);
  }

  const handleChange = (index, key, value) => {
    if (key != "itemDescription") {
      var val = parseInt(value)
    }
    else {
      val = value;
    }

    setTableData((prevData) => {
      const newRow = { ...prevData[index], [key]: val };

      if (key === 'unitPrice' || key === 'quantity') {
        newRow.lineTotal = newRow.unitPrice * newRow.quantity;
      }

      const newData = [...prevData];
      newData[index] = newRow;
      return newData;
    });
  };

  useEffect(() => {
    // Calculate the total age whenever the data changes
    const newTotal = tableData.reduce((acc, cur) => acc + cur.quantity * cur.unitPrice, 0);
    setTotal(newTotal);
    // const rows={...tableData,setTotal}
    // setTableData([...tableData,total]);
    // setGst((total*20)/100);
    gstCalculate(total)

  }, [tableData]);

  const gstCalculate = (total) => {
    setGst((total*20)/100);
  }

  // useEffect(()=>{
  //   const newTotal = tableData.reduce((acc, cur) => acc + cur.quantity * cur.unitPrice , 0);
  //   setGst((newTotal*20)/100);
  // },[gst])

  const [tax, setTax] = useState([{ taxName: 'Tax name 1 (20%)', taxPrice: '20%' },])
  const [newTax, setNewTax] = useState({ taxName: 'Tax name 1 (20%)', taxPrice: '20%' })

  const addTax = () => {
    setTax([...tax, newTax]);
    setNewTax({ taxName: 'Tax name 1 (20%)', taxPrice: '20%' })
  }

  const deleteTaxRows = (index) => {
    const rows = [...tax];
    rows.splice(index, 1);
    setTax(rows);
  }
  return (
    <>
      <table className='invoiceTable'>
        <thead>
          <tr>
            <th className='number'>#</th>
            <th className='description'>Item Description</th>
            <th className='quantity'>Quantity</th>
            <th contentEditable="true">Unit Price(₹)</th>
            <th>Line total</th>

          </tr>
        </thead>
        <tbody>
          {tableData.map && tableData.map((row, i) => (
            <tr key={i}>
              <td className='number'>{i}</td>
              <td
                className='description'
                contentEditable="true"
                onBlur={(e) => handleChange(i, 'itemDescription', e.target.textContent)} >
                {row.itemDescription}
              </td>
              <td
                className='quantity'
                contentEditable="true"
                onBlur={(e) => handleChange(i, 'quantity', e.target.textContent)}>{row.quantity}</td>
              <td contentEditable="true" onBlur={(e) => handleChange(i, 'unitPrice', e.target.textContent)}>{row.unitPrice}</td>
              <td><div className='totalCell'
              ><span>{"₹ "}{row.lineTotal}</span>
                <span className='remove' onClick={() => deleteTableRows(i)}>X</span></div></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="addNewItem">
        <span onClick={handleAddRow}>+ Add Line Item</span>
      </div>

      <div className="invoiceTotal">
        <div className="subtotal">
          <div className="subtotalLeft" contentEditable="true">Sub Total</div>
          <span className='subtotalValue'>₹ {total}</span>
        </div>

        {tax.map((taxRow) => (
          <div className="tax">
            <div className="taxName" contentEditable="true">{taxRow.taxName}</div>
            <span className='taxValue'>{gst}
              <span className='remove' onClick={deleteTaxRows}>X</span></span>
          </div>
        ))}
      </div>

      <div className="addNewItem">
        <span onClick={addTax}>+ Add tax</span>
      </div>
    </>
  );
}

