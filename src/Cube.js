import React from 'react'

function Face(props)
{
    return (
            <div className={'cube__face cube__face--' + props.faceInfo.name}>
                <div className='cube-row'>
                    <div className='cube-square' style={{backgroundColor: props.faceInfo.data[0][0].colour}}/>
                    <div className='cube-square' style={{backgroundColor: props.faceInfo.data[0][1].colour}}/>
                    <div className='cube-square' style={{backgroundColor: props.faceInfo.data[0][2].colour}}/>
                </div>
                <div className='cube-row'>
                    <div className='cube-square' style={{backgroundColor: props.faceInfo.data[1][0].colour}}/>
                    <div className='cube-square' style={{backgroundColor: props.faceInfo.data[1][1].colour}}/>
                    <div className='cube-square' style={{backgroundColor: props.faceInfo.data[1][2].colour}}/>
                </div>
                <div className='cube-row'>
                    <div className='cube-square' style={{backgroundColor: props.faceInfo.data[2][0].colour}}/>
                    <div className='cube-square' style={{backgroundColor: props.faceInfo.data[2][1].colour}}/>
                    <div className='cube-square' style={{backgroundColor: props.faceInfo.data[2][2].colour}}/>
                </div>
            </div>
    );
}

class Cube extends React.Component
{
    RED = 0;
    YELLOW = 1;
    WHITE = 2;
    GREEN = 3;
    BLUE = 4;
    ORANGE = 5;
    
    constructor(props){
        super(props);
        const faces = [
            {name: 'front', data: this.makeFace('red')}, //0
            {name: 'top', data: this.makeFace('yellow')}, //1
            {name: 'bottom', data: this.makeFace('lightgray')}, //2
            {name: 'right', data: this.makeFace('green')}, //3
            {name: 'left', data: this.makeFace('blue')}, //4
            {name: 'back', data: this.makeFace('orange')} //5
        ];

        const row0 = [{row: 0, col: 2}, {row: 0, col: 1}, {row: 0, col: 0}];
        const row2 = [{row: 2, col: 0}, {row: 2, col: 1}, {row: 2, col: 2}];
        const col0 = [{row: 0, col: 0}, {row: 1, col: 0}, {row: 2, col: 0}];
        const col2 = [{row: 2, col: 2}, {row: 1, col: 2}, {row: 0, col: 2}];

        // Bind faces
        //Front (Red) : Top = Yellow, Left = Blue, Right = Green, Bottom = White
        //Top Row
        let top = {face: this.YELLOW, cells: row2};
        let left = {face: this.BLUE, cells: row2};
        let right = {face: this.GREEN, cells: row2};
        let bottom = {face: this.WHITE, cells: row2};
        this.fillFaceAssociations(faces[this.RED], top, left, bottom, right);
        
        //Top (Yellow) : Top = Orange, Left = Blue, Right = Green, Bottom = Red
        top = {face: this.ORANGE, cells: row2};
        left = {face: this.BLUE, cells: col2};
        right = {face: this.GREEN, cells: col0};
        bottom = {face: this.RED, cells: row0};
        this.fillFaceAssociations(faces[this.YELLOW], top, left, bottom, right);

        //Bottom (White) : Top = Orange, Left = Green, Right = Blue, Bottom = Red
        top = {face: this.ORANGE, cells: row0};
        left = {face: this.GREEN, cells: col2};
        right = {face: this.BLUE, cells: col0};
        bottom = {face: this.RED, cells: row2};
        this.fillFaceAssociations(faces[this.WHITE], top, left, bottom, right);

        //Right (Green) : Top = Orange, Left = Yellow, Right = White, Bottom = Red
        top = {face: this.ORANGE, cells: col2};
        left = {face: this.YELLOW, cells: col2};
        right = {face: this.WHITE, cells: col0};
        bottom = {face: this.RED, cells: col2};
        this.fillFaceAssociations(faces[this.GREEN], top, left, bottom, right);

        //Left (Blue) : Top = Orange, Left = White, Right = Yellow, Bottom = Red
        top = {face: this.ORANGE, cells: col0};
        left = {face: this.WHITE, cells: col2};
        right = {face: this.YELLOW, cells: col0};
        bottom = {face: this.RED, cells: col0};
        this.fillFaceAssociations(faces[this.BLUE], top, left, bottom, right);

        //Back (Orange) : Top = White, Left = Blue, Right = Green, Bottom = Yellow
        top = {face: this.WHITE, cells: row0};
        left = {face: this.BLUE, cells: row0};
        right = {face: this.GREEN, cells: row0};
        bottom = {face: this.YELLOW, cells: row0};
        this.fillFaceAssociations(faces[this.ORANGE], top, left, bottom, right);

        this.state = {
            faces : faces,
            showClass : 'show-front',
            currentFaceId: 0
        };
    }

    makeFace(colour){
        return [
                [{colour}, {colour}, {colour}],
                [{colour}, {colour}, {colour}],
                [{colour}, {colour}, {colour}]
        ]
    }

    fillFaceAssociations(face, top, left, bottom, right){
        face.data[0][0].refA = {face: left.face, ...left.cells[2]};
        face.data[0][0].refB = {face: top.face, ...top.cells[0]};
        face.data[0][1].refA = {face: top.face, ...top.cells[1]};
        face.data[0][2].refA = {face: top.face, ...top.cells[2]};
        face.data[0][2].refB = {face: right.face, ...right.cells[0]};
        //Middle Row
        face.data[1][0].refA = {face: left.face, ...left.cells[1]};
        face.data[1][2].refA = {face: right.face, ...right.cells[1]};
        //Bottom Row
        face.data[2][0].refA = {face: bottom.face, ...bottom.cells[2]};
        face.data[2][0].refB = {face: left.face, ...left.cells[0]};
        face.data[2][1].refA = {face: bottom.face, ...bottom.cells[1]};
        face.data[2][2].refA = {face: right.face, ...right.cells[2]};
        face.data[2][2].refB = {face: bottom.face, ...bottom.cells[0]};
    }

