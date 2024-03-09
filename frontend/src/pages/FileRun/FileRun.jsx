import React, { useState, useEffect } from 'react' 
import "./FileRun.css"
import { useLocation, useNavigate } from 'react-router-dom';

function FileRunPage() { 

    const [numBoxes, setNumBoxes] = useState(0);
    const [boxVal, setBoxVal] = useState([]); 

    const location = useLocation(); 
    const data = location.state; 
    const { argNum, filename } = data || { };

    useEffect(() => { 
        setNumBoxes(argNum-1);
        setBoxVal(new Array(argNum-1).fill(''));
    }, []); 

    const handleSubmit = async (e) => {  
        e.preventDefault(); 

        // make a new route 
        const url = "http://localhost:5000/run";

        const message = { method: "POST", 
                          body: JSON.stringify({filename, inputData: boxVal.join("\n")}) };
        
        console.log(message); 

        const resp = await fetch(url, message);

        const data = await resp.json(); 

    }

    const handleTextBoxChange = (index, value) => {
        const newTextBoxValues = [...boxVal];
        newTextBoxValues[index] = value;
        setBoxVal(newTextBoxValues);
      };

    return (
        <>
            <div className="file-run-container"> 
                <form onSubmit={handleSubmit}>  
                {boxVal.map((value, index) => (
                    <input
                        key={index}
                        type="text"
                        name={`Input ${index}`}
                        value={value}
                        onChange={(e) => handleTextBoxChange(index, e.target.value)}
                    />
                ))}
                <button type="submit"></button>
                </form> 
            </div> 
        </>
    );
}

export default FileRunPage
