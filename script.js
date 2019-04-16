let terkep = [
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [1, 1, 1, 0, 0, 0, 0, 1, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1]
];
let oldxy = [-1,-1];
let szemafor = true;

function switchMap(){
    if(szemafor){
        terkep = [
            [1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
        szemafor = !szemafor;
        startGame();
    }else{
        terkep = [
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
            [1, 1, 1, 0, 0, 0, 0, 1, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 1, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
            [1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1, 0, 0, 0, 1]
        ];
        szemafor = !szemafor;
        startGame();
    }
}

function about() {
	alert("Gamifikált teszt. (C) Bucsánszki Tamás 2019.\nforráskód a GitHubon: https://github.com/bucsi/utveszto");
    for(let line of terkep){
        for(let elem of line){
            console.log(elem)
        }
        console.log("\n\n")
    }
}

function startGame() {
    jatekTer.start();
    feladatTer.start();
    player = new Player(500, 500);
    rajzol();    
}

function updateTer() {
    jatekTer.clear();
    for (let sor of terkep){
        for(let sz of sor){
            if(sz){
                if(playerInRoom(sz)){
                    ii = sz.i;
                    jj = sz.j;
                    if(ii < 9){
                        terkep[ii+1][jj].hidden = false;
                    }
                    if(jj < 9){
                        terkep[ii][jj+1].hidden = false;
                    }
                    if(ii > 0){
                        terkep[ii-1][jj].hidden = false;
                    }
                    if(jj > 0){
                        terkep[ii][jj-1].hidden = false;
                    }
                }
                
               sz.update();
               
            }
        }
    }
    let asw = screenToCanvas(jatekTer.mx, jatekTer.my, jatekTer.canvas);
    if(asw && !oldxy.equals(asw)){
        [xx, yy] = asw;
        if(canvasPointIsVisibleRoom(xx, yy)){
            player.x = xx;
            player.y = yy;
            oldxy = [xx, yy]
        }
    }
    player.update();
    //console.log(convertCoord(jatekTer.mx, jatekTer.my, jatekTer.canvas))
}


function rajzol(){
    for(let i=0; i<10;i++){
        for (let j=0; j<10; j++){
            if(terkep[i][j]){
                let sz = new Szoba(100,100,"saddlebrown",0+j*100,0+i*100, i, j);
                terkep[i][j] = sz;
            }else{
                terkep[i][j] = 0;
            }
        }
    }
    
    terkep[0][0].hidden = false;
    player.x = terkep[0][0].pos.x;
    player.y = terkep[0][0].pos.y;
    
}

function screenToCanvas(px, py, cvs){
//maps window mouse coords to real canvas cords
	let rect = cvs.getBoundingClientRect();
    scaleX = cvs.width / rect.width,
    scaleY = cvs.height / rect.height;
    let x = (px - rect.left)*scaleX;
    let y = (py - rect.top)*scaleY;
    if(x > 0 && x < 1000 && y > 0 && y < 1000){
        return [x, y]
    }else{
        return false;
    }
    
    
}

function playerInRoom(szoba){
    if(player.x > szoba.pos.x-50 && player.x < szoba.pos.x+50 && player.y > szoba.pos.y-50 && player.y < szoba.pos.y+50){
        return true;
    }else{
        return false;
    }
}

function canvasPointIsVisibleRoom(px, py){
    i = Math.ceil(px/100)-1;
    j = Math.ceil(py/100)-1;
    console.log(i + " " + j + " " + terkep[j][i] + " rejtve? " + terkep[i][j].hidden)
    if(terkep[j][i]){
        if(terkep[i][j].hidden){
            return false;
        }else{
            return true;
        }
    }else{
        return false;
    }
}

var jatekTer = {
    canvas : document.createElement("canvas"),
    start : function(){
        this.canvas.width = 1000;
        this.canvas.height = 1000;
        this.context = this.canvas.getContext("2d");
	    this.canvas.setAttribute("id", "game");
        document.getElementById("canvas-game").appendChild(this.canvas);
	    this.interval = setInterval(updateTer, 20);
        window.addEventListener('click', function(e){
            jatekTer.mx = e.pageX;
            jatekTer.my = e.pageY;
            //console.log(convertCoord(jatekTer.mx, jatekTer.my, jatekTer.canvas));
        })
          
    },
    clear : function() {
    	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	   
    }
    
}

var feladatTer = {
    canvas : document.createElement("canvas"),
    start : function(){
        this.canvas.width = 800;
        this.canvas.height = 1000;
        this.context = this.canvas.getContext("2d");
	this.canvas.setAttribute("id", "task");
        document.getElementById("canvas-task").appendChild(this.canvas);
	this.interval = setInterval(updateTer, 20);
        
    },
    clear : function() {
    	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	//console.log("update");
    }
}


function Player(px,py){
    this.x = px-10;
    this.y = py-10;
    ctx = jatekTer.context;
    this.update = function(){
	   ctx.fillStyle = "blue";
	   ctx.fillRect(this.x-10, this.y-10, 20, 20);
    }
}
    
function Szoba(w, h, col, x, y, ii, jj){
    ctx = jatekTer.context;
    this.hidden = true;
    this.i = ii;
    this.j = jj;
    this.pos = {x: x+w/2, y: y+h/2}
    console.log("szoba constructed.");
    


    this.update = function(){ 
	   if(!this.hidden){
            ctx.fillStyle = col;
            ctx.fillRect(x, y, w, h);

            ctx.beginPath();

            ctx.moveTo(x, y+h/3);
            ctx.lineTo(x, y);
            ctx.lineTo(x+w/3, y);

            ctx.moveTo(x+2*w/3, y);
            ctx.lineTo(x+w, y);
            ctx.lineTo(x+w, y+h/3);

            ctx.moveTo(x+w, y+2*h/3);
            ctx.lineTo(x+w, y+h);
            ctx.lineTo(x+2*w/3, y+h);

            ctx.moveTo(x+w/3, y+h);
            ctx.lineTo(x, y+h);
            ctx.lineTo(x, y+2*w/3);

            ctx.lineWidth = 4;
            ctx.strokeStyle = "black";
            ctx.setLineDash([]);
            ctx.stroke();
       }
    }
}


// array egyenlőság vizsgáló from starckoverflow

Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}