    cloneStateFaces(){
        const newFaces = [
            {name: 'front', data: this.makeFace('red')}, //0
            {name: 'top', data: this.makeFace('yellow')}, //1
            {name: 'bottom', data: this.makeFace('lightgray')}, //2
            {name: 'right', data: this.makeFace('green')}, //3
            {name: 'left', data: this.makeFace('blue')}, //4
            {name: 'back', data: this.makeFace('orange')} //5
        ];
        this.state.faces.forEach((item, index)=>{
            item.data.forEach((row, rowIndex) => {
                row.forEach((col, colIndex) => {
                    newFaces[index].data[rowIndex][colIndex].colour = col.colour;
                    newFaces[index].data[rowIndex][colIndex].refA = {...col.refA};
                    newFaces[index].data[rowIndex][colIndex].refB = col.refB ? {...col.refB} : null;
                })
            });
        });
        return newFaces;
    }

    rotateRight(){
        const faceId = this.state.currentFaceId;
        const newFaces = this.cloneStateFaces();
        const existingFace = this.state.faces[faceId];
        const newFace = newFaces[faceId];
     
        this.pushCell(newFaces, existingFace.data[0][0], newFace.data[0][2]);
        this.pushCell(newFaces, existingFace.data[0][1], newFace.data[1][2]);
        this.pushCell(newFaces, existingFace.data[0][2], newFace.data[2][2]);

        this.pushCell(newFaces, existingFace.data[1][0], newFace.data[0][1]);
        this.pushCell(newFaces, existingFace.data[1][2], newFace.data[2][1]);

        this.pushCell(newFaces, existingFace.data[2][0], newFace.data[0][0]);
        this.pushCell(newFaces, existingFace.data[2][1], newFace.data[1][0]);
        this.pushCell(newFaces, existingFace.data[2][2], newFace.data[2][0]);
        this.setState({faces: newFaces, showClass: this.state.showClass});
    }

    rotateLeft(){
        const faceId = this.state.currentFaceId;
        const newFaces = this.cloneStateFaces();
        const existingFace = this.state.faces[faceId];
        const newFace = newFaces[faceId];
     
        this.pushCell(newFaces, existingFace.data[0][0], newFace.data[2][0]);
        this.pushCell(newFaces, existingFace.data[0][1], newFace.data[1][0]);
        this.pushCell(newFaces, existingFace.data[0][2], newFace.data[0][0]);

        this.pushCell(newFaces, existingFace.data[1][0], newFace.data[2][1]);
        this.pushCell(newFaces, existingFace.data[1][2], newFace.data[0][1]);

        this.pushCell(newFaces, existingFace.data[2][0], newFace.data[2][2]);
        this.pushCell(newFaces, existingFace.data[2][1], newFace.data[1][2]);
        this.pushCell(newFaces, existingFace.data[2][2], newFace.data[0][2]);
        this.setState({faces: newFaces, showClass: this.state.showClass, currentFaceId: this.state.currentFaceId});
    }

    pushCell(newFaces, source, target){
        const sourceRefA = source.refA;
        const sourceRefB = source.refB;
        const targetRefA = target.refA;
        const targetRefB = target.refB;
        
        target.colour = source.colour;

        const sourceCellA = this.state.faces[sourceRefA.face].data[sourceRefA.row][sourceRefA.col];
        newFaces[targetRefA.face].data[targetRefA.row][targetRefA.col].colour = sourceCellA.colour;
        if(sourceRefB) {
            const sourceCellB = this.state.faces[sourceRefB.face].data[sourceRefB.row][sourceRefB.col];
            newFaces[targetRefB.face].data[targetRefB.row][targetRefB.col].colour = sourceCellB.colour;
        }
    }

    selectView(faceId){
        const side = this.state.faces[faceId].name;
        const showClass = 'show-' + side;
        this.setState({...this.state, showClass: showClass, currentFaceId: faceId})
    }
  
    render(){
        return (
            <div>
                <div className='scene'>
                    <div className={'cube ' + this.state.showClass}>
                        { this.state.faces.map((face, id) => 
                            {
                                return (
                                    <div key={id}>
                                        <Face faceInfo={face}/>
                                    </div>
                                )
                            }) 
                        }
                    </div>
                    <div className='cube-buttons'>
                    <button className='rotate-button' onClick={()=>this.rotateLeft()}>Rotate Anticlockwise</button>
                    <button className='rotate-button' onClick={()=>this.rotateRight()}>Rotate Clockwise</button>
                </div>
                <div className='view-panel'>
                    <div className='view-panel-header'>View</div> 
                    <button className='view-button' onClick={() => this.selectView(0)}>FRONT</button>
                    <button className='view-button' onClick={() => this.selectView(3)} >RIGHT</button>
                    <button className='view-button' onClick={() => this.selectView(5)} >BACK</button>
                    <button className='view-button' onClick={() => this.selectView(4)} >LEFT</button>
                    <button className='view-button' onClick={() => this.selectView(1)} >TOP</button>
                    <button className='view-button' onClick={() => this.selectView(2)} >BOTTOM</button>
                </div>
                </div>
             
          </div>
        );
    }
}

export default Cube;