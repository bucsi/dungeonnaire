var terkep = [
    [1,1,0,0,0,0,0,0,0,0],
    [0,1,1,1,1,1,1,1,0,0],
    [1,1,1,0,0,0,0,1,0,0],
    [1,0,0,0,0,0,0,1,0,0],
    [1,1,1,1,1,1,1,1,0,0],
    [1,0,0,0,0,1,0,0,0,0],
    [1,0,0,0,0,1,0,0,0,0],
    [1,0,0,0,0,1,0,0,0,0],
    [1,0,0,0,0,1,0,0,0,1],
    [1,0,0,0,0,1,0,0,0,1]
]; 

var szobak = [];

function startGame(){
    jatekTer.start();
    player = new _player(500, 500);      
}

function updateTer(){
    jatekTer.clear();
    for(let sz of szobak){
	sz.update();
    }
    if(player.x < 1000){
    	player.x += 1
    }else{
	player.x = 0;
    }
    player.update();
}


function rajzol(){
    for(let i=0; i<10;i++){
        for (let j=0; j<10; j++){
            if(terkep[i][j]){
                let sz = new _szoba(100,100,"saddlebrown",0+j*100,0+i*100);
                szobak.push(sz)
            }
        }
    }
}

var jatekTer = {
    canvas : document.createElement("canvas"),
    start : function(){
        this.canvas.width = 1000;
        this.canvas.height = 1000;
        this.context = this.canvas.getContext("2d");
        //document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        document.getElementById("canvas-container").appendChild(this.canvas);
	this.interval = setInterval(updateTer, 20);
        /*dotted grid over the canvas
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
        this.context.stroke();*/
    },
    clear : function() {
    	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	console.log("update");
    }
}

function _player(px,py){
    this.x = px-10;
    this.y = py-10;
    ctx = jatekTer.context;
    this.update = function(){
	ctx.fillStyle = "blue";
	ctx.fillRect(this.x, this.y, 20, 20);
    }
}
    
function _szoba(w, h, col, x, y){
    ctx = jatekTer.context;

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

    console.log("szoba constructed.");
    


    this.update = function(){
	console.log("szoba updated.");
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