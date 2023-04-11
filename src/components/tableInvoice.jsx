import React,{useState} from 'react'

export default function TableInvoice() {
    const [tableData, setTableData] = useState([
        {  itemDescription: 'item', quantity: 1 , unitPrice:100, lineTotal:100,},]
      );
    
      const [newRow, setNewRow] = useState({ itemDescription: 'item', quantity: 2 , unitPrice: 100,lineTotal:100});

      const handleAddRow=()=> {
        setTableData([...tableData, newRow]);
        tableData.length++;
        setNewRow({ itemDescription: 'item', quantity: 3 , unitPrice: 100 ,lineTotal:100})
      }

      const deleteTableRows = (index)=>{
        const rows = [...tableData];
       const deleteValue=rows.splice(--index,1)
       console.log("deleteValue",deleteValue);
        setTableData(rows);
   }

   const updateTableRows =(event,index)=>{
    event.preventDefault()

      const name = event.target.name.value
      const email = event.target.email.value
      const mobile = event.target.contact.value

    const rows=[...tableData];
    const quantity = rows[index].quantity;
    const price=rows[index].price;
    rows[index]=price * quantity;
   }
      return (
        <>
        <table className='invoiceTable'>
          <thead>
            <tr>
              <th className='number'>#</th>
              <th className='desccription'>Item Description</th>
              <th className='quantity'>Quantity</th>
              <th>Unit Price(₹)</th>
              <th>Line total</th>

            </tr>
          </thead>
          <tbody>
            {tableData.map && tableData.map((row,i) => (
              <tr key={i}>
                <td className='number'>{++i}</td>
                <td className='description' contentEditable="true">{row.itemDescription}</td>
                <td className='quantity' contentEditable="true" onChange={updateTableRows}>{row.quantity}</td>
                <td contentEditable="true" onChange={updateTableRows}>{row.unitPrice}</td>
                <td><div className='totalCell' ><span>{"₹ "}{row.lineTotal}</span>
                  <span className='remove' onClick={()=>deleteTableRows(i)}>X</span></div></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="addNewItem">
            <span onClick={handleAddRow}>+ Add Line Item</span>
          </div>
        </>
      );
    }
    
