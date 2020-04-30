import React from 'react'

class MyThing extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            nameBox: Array(9).fill(props.name),
        }
    }
    
    addDots(index){
        const nameBox = this.state.nameBox.slice();
        nameBox[index] = nameBox[index] + '.';
        this.setState({nameBox});
    }

    render(){
        return (
            <ul>
                {
                    this.state.nameBox.map((item, index) => {
                        return (<li key={index} onClick={() => this.addDots(index)}>{item}</li>)
                    })
                }
            </ul>
        );
    }
}

export default MyThing;