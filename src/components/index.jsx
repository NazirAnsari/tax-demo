import React from 'react'
import './textInvoice.css';
import TableInvoice from './tableInvoice';
export default function Index() {

//   const [tax, setTax] = useState([{ taxName: 'Tax name 1 (20%)', taxPrice: '20%' },])
//   const [newTax, setNewTax] = useState({ taxName: 'Tax name 1 (20%)', taxPrice: '20%' })

//   const addTax = () => {
//     setTax([...tax, newTax]);
//     setNewTax({ taxName: 'Tax name 1 (20%)', taxPrice: '20%' })
//   }

//   const deleteTaxRows = (index)=>{
//     const rows = [...tax];
//     rows.splice(index,1);
//     setTax(rows);
// }

  return (
    <div className='main'>
      <h2 contentEditable="true">Advisory Invoice Generator</h2>
      <div className="main-header">
        <div className="leftBox">
          <div className="advisoryContentSection">
            <div className="advisoryContentHeader">
              <div class="invoiceEditableContent1 companyName" contentEditable="true">Advisory Company Name</div>
              <div class="invoiceEditableContent2 textRight" contentEditable="true">Invoice</div>
            </div>
            <div class="invoiceEditableItem">

              <div className="address">
                <div contentEditable="true">123 your street</div>
                <div contentEditable="true">Your town</div>
                <div contentEditable="true">Address Line 3</div>
              </div>

              <div className='clientInvoiceDetails textRight'>
                <div contentEditable="true">06 April 2023</div>
                <div contentEditable="true">Invoice #2334889</div>
                <div contentEditable="true">PO 456001200</div>
              </div>
            </div>

            <div className="personalInfo">
              <div className="personalInfoLeftBox">
                <div contentEditable="true">(123)456789</div>
                <div contentEditable="true">email@yourcompany.com</div>
              </div>

              <div className="personalInfoRightBox textRight">
                <div contentEditable="true">Att. Ms. Jane Doe</div>
                <div contentEditable="true">Client Company Name</div>
              </div>
            </div>

          </div>
          <div class="invoice-divider"></div>
          <div className="greetings" contentEditable="true">
            <span >Dear Ms. Jane Doe</span> <br /> <br />
            <span>Please find below a cost breakdown for the recent work completed . Please make payment
              convininence, and do not hesitate to contact me with any questions.
            </span>
            <br /><br />
            <span>Many Thanks</span> <br />
            <span>Nazir Ansari</span>

          </div>
          {/* 
          <table className='invoiceTable'>
            <thead>
              <tr>
                <th className='number'>#</th>
                <th className='desccription' contentEditable="true">Item Description</th>
                <th className='quantity' contentEditable="true">Quantity</th>
                <th contentEditable="true">Unit price (rs)</th>
                <th contentEditable="true">Line total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='number' contentEditable="true">1</td>
                <td className='desccription' contentEditable="true">item</td>
                <td className='quantity' contentEditable="true">1</td>
                <td>100</td>
                <td><div className='totalCell' ><span>₹ 100</span>
                  <span className='remove'>X</span></div></td>
              </tr>
            </tbody>
          </table>

          <div className="addNewItem">
            <span contentEditable="true">+ Add Line Item</span>
          </div> */}

          <TableInvoice />

          {/* <div className="invoiceTotal">
            <div className="subtotal">
              <div className="subtotalInner" >Sub Total</div>
              <span className='subtotalInner1'>₹ 100</span>
            </div>
           
              {tax.map((taxRow) => (
                <div className="tax">
                <div className="salesTax" contentEditable="true">{taxRow.taxName}</div>
                <span className='salesTax1'>{taxRow.taxPrice}
                <span className='remove' onClick={deleteTaxRows}>X</span></span>
                </div>
              ))} */}
              {/* <div className="salesTax" contentEditable="true">Tax name 1 (20%)</div>
              <span className='salesTax1' contentEditable="true">₹ 20</span> */}
            
          {/* </div> */}
          {/* <div className="addNewItem">
            <span onClick={addTax}>+ Add tax</span>
          </div> */}

          <div className="grandTotal">
            <div className="invoiceGrandTotal">
              Total
            </div>
            <span>₹ 120</span>
          </div>

          <div class="textarea"  contentEditable="true">
            <span>Many thanks! I look forward to doing business with you again in due course. </span>
            <br /><span></span>
            <br />
            <span> Payment terms: to be received within 60 days.</span><br /></div>

        </div>


        <div className="rightBox">
          <button class='rightBoxBtn'>Download this invoice</button>
        </div>
      </div>
    </div>
  )
}
