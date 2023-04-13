import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

function Table() {

  const [items, setItems] = useState([{
    itemID: uuid(),
    itemDescription: "item",
    quantity: 1,
    unitPrice: 100,
    lineTotal: 100
  }]);

  const [taxes, setTaxes] = useState([{
    taxID: uuid(),
    taxName: 'Tax Name',
    taxPercentage: 20,
    taxAmount: 20
  }])

  const [subTotal, setsubTotal] = useState(100)
  const [totalWithTax, setTotalWithTax] = useState(120)

  useEffect(()=>{
      const newSubTotal = items.reduce((accumulator, item) => accumulator + item.lineTotal, 0)
      setsubTotal(newSubTotal);
      setTaxes(taxes.map((tax)=>{
        const newTaxAmount = Math.round((tax.taxPercentage*newSubTotal)/100)
        return {...tax, taxAmount:newTaxAmount}
      }))
  },[items])
  

  useEffect(()=>{
    const newTotalWithTax = taxes.reduce((accumulator, tax) => accumulator + tax.taxAmount, 0)
    setTotalWithTax(newTotalWithTax+subTotal);
  }, [items, taxes])


  const addItem = () => {
    setItems((prev) => {
      return [...prev, {
        itemID: uuid(),
        itemDescription: "item",
        quantity: 1,
        unitPrice: 100,
        lineTotal: 100
      }]
    })
  }

  const handleItemChange = (e, changeItemID) => {
    const fieldName = e.target.name;
    const value = e.target.value;
    validateInput(fieldName, value);
    setItems(
      items.map((item) => {
        if (item.itemID == changeItemID) {
          if (fieldName == 'quantity' || fieldName == 'unitPrice') {

            const otherFieldName = fieldName == 'quantity' ? 'unitPrice' : 'quantity';
            const newLineTotal = value * item[otherFieldName];
            return { ...item, ['lineTotal']: newLineTotal, [fieldName]: value };

          } else {
            return { ...item, [fieldName]: value };
          }
        }
        return item;
      })
    );
  }

  const deleteItem = (delItemID) => {
    setItems(items.filter(item=> item.itemID!=delItemID))
  }

const addTax = () => {
  const newTaxAmount = Math.round(subTotal*0.2)
  setTaxes((prev) => {
    return [...prev, {
      taxID: uuid(),
      taxName: 'Tax Name',
      taxPercentage: 20,
      taxAmount: newTaxAmount
    }]
  })
}

const deleteTax = (delTaxID)=>{
  setTaxes(taxes.filter(tax=> tax.taxID!=delTaxID))
}

const handleTaxChange = (e, changeTaxID) => {
  const fieldName = e.target.name;
  const value = e.target.value
    setTaxes(
      taxes.map((tax) => {
        if (tax.taxID == changeTaxID) {
          if (fieldName == "taxPercentage") {

            const newTaxAmount = Math.round(value * subTotal /100);
            return { ...tax, taxAmount: newTaxAmount, [fieldName]: value };

          } else {
            return { ...tax, [fieldName]: value };
          }
        }
        return tax;
      })
    );
}

function validateInput(fieldName, value){
  if(fieldName == "itemDescription" && value.length==0){
    alert ("Can't be null");
    return false;
  }
  if(fieldName =="quantity" && value.length==0){
    alert("Can't be null");
    return false;
  }
  if(fieldName =="unitPrice" && value.length==0){
    alert("Can't be null");
    return false;
  }
}

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>Quantity</th>
            <th contentEditable="true">Unit Price (₹)</th>
            <th>Line total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.taxID}>
              <td>{index + 1}</td>
              <td>
                <input
                  type="text"
                  name="itemDescription"
                  value={item.itemDescription}
                  onChange={(e) => {
                    handleItemChange(e, item.itemID)
                  }
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  name="quantity"
                  value={item.quantity}
                  onChange={(e) => {
                    handleItemChange(e, item.itemID)
                  }}
                />
              </td>
              <td>
                <input
                  type="number"
                  name="unitPrice"
                  value={item.unitPrice}
                  onChange={(e) => {
                    handleItemChange(e, item.itemID)
                  }}

                />
              </td>
              <td type="number" name="lineTotal" onChange={(e) => handleItemChange(e, item.itemID)}>
                ₹{item.lineTotal}
              </td>
              <td>
                <button className="remove" onClick={() => deleteItem(item.itemID)}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <button className="addNewItem" onClick={() => addItem()}>+ Add Line Item</button>
          </tr>
          <tr>
            <td contentEditable="true"><b>Sub total</b></td>
            <td></td>
            <td></td><td></td>
            <td><b>₹ {subTotal}</b></td>
          </tr>
        </tfoot>
      </table><br />

      <table>

        {taxes.map((tax)=>(
          <tr>
            <td><input contentEditable="true" name="taxName" onChange={(e)=>handleTaxChange(e, tax.taxID)} value={tax.taxName} /></td>
            <td><input contentEditable="true" name="taxPercentage" onChange={(e)=>handleTaxChange(e, tax.taxID)} value={tax.taxPercentage} className='textRight'/>%</td>
            <td name="taxAmount">₹ {tax.taxAmount}</td>
            <td>
                <button className="remove" onClick={() => deleteTax(tax.taxID)}>❌</button>
              </td>
          </tr>
        ))}
        <tr><button className="addNewItem" onClick={()=>addTax()}>+ Add tax</button></tr><br/>
        <tr>
          <td contentEditable="true"><b>Total</b></td>
          <td></td>
          <td><b>₹ {totalWithTax}</b></td>
        </tr>
      </table>
    </div>
  );

}

export default Table;