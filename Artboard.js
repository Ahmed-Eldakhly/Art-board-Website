//Constants variables to Select current shape that use in Art Board.
const LINE_SHAPE = 0;
const CIRCLE_SHAPE = 1;
const RECTANGLE_SHAPE = 2;
const FREE_LINE_SHAPE = 3;
const ERASE_SHAPE = 4;
//Default Color and Shape in the beginning.
var CURRENT_SHAPE = LINE_SHAPE;
var CURRENT_COLOR = "#000000"
var STROKE_COLOR = '#000000';
//Mouse state at ant time.
const MOUSE_RELEASED = 0;
const MOUSE_PRESSED = 1;
var MOUSE_STATE = MOUSE_RELEASED;
//Position of the start and the end point for any shape
var START_POINT_X = 0;
var START_POINT_Y = 0;
var END_POINT_X = 0;
var END_POINT_Y = 0;
//get all elements that will be used from HTML file
var circleButton = document.getElementById("CircleButton");
var rectButton = document.getElementById("RectButton");
var lineButton = document.getElementById("LineButton");
var FreeLineButton = document.getElementById("FreeLineButton");
var EraseButton = document.getElementById("EraseButton");
var DrawingArea = document.getElementById("canvasDrawingArea");
var DrawingAreaStatic = document.getElementById("canvasDrawingAreaStatic");
var Parent = document.getElementById("DrawArea");
var strokeColor = document.getElementById("StrokeStyle");
var fillColor = document.getElementById("FillStyle");
//add event listener to select drawing shapes and colors.
circleButton.addEventListener("click" , function(){
    CURRENT_SHAPE = CIRCLE_SHAPE;
})
rectButton.addEventListener("click" , function(){
    CURRENT_SHAPE = RECTANGLE_SHAPE;
})
lineButton.addEventListener("click" , function(){
    CURRENT_SHAPE = LINE_SHAPE;
})
FreeLineButton.addEventListener("click" , function(){
    CURRENT_SHAPE = FREE_LINE_SHAPE;
})
EraseButton.addEventListener("click" , function(){
    CURRENT_SHAPE = ERASE_SHAPE;
})
strokeColor.addEventListener("input", function(event){
    STROKE_COLOR = event.target.value;
});
fillColor.addEventListener("input", function(event){
    CURRENT_COLOR = event.target.value;
});
//event listener on the drawing area to draw the current shape.
Parent.addEventListener("mousedown" , function(event){
    //Store the start point of drawing.
    START_POINT_X = event.clientX - 500;
    START_POINT_Y = event.clientY - 250;
    MOUSE_STATE = MOUSE_PRESSED;
});
//event listener on the drawing area to draw the current shape in fixed canvas when the user release the mouse.
DrawingArea.addEventListener("mouseup", function(){
    MOUSE_STATE = MOUSE_RELEASED;
    cContext = DrawingAreaStatic.getContext("2d");
    //check which Shape is used to draw it in the fixed Canvas (Line - Circle - Rectangle).
    switch(CURRENT_SHAPE)
    {
        case LINE_SHAPE:
            cContext.beginPath();
            cContext.lineWidth = 5;  
            cContext.beginPath();
            cContext.moveTo(START_POINT_X, START_POINT_Y);
            cContext.lineTo(END_POINT_X, END_POINT_Y);
            cContext.strokeStyle = CURRENT_COLOR;  
            cContext.stroke();
            break;
        case CIRCLE_SHAPE:
            cContext.beginPath();
            cContext.arc(START_POINT_X, START_POINT_Y, Math.sqrt(Math.pow(END_POINT_X - START_POINT_X, 2) + Math.pow(END_POINT_Y - START_POINT_Y, 2)), 0, 2 * Math.PI);
            cContext.fillStyle = CURRENT_COLOR;
            cContext.strokeStyle = STROKE_COLOR;
            cContext.fill();
            cContext.stroke();
            break;
        case RECTANGLE_SHAPE:
            cContext.strokeStyle = STROKE_COLOR;
            cContext.strokeRect(START_POINT_X, START_POINT_Y, END_POINT_X - START_POINT_X, END_POINT_Y - START_POINT_Y);
            cContext.fillStyle = CURRENT_COLOR;
            cContext.fillRect(START_POINT_X, START_POINT_Y, END_POINT_X - START_POINT_X, END_POINT_Y - START_POINT_Y);
            break;
        case FREE_LINE_SHAPE:
            break;
        case ERASE_SHAPE:
            break;
    }
})
//event listener on the drawing area to update the current shape in volatile canvas when the user move the mouse while pressing.
Parent.addEventListener("mousemove", function(event){
    var cContext = DrawingArea.getContext("2d");
    cContext.clearRect(0, 0, DrawingArea.width, DrawingArea.height);
    //get the current point of drawing.
    END_POINT_X = event.clientX - 500; 
    END_POINT_Y = event.clientY - 250;
    //check which Shape is used to draw it in the volatile Canvas (Line - Circle - Rectangle) or in the fixed Canvas (Free style line - Erase).
    if(MOUSE_STATE == MOUSE_PRESSED)
    {
        switch(CURRENT_SHAPE)
        {
            case LINE_SHAPE:
                cContext.beginPath();
                cContext.lineWidth = 5;  
                cContext.beginPath();
                cContext.moveTo(START_POINT_X, START_POINT_Y);
                cContext.lineTo(END_POINT_X, END_POINT_Y);
                cContext.strokeStyle = CURRENT_COLOR;  
                cContext.stroke();

                break;
            case CIRCLE_SHAPE:
                cContext.beginPath();
                cContext.arc(START_POINT_X, START_POINT_Y, Math.sqrt(Math.pow(END_POINT_X - START_POINT_X, 2) + Math.pow(END_POINT_Y - START_POINT_Y, 2)), 0, 2 * Math.PI);
                cContext.fillStyle = CURRENT_COLOR;
                cContext.strokeStyle = STROKE_COLOR;
                cContext.fill();
                cContext.stroke();
                break;
            case RECTANGLE_SHAPE:
                cContext.strokeStyle = STROKE_COLOR;
                cContext.strokeRect(START_POINT_X, START_POINT_Y, END_POINT_X - START_POINT_X, END_POINT_Y - START_POINT_Y);
                cContext.fillStyle = CURRENT_COLOR;
                cContext.fillRect(START_POINT_X, START_POINT_Y, END_POINT_X - START_POINT_X, END_POINT_Y - START_POINT_Y);
                break;
            case FREE_LINE_SHAPE:
                cContext = DrawingAreaStatic.getContext("2d");
                cContext.beginPath();
                cContext.lineWidth = 5;  
                cContext.beginPath();
                cContext.moveTo(START_POINT_X, START_POINT_Y);
                cContext.lineTo(END_POINT_X, END_POINT_Y);
                cContext.strokeStyle = CURRENT_COLOR;  
                cContext.stroke();
                START_POINT_X = END_POINT_X;
                START_POINT_Y = END_POINT_Y;
                break;
            case ERASE_SHAPE:
                cContext = DrawingAreaStatic.getContext("2d");
                cContext.beginPath();
                cContext.lineWidth = 5;  
                cContext.beginPath();
                cContext.moveTo(START_POINT_X, START_POINT_Y);
                cContext.lineTo(END_POINT_X, END_POINT_Y);
                cContext.strokeStyle = "#ffffff";  
                cContext.stroke();
                START_POINT_X = END_POINT_X;
                START_POINT_Y = END_POINT_Y;
                break;
        }
    }
})
//draw free style drawing button
var canvasFreeLine = document.getElementById("canvasFreeLine");
var cContext = canvasFreeLine.getContext("2d");
cContext.beginPath();
cContext.lineWidth = 5;  
cContext.beginPath();
cContext.moveTo(10, 10);
cContext.lineTo(30, 70);
cContext.strokeStyle = '#f808ff';  
cContext.stroke();

