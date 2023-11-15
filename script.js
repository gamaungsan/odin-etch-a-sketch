let pen = 0;
let pen_color = document.querySelector('#color').value;

const pencil = document.querySelector('#pencil');
pencil.style.cssText = 'background-color: aqua';

/*Mouse Drag*/
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function setupGrid(size)
{
    const grid_container = document.querySelector('#container');
    for(let i=0;i<size*size;i++)
    {
        const grid = document.createElement('div');
        grid.style.cssText ='height: '+ 500/size + 'px;'+  'width: '+ 500/size + 'px;';
        grid.setAttribute('class', 'grid');
        grid.addEventListener('mouseover', gridListeners);
        grid.addEventListener('mousedown', gridListeners);
        
        grid_container.appendChild(grid);
    }
}

function removeGrid()
{
    const grid_container = document.querySelector('#container');
    grid_container.innerHTML = '';
}

function controlListeners(event)
{
    let target = event.target;

    const pencil = document.querySelector('#pencil');
    const rainbow = document.querySelector('#rainbow');
    const eraser = document.querySelector('#eraser');
    const color = document.querySelector('#color');


    switch(target.id){
        case 'pencil':
            pen = 0;
            pen_color = document.querySelector('#color').value;
            pencil.style.cssText = 'background-color: aqua';
            rainbow.style.cssText = 'background-color: none';
            eraser.style.cssText = 'background-color: none';
            break;
        case 'rainbow':
            pen = 1;
            pencil.style.cssText = 'background-color: none';
            rainbow.style.cssText = 'background-color: aqua';
            eraser.style.cssText = 'background-color: none';
            break;
        case 'eraser':
            pen = 0;
            pen_color = '#FFFFFF';
            pencil.style.cssText = 'background-color: none';
            rainbow.style.cssText = 'background-color: none';
            eraser.style.cssText = 'background-color: aqua';
            break;
        case 'clear':
            removeGrid();
            setupGrid(document.querySelector('#slider').value);
            pen = 0;
            pen_color = "#000000"
            color.value = pen_color;
            pencil.style.cssText = 'background-color: aqua';
            rainbow.style.cssText = 'background-color: none';
            eraser.style.cssText = 'background-color: none';
            break;
    }
}

function colorPicker()
{
    const pencil = document.querySelector('#pencil');
    const rainbow = document.querySelector('#rainbow');
    const eraser = document.querySelector('#eraser');

    pencil.style.cssText = 'background-color: aqua';
    rainbow.style.cssText = 'background-color: none';
    eraser.style.cssText = 'background-color: none';

    pen = 0;
    pen_color = document.querySelector('#color').value;
}

function gridListeners(event){
    /* Mouse Drag */
    if(event.type == 'mouseover' && !mouseDown) return;

    if(pen == 1){
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        pen_color = '#' + randomColor;
    }

    const target = event.target;
    console.log(target);
    target.style.cssText += 'background-color: ' + pen_color + ';';
}

setupGrid(16);
const slider = document.querySelector('#slider');
const sval = document.querySelector('#myRange');

const controls = document.querySelector('#controls');
const color = document.querySelector('#color');

slider.value = 16;
sval.textContent = 16;
slider.addEventListener("change", ()=>{
    sval.textContent = slider.value;
    removeGrid();
    setupGrid(slider.value);
});


controls.addEventListener('click', controlListeners);
color.addEventListener('input', colorPicker);
