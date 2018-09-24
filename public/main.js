let posOne = new THREE.Vector3( 100, 0, 200 );
let currColor = 0;
let camera, scene, renderer;
let mesh;
let targetMesh;
let phase = 4;
let delta = 5;
let deltaoneNumber = 0;
let timecounter = 0;
let pos = { x : 0, y: 0, z:0 };
let newPos = {x: 0, y: 0, z:0 }
let targetPos = { x : 0, y: 0, z: 0 };
let phasesin = 0;
let blinkOpacity = 0;
let gameTime = 60;
let gameOn = false;

// let gameCounter = 60;

function convertRange( value, r1, r2 ) {
  return ( value - r1[ 0 ] ) * ( r2[ 1 ] - r2[ 0 ] ) / ( r1[ 1 ] - r1[ 0 ] ) + r2[ 0 ];
}



const SpeechRecognition = webkitSpeechRecognition;
const giphyAPIKey = 'YOUR KEY';

const getSpeech = () => {
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.start();
  // recognition.continuous = false;
  recognition.interimResults = true;
  console.log('started rec');

  recognition.onresult = event => {
    const speechResult = event.results[0][0].transcript;
    console.log('result: ' + speechResult);
    console.log('confidence: ' + event.results[0][0].confidence);
    // document.querySelector('#speech-div').textContent = speechResult;
    // getGif(speechResult);

    switch (speechResult) {
      case "up":
      case "move up":
      newPos.y = newPos.y + delta;
      // console.log(pos, newPos);
      moveCube(pos, newPos);
      break;
      case "down":
      case "move down":
      newPos.y = newPos.y - delta;
      moveCube(pos, newPos);
      console.log("z");
      break;
      case "left":
      case "move left":
      newPos.x = newPos.x - delta;
      moveCube(pos, newPos);
      console.log("a");
      break;
      case "right":
      case "move right":
      newPos.x = newPos.x + delta;
      moveCube(pos, newPos);
      console.log("d");
      break;
      case "out":
      case "move out":
      newPos.z = newPos.z;
      moveCube(pos, newPos);
      console.log("d");
      break;
      case "in":
      case "move in":
      newPos.z = newPos.z;
      moveCube(pos, newPos);
      console.log("d");
      case "all the way right":
      case "move all the way right":

      console.log("moving all the way right");
      // break;
    }
  };

  recognition.onend = () => {
    console.log('it is over');

    // for "endless" mode, comment out the next line and uncomment getSpeech()
    // recognition.stop();
    getSpeech();

  };

  recognition.onerror = event => {
    console.log('something went wrong: ' + event.error);
  };
};

let gameCounter;
document.querySelector('#my-button').onclick = () => {
  gameTime = 60;
  gameOn = true;
  document.getElementById('timer').innerHTML = gameTime;

  gameCounter = setInterval(function() {
    if (gameTime > 0){
      gameTime = gameTime - 1;
      // console.log("click", gameTime);
       document.getElementById('timer').innerHTML = gameTime;
    }

    if (gameTime == 0){
      document.getElementById('timer').innerHTML = "Game Over";
      // console.log("game over!")
      gameOver();
    }
  }, 1000);


};



function gameOver(){
  gameOn = false;

}


//////////// Three JS //////////

init();
animate();


function init() {

  getSpeech();

  console.log("window", window.innerWidth, window.innerHeight);







  camera = new THREE.PerspectiveCamera( 20, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.z = 200;
  scene = new THREE.Scene();



  // var texture = new THREE.TextureLoader().load( 'textures/crate.gif' );
  var geometry = new THREE.BoxGeometry( 4, 4, 4 );
  var material = new THREE.MeshPhongMaterial( { color: 0x28d3b1,  flatShading: true } );
  mesh = new THREE.Mesh( geometry, material );
  mesh.position = pos;
  mesh.name = "player";
  mesh.rotation.x = -55;
  console.log(mesh.name, mesh.position );

  scene.add( mesh );

  // let mappedrange = convertRange( Math.floor(Math.random() * 30), [ 0, 30 ], [ -20, 20 ] );


  targetPos = {x: Math.ceil(convertRange( Math.floor(Math.random() * 30), [ 0, 20 ], [ -30, 30 ] )),
    y: Math.ceil(convertRange( Math.floor(Math.random() * 20), [ 0, 20 ], [ -20, 20 ] )),
    z: 0
  }
  console.log("target pos", targetPos);



  let targetGeometry = new THREE.SphereGeometry( 0.0001, 20, 20 );
  let targetMaterial = new THREE.MeshPhongMaterial( { color: 0xd12b2b, shininess: 10, flatShading: false } );
  targetMesh = new THREE.Mesh( targetGeometry, targetMaterial );
  targetMesh.position.x = targetPos.x;
  targetMesh.position.y = targetPos.y;
  targetMesh.position.z = targetPos.z;
  targetMesh.name = "target";
  scene.add( targetMesh );


  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );



  let directionalLight = new THREE.DirectionalLight( 0xffffff, .6 );
  directionalLight.position.set( 40, 0, 300 );
  scene.add( directionalLight );


  var spotLight = new THREE.SpotLight( 0xffffff , 0.6);
  spotLight.position.set( 100, 0, 300 );
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;
  spotLight.shadow.camera.near = 500;
  spotLight.shadow.camera.far = 4000;
  spotLight.shadow.camera.fov = 30;

  scene.add( spotLight );





  // console.log(directionalLight);


  window.addEventListener( 'resize', onWindowResize, false );
}


