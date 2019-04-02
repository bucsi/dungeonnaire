var terkep = [
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

var szobak = [];

function about() {
	alert("Gamifikált teszt. (C) Bucsánszki Tamás 2019.\nforráskód a GitHubon: https://github.com/bucsi/utveszto");
}

function startGame() {
    jatekTer.start();
    feladatTer.start();
    player = new Player(500, 500);
    //convertCoord(0,0);
    /*
    let a,b;
    list destruction
    [a, b] = ["A", "B"];
    alert(a + ":" + b);
    */
}

function updateTer() {
    //alert(terkep);
    jatekTer.clear();
    for (let sor of szobak){
        for(let sz of sor){
            if(sz){
                if(playerInRoom(sz)){
                    ii = sz.i;
                    jj = sz.j;
                    if(ii < 9){
                        szobak[ii+1][jj].hidden = false;
                    }
                    if(jj < 9){
                        szobak[ii][jj+1].hidden = false;
                    }
                    if(ii > 0){
                        szobak[ii-1][jj].hidden = false;
                    }
                    if(jj > 0){
                        szobak[ii][jj-1].hidden = false;
                    }
                }
                if(!sz.hidden){
                   sz.update();
               }
            }
        }
    }
    [xx, yy] = screenToCanvas(jatekTer.mx, jatekTer.my, jatekTer.canvas);
    if(xx>0 && xx<1000 && yy>0 && xx<1000 && Math.abs(xx-player.x)<130 && Math.abs(yy-player.y)<130 && canvasPointIsRoom(xx, yy)){
        player.x = xx;
        player.y = yy;
    }
    player.update();
    //console.log(convertCoord(jatekTer.mx, jatekTer.my, jatekTer.canvas))
}


function rajzol(){
    for(let i=0; i<10;i++){
        let l = []
        for (let j=0; j<10; j++){
            if(terkep[i][j]){
                let sz = new Szoba(100,100,"saddlebrown",0+j*100,0+i*100, i, j);
                 l.push(sz);
            }else{
                l.push(0);
            }
        }
        szobak.push(l);
    }
    
    szobak[0][0].hidden = false;
    player.x = szobak[0][0].pos.x;
    player.y = szobak[0][0].pos.y;
    
}

function screenToCanvas(px, py, cvs){
//maps window mouse coords to real canvas cords
	let rect = cvs.getBoundingClientRect();
    scaleX = cvs.width / rect.width,
    scaleY = cvs.height / rect.height;
    return [(px - rect.left)*scaleX, (py - rect.top)*scaleY]
    
}

function playerInRoom(szoba){
    if(player.x > szoba.pos.x-50 && player.x < szoba.pos.x+50 && player.y > szoba.pos.y-50 && player.y < szoba.pos.y+50){
        return true;
    }else{
        return false;
    }
}

function canvasPointIsRoom(px, py){
    i = Math.ceil(px/100)-1;
    j = Math.ceil(py/100)-1;
    console.log(i + " " + j + szobak[j][i])
    if(szobak[j][i]){
        return true;
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
	//console.log("szoba updated.");
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


/*
dotted grid over the canvas
this.context.beginPath();
for (var x=0.5;x<480;x+=60) {
    this.context.moveTo(x,0);
    this.context.lineTo(x,480);
}
for (var y=0.5; y<480; y+=60) {
    this.context.moveTo(0,y);
    this.context.lineTo(480,y);
}
//this.context.strokeStyle='grey';
//this.context.setLineDash([1,4]);
this.context.lineWidth = 2;
this.context.strokeStyle = "black";
this.context.stroke();
*/