cContext.beginPath();
cContext.moveTo(30, 70);  
cContext.quadraticCurveTo(30, 90, 60, 30);
cContext.strokeStyle = '#f808ff';  
cContext.stroke();  

cContext.beginPath();
cContext.moveTo(60,30);    
cContext.bezierCurveTo(60, 10, 90, 10, 90, 60);
cContext.strokeStyle = '#f808ff';    
cContext.stroke();
cContext.closePath(); 
//-----------------------------------------------------------------------
//draw Line button
var canvasLine = document.getElementById("canvasLine");
var cContext = canvasLine.getContext("2d");
cContext.beginPath();
cContext.moveTo(10, 90);
cContext.lineTo(90, 10);
cContext.lineWidth = 5;
cContext.strokeStyle = '#ff0000';
cContext.stroke();
//-----------------------------------------------------------------------
//draw Rectangle button
var canvasRect = document.getElementById("canvasRect");
var cContext = canvasRect.getContext("2d");
cContext.strokeStyle = "#000000";
cContext.strokeRect(0, 25, 100, 50);
cContext.fillStyle = "#00ff88";
cContext.fillRect(0, 25, 100, 50);
//-----------------------------------------------------------------------
//draw Circle button
var canvasCircle = document.getElementById("canvasCircle");
var cContext = canvasCircle.getContext("2d");
cContext.beginPath();
cContext.arc(50, 50, 40, 0, 2 * Math.PI);
cContext.fillStyle = "#0022ff";
cContext.strokeStyle = "#000000";
cContext.fill();
cContext.stroke();
//-----------------------------------------------------------------------
//draw Erase button
var canvasErase = document.getElementById("canvasErase");
var cContext = canvasErase.getContext("2d");
cContext.beginPath();
cContext.moveTo(70, 10);
cContext.lineTo(85, 25);
cContext.lineWidth = 3;
cContext.strokeStyle = '#ffa500';
cContext.stroke();

