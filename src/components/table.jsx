import React, { useState } from 'react';

function Table() {
  const [currentID, setCurrID] = useState(2);
  const [data, setData] = useState([
    { uid: 1, itemDescription: 'Item', quantity: 2, unitPrice: 100, lineTotal:200}
  ]);

  const addRow = () => {
   
   
    setCurrID(currentID+1);
    
    setData((prevVal)=>{
        return [...prevVal, { uid: currentID, itemDescription: 'Item', quantity: 1, unitPrice: 100, lineTotal:100}]
    })
    // setTimeout(()=>{
    //   console.log(currID);
    //   console.log(data);
    // },2000)
    
   
  };

  console.log(data);

  const deleteRow = (e, rowID) => {
    setData(data.filter((row) => row.uid != rowID));
  };

  const handleChange = (e, id) => {
    
    const fieldName = e.target.name;
    const value = e.target.value
    setData(
      data.map((row) => {
        if (row.uid == id) {
          
          return { ...row, [fieldName]: value };
        }
        return row;
      })
    );
  };

  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Item</th>
          <th>Quantity</th>
          <th>Unit Price</th>
          <th>Line total</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={row.uid}>
            <td>{index+1}</td>
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
            <td>
            <input
                type="number"
                name="lineTotal"
                value={row.lineTotal}
                onChange={(e) => handleChange(e, row.uid)}
             
              />
            </td>
            <td>
              <button uid={row.uid} onClick={(e) => deleteRow(e, row.uid)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
            <button onClick={()=>addRow()}>Add Row</button>
        </tr>
      </tfoot>
    </table>
  );
}

export default Table;
