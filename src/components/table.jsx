import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

function Table(props) {

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
          {props.items.map((item, index) => (
            <tr key={item.taxID}>
              <td>{index + 1}</td>
              <td>
                <input
                  type="text"
                  name="itemDescription"
                  value={item.itemDescription}
                  onChange={(e) => {
                    props.handleItemChange(e, item.itemID)
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
                    props.handleItemChange(e, item.itemID)
                  }}
                />
              </td>
              <td>
                <input
                  type="number"
                  name="unitPrice"
                  value={item.unitPrice}
                  onChange={(e) => {
                    props.handleItemChange(e, item.itemID)
                  }}

                />
              </td>
              <td type="number" name="lineTotal" onChange={(e) => props.handleItemChange(e, item.itemID)}>
                ₹{item.lineTotal}
              </td>
              <td>
                <button className="remove" onClick={() => props.deleteItem(item.itemID)}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <button className="addNewItem" onClick={() => props.addItem()}>+ Add Line Item</button>
          </tr>
          <tr>
            <td contentEditable="true"><b>Sub total</b></td>
            <td></td>
            <td></td><td></td>
            <td><b>₹ {props.subTotal}</b></td>
          </tr>
        </tfoot>
      </table><br />

      <table>

        {props.taxes.map((tax)=>(
          <tr>
            <td><input contentEditable="true" name="taxName" onChange={(e)=>props.handleTaxChange(e, tax.taxID)} value={tax.taxName} /></td>
            <td><input contentEditable="true" name="taxPercentage" onChange={(e)=>props.handleTaxChange(e, tax.taxID)} value={tax.taxPercentage} className='textRight'/>%</td>
            <td name="taxAmount">₹ {tax.taxAmount}</td>
            <td>
                <button className="remove" onClick={() => props.deleteTax(tax.taxID)}>❌</button>
              </td>
          </tr>
        ))}
        <tr><button className="addNewItem" onClick={()=> props.addTax()}>+ Add tax</button></tr><br/>
        <tr>
          <td contentEditable="true"><b>Total</b></td>
          <td></td>
          <td><b>₹ {props.totalWithTax}</b></td>
        </tr>
      </table>
    </div>
  );

}

export default Table;