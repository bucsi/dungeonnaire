function draw() {

      var canvas = document.getElementById('canvas');
      if (canvas.getContext) {
        var context = canvas.getContext('2d');

        for(var x=0.5;x<500;x+=20) {
          context.moveTo(x,0);
          context.lineTo(x,500);
        }

        for(var y=0.5; y<500; y+=20) {
          context.moveTo(0,y);
          context.lineTo(500,y);

      }

      context.strokeStyle='grey';
      context.stroke();

  }
}

function showCoords(event) {
    var x = event.clientX - 10;
    var y = event.clientY - 10;
    var coords = "X coordinates: " + x + ", Y coordinates: " + y;
    document.getElementById('showCoords').innerHTML = coords;

  }