cContext.beginPath();
cContext.moveTo(85, 25);
cContext.lineTo(55, 55);
cContext.lineWidth = 3;
cContext.strokeStyle = '#ffa500';
cContext.stroke();
 
cContext.beginPath();
cContext.moveTo(55, 55);
cContext.lineTo(50, 60);
cContext.lineWidth = 3;
cContext.strokeStyle = '#ffa500';
cContext.stroke();

cContext.beginPath();
cContext.moveTo(50, 60);
cContext.lineTo(45, 60);
cContext.lineWidth = 3;
cContext.strokeStyle = '#ffa500';
cContext.stroke();

cContext.beginPath();
cContext.moveTo(45, 60);
cContext.lineTo(32, 48);
cContext.lineWidth = 3;
cContext.strokeStyle = '#ffa500';
cContext.stroke();

cContext.beginPath();
cContext.moveTo(70, 10);
cContext.lineTo(32, 48);
cContext.lineWidth = 3;
cContext.strokeStyle = '#ffa500';
cContext.stroke();

cContext.beginPath();
cContext.moveTo(60, 50);
cContext.lineTo(42, 35);
cContext.lineWidth = 3;
cContext.strokeStyle = '#ffa500';
cContext.stroke();

cContext.beginPath();
cContext.moveTo(40, 60);
cContext.lineTo(20, 60);
cContext.lineWidth = 3;
cContext.strokeStyle = '#ffa500';
cContext.stroke();

cContext.beginPath();
cContext.moveTo(50, 65);
cContext.lineTo(25, 65);
cContext.lineWidth = 3;
cContext.strokeStyle = '#ffa500';
cContext.stroke();

cContext.beginPath();
cContext.moveTo(40, 70);
cContext.lineTo(20, 70);
cContext.lineWidth = 3;
cContext.strokeStyle = '#ffa500';
cContext.stroke();





 
