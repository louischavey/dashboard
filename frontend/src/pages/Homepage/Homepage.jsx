import React, { useState } from 'react'  
import { useLocation, useNavigate } from 'react-router-dom';
import "./Homepage.css"


function TextBox() { 
    return (
        <>
            <div style={{backgroundColor: "black"}}> 
            </div> 
        </>
    );
}


function Homepage() { 

    let navigate = useNavigate();
    const textBoxes = [];
    const [file, setFile] = useState(null); 
    const [filename, setFilename] = useState(""); 

    const [numBoxes, setNumBoxes] = useState(0);
    const [boxVal, setBoxVal] = useState([]); 


    const handleFile = (e) => { 
        const newFile = e.target.files;
        setFile(newFile[0]);
        console.log("changed file");
        console.log(newFile);
    }

    const handleSetFileName = (e) => { 
        setFilename(e.target.value); 
        // console.log(filename); -- NEW VERSION
    }

    const url = "http://localhost:5000/upload";

    const handleUpload = async (e) => { 
        e.preventDefault();

        if (!file) { 
            console.log("wtf are u doing, no file lol"); 
            return ( 
                <>
                </> 
            ); 
        }

        const formData = new FormData(); 
        formData.append("file", file)

        const resp = await fetch(url, 
            {
                method: "POST", 
                headers: {
                    'Accept': 'application/json',
                }, 
                body: formData,
            }

        ); 

    }


    const handleRun = async (e) => { 
        e.preventDefault(); 

        const url = "http://localhost:5000/get_inputs";
        
        if (!filename) {  
            console.log("No filename entered");
            return ( 
                <>
                </> 
            )
        };

        const resp = await fetch(url, 
            { 
                method: "POST", 
                body: JSON.stringify({filename})
            })
        const body = await resp.json();

        console.log(body.argNum);

        setNumBoxes(body.argNum);
        setBoxVal(new Array(body.argNum).fill(''));

        const stateToPass = { 
            argNum: body.argNum, 
            filename: filename,
        }

        navigate('/runFile', { state: stateToPass}); 
    }

    // NEW VERSION
    const handleTextareaKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleRun(e);
        }
    }

    const handleTextBoxChange = (index, value) => {
        const newTextBoxValues = [...boxVal];
        newTextBoxValues[index] = value;
        setBoxVal(newTextBoxValues);
      };

    // NEW VERSION
    return (
        <>
            <h1>script dashboard</h1>
            <form onSubmit={handleUpload}>
                <input type="file" name="file" onChange={handleFile} />
                <button type="submit"> Upload </button>
            </form>
            <form>
                <textarea
                    type="text"
                    name="script_filename"
                    value={filename}
                    onChange={handleSetFileName}
                    onKeyPress={handleTextareaKeyPress} // Call handleRun when Enter is pressed
                />
                <button type="button" onClick={handleRun}> Run Script </button>
            </form>

        </>
    );
}

    // OLD VERSION
//     return(
//         <>
//             <h1>script dashboard</h1>
//             <form onSubmit={handleUpload}>
//                 <input type="file" name="file" onChange={handleFile}/>
//                 <button type="submit"> Upload </button> 
//             </form>
//             <form onChange={handleRun}>
//                 <textarea type="text" name="script_filename" value={filename} onChange={handleSetFileName}/>
//                 <button type="submit"> Run Script </button> 
//             </form>
//       </> 
//     ); 
// }


export default Homepage 
