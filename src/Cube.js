import React from 'react'

function Face(props)
{
    return (
            <div className='cube-face'>
                <h2>{props.faceInfo.name}</h2>
                <div className='cube-row'>
                    <div className='cube-square' style={{backgroundColor: props.faceInfo.data[0][0].colour}}/>
                    <div className='cube-square' style={{backgroundColor: props.faceInfo.data[0][1].colour}}/>
                    <div className='cube-square' style={{backgroundColor: props.faceInfo.data[0][2].colour}}/>
                </div>
                <div className='cube-row'>
                    <div className='cube-square' style={{backgroundColor: props.faceInfo.data[1][1].colour}}/>
                    <div className='cube-square' style={{backgroundColor: props.faceInfo.data[1][2].colour}}/>
                    <div className='cube-square' style={{backgroundColor: props.faceInfo.data[1][0].colour}}/>
                </div>
                <div className='cube-row'>
                    <div className='cube-square' style={{backgroundColor: props.faceInfo.data[2][0].colour}}/>
                    <div className='cube-square' style={{backgroundColor: props.faceInfo.data[2][1].colour}}/>
                    <div className='cube-square' style={{backgroundColor: props.faceInfo.data[2][2].colour}}/>
                </div>
                <div className='cube-buttons'>
                    <button onClick={props.rotateLeft}>Rotate Anticlockwise</button>
                    <button onClick={props.rotateRight}>Rotate Clockwise</button>
                </div>
            </div>
    );
}

class Cube extends React.Component
{
    constructor(props){
        super(props);
        const faces = [
            {name: 'Front', data: this.makeFace('red')}, //0
            {name: 'Top', data: this.makeFace('yellow')}, //1
            {name: 'Bottom', data: this.makeFace('white')}, //2
            {name: 'Right', data: this.makeFace('green')}, //3
            {name: 'Left', data: this.makeFace('blue')}, //4
            {name: 'Back', data: this.makeFace('orange')} //5
        ];
        // Bind faces
        //Front
        //Top Row
        faces[0].data[0][0].refA = {face: 4, row: 2, col: 2};
        faces[0].data[0][0].refB = {face: 1, row: 2, col: 0};
        faces[0].data[0][1].refA = {face: 1, row: 2, col: 1};
        faces[0].data[0][2].refA = {face: 1, row: 2, col: 2};
        faces[0].data[0][2].refB = {face: 3, row: 2, col: 0};
        //Middle Row
        faces[0].data[1][0].refA = {face: 4, row: 2, col: 1};
        faces[0].data[1][2].refA = {face: 3, row: 2, col: 1};
        //Bottom Row
        faces[0].data[2][0].refA = {face: 2, row: 2, col: 2};
        faces[0].data[2][0].refB = {face: 4, row: 2, col: 0};
        faces[0].data[2][1].refA = {face: 2, row: 2, col: 1};
        faces[0].data[2][2].refA = {face: 3, row: 2, col: 2};
        faces[0].data[2][2].refB = {face: 2, row: 2, col: 0};
        //Top
        //Top Row - left's E, back's N, and Right's W
        faces[1].data[0][0].refA = {face: 4, row: 0, col: 2};
        faces[1].data[0][0].refB = {face: 5, row: 0, col: 2};
        faces[1].data[0][1].refA = {face: 5, row: 0, col: 1};
        faces[1].data[0][2].refA = {face: 5, row: 0, col: 0};
        faces[1].data[0][2].refB = {face: 3, row: 2, col: 0};
        //Middle Row
        faces[1].data[1][0].refA = {face: 4, row: 1, col: 2};
        faces[1].data[1][2].refA = {face: 3, row: 1, col: 0};
        //Bottom Row
        faces[1].data[2][0].refA = {face: 0, row: 0, col: 0};
        faces[1].data[2][0].refB = {face: 4, row: 2, col: 2};
        faces[1].data[2][1].refA = {face: 0, row: 0, col: 1};
        faces[1].data[2][2].refA = {face: 3, row: 2, col: 0};
        faces[1].data[2][2].refB = {face: 0, row: 0, col: 2};

        this.state = {
            faces : faces 
        };
    }

    makeFace(colour){
        return [
                [{colour}, {colour}, {colour}],
                [{colour}, {colour}, {colour}],
                [{colour}, {colour}, {colour}]
        ]
    }

    cloneStateFaces(){
        const newFaces = this.state.faces.slice();
        this.state.faces.forEach((item, index)=>{
            newFaces[index]= {
                name: item.name,
                data: item.data.slice(),
            };
            item.data.forEach((row, rowIndex) => {
                newFaces[index].data[rowIndex] = row.slice();
            });
        });
        return newFaces;
    }

    rotateRight(faceId){
        const newFaces = this.cloneStateFaces();
        const ourFace = newFaces[faceId];
     
        this.pushCell(newFaces, ourFace.data[0][0], ourFace.data[0][2]);
        this.pushCell(newFaces, ourFace.data[0][1], ourFace.data[1][2]);
        this.pushCell(newFaces, ourFace.data[0][2], ourFace.data[2][2]);

        this.pushCell(newFaces, ourFace.data[1][0], ourFace.data[0][1]);
        this.pushCell(newFaces, ourFace.data[1][2], ourFace.data[2][1]);

        this.pushCell(newFaces, ourFace.data[2][0], ourFace.data[0][0]);
        this.pushCell(newFaces, ourFace.data[2][1], ourFace.data[1][0]);
        this.pushCell(newFaces, ourFace.data[2][2], ourFace.data[2][0]);
        this.setState({faces: newFaces});
    }

    pushCell(newFaces, source, target){
        const sourceRefA = source.refA;
        const sourceRefB = source.refB;
        const targetRefA = target.refA;
        const targetRefB = target.refB;
        if (targetRefA.row === 1 && targetRefA.col === 2) {
            debugger;
        }
        const sourceCellA = this.state.faces[sourceRefA.face].data[sourceRefA.row][sourceRefA.col];
        newFaces[targetRefA.face].data[targetRefA.row][targetRefA.col].colour = sourceCellA.colour;
        if(sourceRefB) {
            const sourceCellB = this.state.faces[sourceRefB.face].data[sourceRefB.row][sourceRefB.col];
            newFaces[targetRefB.face].data[targetRefB.row][targetRefB.col].colour = sourceCellB.colour;
        }
    }

    render(){
        return (
            <div className='cube'>
                { this.state.faces.map((face, id) => 
                    {
                        return (
                            <div key={id}>
                                <Face faceInfo={face} rotateRight={() => this.rotateRight(id) } rotateLeft={() => alert('Anticlock') }/>
                            </div>
                        )
                    }) 
                }
            </div>
        );
    }
}

export default Cube;