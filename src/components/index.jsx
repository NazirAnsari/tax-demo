import React, { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid';
import './textInvoice.css';
import Table from './table';
import axios from 'axios';

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

 const downloadPdf = async()=>{
  const data={
    "advisoryCompanyName" : document.getElementsByClassName('companyName')[0].innerHTML,
    "invoice Heading" : document.getElementsByClassName('invoiceEditableContent2')[0].innerHTML,
    "address" : document.getElementsByClassName('address')[0].innerText,
    "contactNo" : document.getElementsByClassName('mobileNo')[0].innerHTML,
    "email" : document.getElementsByClassName('email')[0].innerHTML, 
    "date": document.getElementsByClassName('date')[0].innerText,
    "invoiceID": document.getElementsByClassName('invoiceID')[0].innerText,
    "poNumber" : document.getElementsByClassName('clientInvoiceDetails')[0].innerText,
    "clientName" : document.getElementsByClassName('clientName')[0].innerText,
    "clientCompanyName" : document.getElementsByClassName('clientCompanyName')[0].innerText,
    "userMessage" : document.getElementsByClassName('invoiceMessage')[0].innerText,
    "items":items,
    "tax": taxes,
    "subTotalName":document.getElementsByClassName('subTotalName')[0].innerText,
    "subTotal": subTotal,
    "totalWithTaxName": document.getElementsByClassName('totalWithTaxName')[0].innerText,
    "totalWithTax": totalWithTax,
    "conclusionMessage": document.getElementsByClassName('greetings')[0].innerText
  }

//  await axios
//   .post("/insertData", {data})
//   .then((response) => {
//     console.log(response)
//   })

  console.log(data,Object.keys(data).length);
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

              <div className='clientInvoiceDetails textRight'>
                <div contentEditable="true" className='date'>06 April 2023</div>
                <div contentEditable="true" className='invoiceID'>Invoice #2334889</div>
                <div contentEditable="true">PO 456001200</div>
              </div>
            </div>

            <div className="personalInfo">
              <div className="personalInfoLeftBox">
                <div contentEditable="true" className='mobileNo'>(123)456789</div>
                <div contentEditable="true" className='email'>email@yourcompany.com</div>
              </div>

              <div className="personalInfoRightBox textRight">
                <div contentEditable="true" className='clientName'>Att. Ms. Jane Doe</div>
                <div contentEditable="true" className='clientCompanyName'>Client Company Name</div>
              </div>
            </div>

          </div>
          <hr/>
          <br />
          <div className="invoiceMessage" contentEditable="true">
            <span >Dear Ms. Jane Doe</span> <br /> <br />
            <span>Please find below a cost breakdown for the recent work completed . Please make payment
              convininence, and do not hesitate to contact me with any questions.
            </span>
            <br /><br />
            <span>Many Thanks</span> <br />
            <span>Mayank Saraswat/Nazir Ansari</span>

          </div>
          <br />
          <br />

          <Table key="child1" items={items}  
           taxes={taxes} addItem={addItem}
           handleItemChange={handleItemChange}
           deleteItem={deleteItem}
           addTax={addTax}
           deleteTax={deleteTax}
           handleTaxChange={handleTaxChange}
           subTotal={subTotal}
           totalWithTax={totalWithTax}/>

          <div className="greetings"  contentEditable="true">
            <span>Many thanks! I look forward to doing business with you again in due course. </span>
            <br /><span></span>
            <br />
            <span> Payment terms: to be received within 60 days.</span><br /></div>

        </div>

        <div className="rightSideBox">
          <button className='rightBoxDownloadBtn' onClick={()=>downloadPdf()}>Download this invoice</button>
        </div>
      </div>
    </div>
  )
}