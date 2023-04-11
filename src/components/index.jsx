import React from 'react'
import './textInvoice.css';
import TableInvoice from './tableInvoice';

export default function Index() {

  return (
    <div className='main-div'>
      <h2 contentEditable="true">Advisory Invoice Generator</h2>
      <div className="main-div-header">
        <div className="leftSideBox">
          <div className="advisoryContentSection">
            <div className="advisoryContentHeader">
              <div className="invoiceEditableContent1 companyName" contentEditable="true">Advisory Company Name</div>
              <div className="invoiceEditableContent2 textRight" contentEditable="true">Invoice</div>
            </div>
            <div className="invoiceEditableItem">

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
          <hr/>
          <div className="invoiceMessage" contentEditable="true">
            <span >Dear Ms. Jane Doe</span> <br /> <br />
            <span>Please find below a cost breakdown for the recent work completed . Please make payment
              convininence, and do not hesitate to contact me with any questions.
            </span>
            <br /><br />
            <span>Many Thanks</span> <br />
            <span>Mayank Saraswat/Nazir Ansari</span>

          </div>

          <TableInvoice />

          <div className="grandTotal">
            <div className="invoiceGrandTotal" contentEditable="true">Total</div>
            <span>₹ 120</span>
          </div>

          <div className="greetings"  contentEditable="true">
            <span>Many thanks! I look forward to doing business with you again in due course. </span>
            <br /><span></span>
            <br />
            <span> Payment terms: to be received within 60 days.</span><br /></div>

        </div>

        <div className="rightSideBox">
          <button className='rightBoxDownloadBtn'>Download this invoice</button>
        </div>
      </div>
    </div>
  )
}
