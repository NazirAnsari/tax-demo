import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import './textInvoice.css';
import Table from './table';

export default function Index() {
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
              {/* <p>{console.log(document.getElementsByClassName("address")[0].innerHTML)}</p> */}
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

          </div><br/>
          <hr/>
          <div className="invoiceMessage" contentEditable="true">
            <span >Dear Ms. Jane Doe</span> <br /> <br />
            <span>Please find below a cost breakdown for the recent work completed . Please make payment
              convininence, and do not hesitate to contact me with any questions.
            </span>
            <br /><br />
            <span>Many Thanks,</span> <br />
            <span>Mayank Saraswat/Nazir Ansari</span>

          </div><br/><hr/>

          <Table items= {items}
                 taxes= {taxes}
                 subTotal= {subTotal}
                 totalWithTax = {totalWithTax}
                 addItem = {addItem}
                 handleItemChange = {handleItemChange}
                 deleteItem = {deleteItem}
                 addTax = {addTax}
                 deleteTax = {deleteTax}
                 handleTaxChange = {handleTaxChange}
                 />
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
