import './App.css';
import React from "react";
import findResult from './project11'

const range = (a, b) => Array(b - a).fill().map((e, i) => i + a);
const values =[];

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileName: '',
            fileContent: '',
            userInput: 0,
            grid:[],
            gridSize: 0,
            frameSize: 2,
            result: '',
            resultValue:''

        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }


handleSubmit() {
        if(this.state.userInput > 0){
        this.setState({
            gridSize: Number(this.state.userInput),
            grid: range(0,this.state.userInput*this.state.userInput).map(emptyIndex => emptyIndex = "")             

        });
        }else{
            alert("Please Enter above 2")
        }

}
 handleChange(e) {
        this.setState({
            userInput: e.target.value
        });

    }
    changeFrame = (newValue) => {
        this.setState({
            frameSize: newValue
        })
    }
    
    onFindResult = (newValue) => {
        console.log(newValue);
        const sum = newValue.reduce((a,c)=>Number(a)+Number(c));
        this.setState({
            result: newValue,
            resultValue: sum
        })
    }   

   handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        let fileInputs=""
        reader.readAsText(file);
        reader.onload =() => {
            fileInputs = reader.result.split(/\s+/g);
            this.setState({
                fileName:file.name,
                fileContent: reader.result.split(/\s+/g),
                gridSize:Math.sqrt(fileInputs.length)
            })

         reader.onerror = () => {
            console.log('file error',reader.error);
         }
        }
   }

    updateGrid = (index,e) => {
       
       this.state.grid[index]=e.target.value
      
       this.setState({
           grid: this.state.grid
       })
    }

    render() {

        if(this.state.fileContent !== ""){
           this.state.grid=this.state.fileContent;
        }


        return ( 
    
          <div className = "App">
            <h1> Data Traversal </h1> <div>
            <div>
            <input type="file" onChange={this.handleFileChange} 
             />
            </div>
            <br />
            <label> Select Grid: </label> 
            <input type = "number" min="0"
            onChange = {
                this.handleChange
            }
            value = {
                this.state.userInput
            }
            /> 
            <br />
            </div> <br />
            <button onClick = {
                this.handleSubmit
            }> Submit </button> 
            <br />
             <br />
        <div>
        <Grid grid={this.state.grid} size={this.state.gridSize} OnGridUpdate={this.updateGrid}
        file={this.state.fileContent} />
        </div>
        <br />
        <div>
        <FrameAndCalc values={this.state.grid} size={this.state.gridSize} 
        frameSize={this.state.frameSize} result ={this.state.result}
        resultValue={this.state.resultValue} 
        onChange={this.changeFrame} onResult = {this.onFindResult} />
        </div>
      </div>
        );
    }
}



function Grid({grid,size,file,OnGridUpdate}) {

    const assignCellValue = (index, e)=> {
        OnGridUpdate(index,e);
        values[index] = Number(e.target.value);
    };

    return (
        <div className="container" 
        style={{gridTemplateColumns:`repeat(${size},1fr`}}
        >
        {grid.map((index, i) => {
            return (
                <div className="item" key={i}>
                    <input id={i} type="text" value={index} 
                    onChange={(e)=> assignCellValue(i, e)} className="gridVal"/>
                
                </div>
            );
        })}
        </div>
    )
}



function FrameAndCalc(props) {
    
    function onClick(){
           let output = findResult(props.values,props.size,props.frameSize);
            props.onResult(output); 

    }

    function frameChange(e) {
        
        props.onChange(e.target.value);

    }
    return (
            <div>
            <label>Select Frame Size:</label>
            <br />
            <input type="number" min="1"
            onChange={frameChange} /> 
            <br />
            <br />
            <button onClick={onClick}> Find </button>
            <br />
            <br />
            <div>
            <div> Best Frame : {props.result.toString()}
            </div>
            <br />   
            <div> 
            FrameValue : {props.resultValue}
            </div>
            </div>
            </div>
        )

}





export default App;



// const findResult = (inputArray,gridSize,frameSize) => {
//     let bestFrame;
//     let prevSumOfFrame=0;

//     matrixTraversal(inputArray,gridSize,frameSize,(frame) => {

//         let sumOfFrame = frame.reduce((acc,cur)=>(acc+cur));
//         if(prevSumOfFrame < sumOfFrame) {
//             bestFrame = frame;
//             prevSumOfFrame = sumOfFrame;
//         }
//     });
//     return bestFrame;
// }










// function Grid({grid}) {
//         return (
//             <div className="container">
//             <div className="items">
//             {grid.map((row, rowIdx) => row.map((value, colIdx) => (
//                 <Cell value={value} key={`${colIdx}-${rowIdx}`} /> 
//             ))
//             )}
//             </div>
//             </div>
//             )
// } 

// function Cell({value}){
//       return (
//             <div className="cells">
//              {value}
//             </div>
//        )
// }
// function generateGrid(rows, columns, mapper) {
//   return Array(rows)
//     .fill()
//     .map(() => Array(columns).fill().map(mapper))
// }
