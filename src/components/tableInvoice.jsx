import React, { useState, useEffect } from 'react'

export default function TableInvoice() {

  const [subTotal, setsubTotal] = useState(100)
  const [gst, setGst] = useState(0)
  const [grandTotal, setGrandTotal] = useState(0)

  const [tax, setTax] = useState([{ id: 0, taxName: 'Tax name 1 ', taxValue: 20, taxPrice: 0.2 },])
  const newTax = ({ taxName: 'Tax name 1 ', taxValue: 20, taxPrice: 0.2 })

  // const [pc, setpc] = useState(20)

  const [tableData, setTableData] = useState([
    { id: 0, itemDescription: 'item', quantity: 1, unitPrice: 100, lineTotal: 100, },
  ]
  );
  const newRow = ({ id: tableData.length, itemDescription: 'item', quantity: 1, unitPrice: 100, lineTotal: 100 });



  //function implemented from here

  const handleAddRow = () => {
    setTableData([...tableData, newRow]);
  }



  //delete table rows
  const deleteTableRows = (index) => {
    const rows = [...tableData];
    rows.splice(index, 1)
    setTableData(rows);
  }



  const addTax = () => {
    setTax([...tax, newTax]);
  }

  const deleteTaxRows = (index) => {
    const rows = [...tax];
    rows.splice(index, 1);
    setTax(rows);
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

  const handleChangeTax = (index, key, value) => {
    console.log("11112 handleChangeTax", index, key, value, subTotal)
    setTax((prevData) => {
      const newRow = { ...prevData[index], [key]: value };

      if (key === 'taxValue') {
        newRow.taxPrice = (subTotal * value) / 100;
        newRow.taxPrice=newRow.taxPrice/100;
      }
      console.log("11112 again hii",newRow.taxPrice)
      // setpc(newRow.taxPrice *100)
      const newData = [...prevData];
      newData[index] = newRow;
      return newData;
    });

  }

  useEffect(() => {
    // Calculate the total lineTotal whenever the data changes
    const newsubTotal = tableData.reduce((acc, currentElement) => acc + currentElement.quantity * currentElement.unitPrice, 0);
    const newGst = tax.reduce((acc, currentElement) => acc + currentElement.taxPrice, 0);
    console.log(newGst, "1111 check kro")
    setsubTotal(newsubTotal);

    setGst((newsubTotal * newGst));
    console.log(gst, subTotal, "1111 gst, subTotal")

    // setTax(updateTaxPrice);
    // setpc((newsubTotal *0.2));

    setGrandTotal(gst + newsubTotal)

  }, [tableData, tax, subTotal, gst, grandTotal]);

  let tableDataIndex = 0;

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
              <td className='number'>{++tableDataIndex}</td>
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
              ><span>₹{row.lineTotal}</span>
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
          <span className='subtotalValue'>₹ {subTotal}</span>
        </div>

        {tax.map((taxRow, index) => (
          <div className="tax">
            <div className="taxName">{taxRow.taxName}
            <span>(</span>
              <span contentEditable="true" 
              onBlur={(e) => handleChangeTax(index, 'taxValue', e.target.textContent)} >{taxRow.taxValue}</span>%)<span></span></div>
            <span className='taxValue'>₹{taxRow.taxPrice *100}
              <span className='remove' onClick={deleteTaxRows}>X</span></span>
          </div>
        ))}
      </div>

      <div className="addNewItem">
        <span onClick={addTax}>+ Add tax</span>
      </div>
      <div className="grandTotal">
        <div className="invoiceGrandTotal" contentEditable="true">Total</div>
        <span>₹ {grandTotal}</span>
      </div>
    </>
  );
}