function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

renderer.setClearColor (0xffffff, 1);

let currScale = 0;

document.addEventListener('keypress', (event) => {
  // const keyName = event.key
  switch (event.key) {
    case "w":
    newPos.y = newPos.y + delta;
    // console.log(pos, newPos);
    moveCube(pos, newPos);
    break;
    case "z":
    newPos.y = newPos.y - delta;
    moveCube(pos, newPos);
    console.log("z");
    break;
    case "a":
    newPos.x = newPos.x - delta;
    moveCube(pos, newPos);
    console.log("a");
    break;
    case "d":
    newPos.x = newPos.x + delta;
    moveCube(pos, newPos);
    console.log("d");
    break;
    case "x":
    newPos.z = newPos.z + delta;
    moveCube(pos, newPos);
    console.log("d");
    break;
    case "c":
    newPos.z = newPos.z - delta;
    moveCube(pos, newPos);
    console.log("d");
  }
});





function moveCube(pos, newPos){

  var tween = new TWEEN.Tween(pos)
  .to(newPos, 700)
  .easing(TWEEN.Easing.Quartic.InOut)
  .onUpdate(function() {
    let playerObject = scene.getObjectByName("player");
    playerObject.position.x = this.x;
    playerObject.position.y = this.y;
    playerObject.position.z = this.z;
    // console.log(this.x, this.y, this.z);
  })
  .start();
  pos = newPos;
  lightTween(lighton, lightoff, deltaoneNumber*100);

}

var lighton = {x:0, y:0, z:255};
var lightoff = {x:255, y:0, z:0};



function lightTween(pos, newPos, phase){

  var lightTween1 = new TWEEN.Tween(pos)
  .to(newPos, phase)
  .yoyo( true )
  .repeat( Infinity )
  .easing(TWEEN.Easing.Quartic.InOut)
  .onUpdate(function(){
    blinkOpacity =  this ;
  })
  .start();
}

lightTween(lighton, lightoff, deltaoneNumber*100);



function restartFunction(){

  gameTime = 60;

  let targetObject = scene.getObjectByName("target");
    targetPos = {x: Math.ceil(convertRange( Math.floor(Math.random() * 30), [ 0, 20 ], [ -30, 30 ] )),
      y: Math.ceil(convertRange( Math.floor(Math.random() * 20), [ 0, 20 ], [ -20, 20 ] )),
      z: 0
    }
    console.log("target pos", targetPos);



    targetObject.position.x = targetPos.x;
    targetObject.position.y = targetPos.y;
    targetObject.position.z = targetPos.z;


}


function animate() {
  requestAnimationFrame( animate );

  let playerObject = scene.getObjectByName("player");
  let targetObject = scene.getObjectByName("target");

  let deltaPosition = { x: Math.abs( Math.abs(playerObject.position.x) - Math.abs(targetObject.position.x) ),
    y: Math.abs( Math.abs(playerObject.position.y) - Math.abs(targetObject.position.y) ),
    z: Math.abs( Math.abs(playerObject.position.z) - Math.abs(targetObject.position.z) )
  }
  // console.log(deltaPosition);


  deltaoneNumber = Math.sqrt( Math.pow((playerObject.position.x-targetObject.position.x), 2) + Math.pow((playerObject.position.y-targetObject.position.y), 2) );
// console.log(deltaoneNumber);
  // console.log(deltaPosition);


  if ( (deltaPosition.x <= 5) && (deltaPosition.y <= 5) && (deltaPosition.z <= 5) ){
    console.log("great success!");
    clearInterval(gameCounter);
    document.getElementById('timer').innerHTML = "Great Success!";


    restartFunction();
  }
  // targetObject.material.color = (blinkOpacity.x, blinkOpacity.y, blinkOpacity.z, 1);
  var color = new THREE.Color("rgb(255, 0, 0)");

  // gameCounter = gameCounter - .01
  // console.log(gameCounter);


if (gameOn){
  timecounter = timecounter +.002;
}



  let value = 128.0 + 128 * Math.sin( (60 - deltaoneNumber) * timecounter * Math.PI  );
  let assColor = Math.floor(convertRange(value, [ 0, 256 ], [ 0, 255 ]));



  colorplace = "rgb" + "(" + assColor + "," + 10 + "," + 25 + ")";
  // console.log(colorplace);

  if (colorplace){
    playerObject.material.color = new THREE.Color(colorplace);
  }

  TWEEN.update();

  renderer.render( scene, camera );
}
