import React, { useEffect, useState } from 'react';

function Table() {
  const [currentID, setCurrID] = useState(2);
  const [currentTaxID, setCurrTaxID] = useState(2);
  const [data, setData] = useState([
    { uid: 1, itemDescription: 'Item', quantity: 1, unitPrice: 100, lineTotal: 100 }
  ]);
  const [subTotal, setsubTotal] = useState(100);
  const [grandTotal, setGrandTotal] = useState(0);
  const [taxCal, setTaxCal] = useState(0)
  const [tax, setTax] = useState([])


  const addTax = () => {
    setCurrTaxID(currentTaxID+1);
    setTax((prevVal) => {
      return [...prevVal, {uid: currentTaxID, taxName: 'Tax name', taxPercent: 20 , taxAmount: 20 }]
    })
    console.log(tax);
  }

  const deleteTaxRows = (delTaxID) => {
    setTax(tax.filter((row)=>row.uid!=delTaxID));
  }

  const handleChangeTax = (e, taxID) => {
    const fieldName = e.target.name;
    const value = e.target.value;

    setTax(
      tax.map((row) => {
        if (row.uid == taxID) {
          if (fieldName == 'taxPercent') {

            const newTaxAmount = Math.round(subTotal*value/100);
            return { ...row, ['taxAmount']: newTaxAmount, [fieldName]: value };

          } else {
            return { ...row, [fieldName]: value };
          }
        }
        return row;
      })
    );

  }

  const addRow = () => {
    setCurrID(currentID + 1);

    setData((prevVal) => {
      return [...prevVal, { uid: currentID, itemDescription: 'Item', quantity: 1, unitPrice: 100, lineTotal: 100 }]
    })
    updateTaxAmount();
    
  };
console.log(tax);

  const deleteRow = (e, rowID) => {
    setData(data.filter((row) => row.uid != rowID));
  };

  const handleChange = (e, id) => {

    const fieldName = e.target.name;
    const value = e.target.value
    setData(
      data.map((row) => {
        if (row.uid == id) {
          if (fieldName == 'quantity' || fieldName == 'unitPrice') {

            const otherFieldName = fieldName == 'quantity' ? 'unitPrice' : 'quantity';
            const newLineTotal = value * row[otherFieldName];
            return { ...row, ['lineTotal']: newLineTotal, [fieldName]: value };

          } else {
            return { ...row, [fieldName]: value };
          }
        }
        return row;
      })
    );

    // const newSubTotal = calSubTotal();
    // setsubTotal(newSubTotal);
  };

  const updateTaxAmount = ()=>{
    setTax(
      tax.map((row) => {
    

            const newTaxAmount = Math.round(subTotal*row.taxPercent/100);
            return { ...row, ['taxAmount']: newTaxAmount};

      })
    )
  }



  useEffect(() => {
    const newSubTotal = data.reduce((accumulator, currentElement) => accumulator + currentElement.lineTotal, 0)
    setsubTotal(newSubTotal);
    const newTaxCal = tax.reduce((accumulator, currentElement) => accumulator + currentElement.taxAmount, 0)
   
    setTaxCal(newTaxCal)
    setGrandTotal(taxCal + newSubTotal)
    
  }, [data,tax])



  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>Quantity</th>
            <th contentEditable="true">Unit Price</th>
            <th>Line total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={row.uid}>
              <td>{index + 1}</td>
              <td>
                <input
                  type="text"
                  name="itemDescription"
                  value={row.itemDescription}
                  onChange={(e) => {
                    console.log(e.target);
                    handleChange(e, row.uid)
                  }
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  name="quantity"
                  value={row.quantity}
                  onChange={(e) => {
                    console.log(e.target);
                    handleChange(e, row.uid)
                  }}

                />
              </td>
              <td>
                <input
                  type="number"
                  name="unitPrice"
                  value={row.unitPrice}
                  onChange={(e) => {
                    console.log(e.target);
                    handleChange(e, row.uid)
                  }}

                />
              </td>
              <td type="number" name="lineTotal" onChange={(e) => handleChange(e, row.uid)}>
              ₹{row.lineTotal}
              </td>
              <td>
                <button className = "remove" uid={row.uid} onClick={(e) => deleteRow(e, row.uid)}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <button className="addNewItem"  onClick={() => addRow()}>+ Add Line Item</button>
          </tr>
          <tr>
          <td contentEditable="true"><b>Sub total</b></td>
          <td></td>
          <td></td>
          <td><b>₹ {subTotal}</b></td>
        </tr>
        </tfoot>
        </table><br/>

        <table>
        {tax.map((taxRow, index) => (
          <tr key={index}>
            <input type='text'name='taxName' value={taxRow.taxName} onChange={(e)=>handleChangeTax(e, taxRow.uid)} />
            {/* <td className="taxName" onChange={(e)=>handleChangeTax(e, taxRow.uid)} contentEditable="true">{taxRow.taxName}</td> */}
            <input type='number'name='taxPercent' value={taxRow.taxPercent} onChange={(e)=>handleChangeTax(e, taxRow.uid)} />
            {/* <td className='taxPercent' onChange={(e)=>handleChangeTax(e, taxRow.uid)} contentEditable="true">{taxRow.taxPercent}%</td> */}
            <td className='taxAmount'>₹ {taxRow.taxAmount}<button className='remove' onClick={()=>deleteTaxRows(taxRow.uid)}>X</button></td>
            {/* <td className='remove' onClick={deleteTaxRows}>X</td> */}
          </tr>
        ))}

        <tr><button className="addNewItem" onClick={addTax}>+ Add tax</button></tr><br/>
        <tr>
          <td contentEditable="true"><b>Total</b></td>
          <td></td>
          <td><b>₹ {grandTotal}</b></td>
        </tr>
      </table>
    </div>
  );

}

export default Table;
