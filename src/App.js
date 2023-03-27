import './App.css';
import React from "react";
import findResult from './project11'


const range = (a, b) => Array(b - a).fill().map((e, i) => i + a);

const values =[];


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInput: 0,
            gridSize: 3,
            frameSize: 2,
            result: ''

        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleSubmit() {
        if(this.state.userInput > 0){
        this.setState({
            gridSize: Number(this.state.userInput)
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
        this.setState({
            frameSize: newValue
        })
    }


    render() {
                
         const grid = range(0,this.state.gridSize*this.state.gridSize); 
         
        return ( 
          <div className = "App">
            <h1> Data Traversal </h1> <div>
            use file:
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
        <Grid grid={grid} size={this.state.gridSize} />
        </div>
        <br />
        <div>
        <FrameAndCalc values={values} size={this.state.gridSize} 
        frameSize={this.state.frameSize} result ={this.state.result} 
        onChange={this.changeFrame} onResult = {this.onFindResult} />
        </div>
      </div>
        );
    }
}



function Grid({grid,size}) {



    const assignCellValue = (index, e)=> {
        values[index] = Number(e.target.value);
    };


    return (
        <div className="container" 
        style={{gridTemplateColumns:`repeat(${size},1fr`}}
        >
        {grid.map((index, i) => {
            return (
                <div className="item" key={i}>
                    <input id={index} type="text" onChange={(e)=> assignCellValue(index, e)} className="gridVal"/>
                </div>
            );
        })}
        </div>
    )
}

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



function FrameAndCalc(props) {
    
    function onClick(){
           let output = findResult(props.values,props.size,props.frameSize);
            props.onResult(output);
           console.log(output) 

    }

    function frameChange(e) {
        
        props.onChange(e.target.value);

    }
    console.log(props.result);

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
            <p></p>
            </div>
        )

}





export default App;












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

