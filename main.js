

import * as THREE from './build/three.module.js';

import { FresnelShader } from './examples/jsm/shaders/FresnelShader.js';
import { OrbitControls } from './examples/jsm/controls/OrbitControls.js';
// import { StereoEffect } from './jsm/effects/StereoEffect.js';

var container;

var camera, scene, renderer,controls;

var spheres = [];

var mouseX = 0, mouseY = 0;

var analyser,uniforms;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var effect;



THREE.Cache.enabled = true;

var permalink,hex;

var group, textMesh1, textMesh2, textGeo, materials;

var text = "love you",

	height = 10,
	size = 70,
	hover = 30,

	curveSegments = 4,

	bevelThickness = 2,
	bevelSize = 1.5,
	bevelEnabled = true,

	font = undefined,

	fontName = "optimer", // helvetiker, optimer, gentilis, droid sans, droid serif
	fontWeight = "bold"; // normal bold

var mirror = true;

var fontMap = {

	"helvetiker": 0,
	"optimer": 1,
	"gentilis": 2,
	"droid/droid_sans": 3,
	"droid/droid_serif": 4

};

var weightMap = {

	"regular": 0,
	"bold": 1

};

var reverseFontMap = [];
var reverseWeightMap = [];

for ( var i in fontMap ) reverseFontMap[ fontMap[ i ] ] = i;
for ( var i in weightMap ) reverseWeightMap[ weightMap[ i ] ] = i;




document.addEventListener( 'mousemove', onDocumentMouseMove, false );

var startButton = document.getElementById( 'startButton' );
startButton.addEventListener( 'click', init );

//init();


function init(){document.getElementById("overlay").remove();permalink=document.getElementById("permalink");container=document.createElement("div");document.body.appendChild(container);camera=new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight,1,1E5);camera.position.z=3200;var f=(new THREE.CubeTextureLoader).load("./examples/textures/cube/Park2/posx.jpg ./examples/textures/cube/Park2/negx.jpg ./examples/textures/cube/Park2/posy.jpg ./examples/textures/cube/Park2/negy.jpg ./examples/textures/cube/Park2/posz.jpg ./examples/textures/cube/Park2/negz.jpg".split(" "));
	scene=new THREE.Scene;scene.background=f;var v=new THREE.SphereBufferGeometry(15,32,16);f.mapping=THREE.CubeRefractionMapping;for(var e=new THREE.MeshBasicMaterial({color:16777215,envMap:f,refractionRatio:.95}),b=0;500>b;b++){var g=new THREE.Mesh(v,e);g.position.x=1E4*Math.random()-5E3;g.position.y=1E4*Math.random()-5E3;g.position.z=1E4*Math.random()-5E3;g.scale.x=g.scale.y=g.scale.z=3*Math.random()+1;scene.add(g);spheres.push(g)}b=new THREE.AudioListener;var w=new THREE.Audio(b);w.setLoop(!0);/(iPad|iPhone|iPod)/g.test(navigator.userAgent)?
		(new THREE.AudioLoader).load("././examples/sounds/lrsg.mp3",function(c){w.setBuffer(c);w.play()}):(b=new Audio("././examples/sounds/lrsg.mp3"),b.play(),w.setMediaElementSource(b));analyser=new THREE.AudioAnalyser(w,128);v=new THREE.SphereBufferGeometry(50,32,16);b=FresnelShader;e=THREE.UniformsUtils.clone(b.uniforms);e.tCube.value=f;f=new THREE.ShaderMaterial({uniforms:e,vertexShader:b.vertexShader,fragmentShader:b.fragmentShader});for(b=0;500>b;b++)e=new THREE.Mesh(v,f),e.position.x=1E4*Math.random()-
		5E3,e.position.y=1E4*Math.random()-5E3,e.position.z=1E4*Math.random()-5E3,e.scale.x=e.scale.y=e.scale.z=3*Math.random()+1,scene.add(e),spheres.push(e);renderer=new THREE.WebGLRenderer;renderer.setPixelRatio(window.devicePixelRatio);renderer.setSize(window.innerWidth,window.innerHeight);container.appendChild(renderer.domElement);controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=!0;controls.dampingFactor=.05;controls.screenSpacePanning=!1;controls.minDistance=100;controls.maxDistance=
		500;controls.minPolarAngle=Math.PI/2;controls.maxPolarAngle=Math.PI/2;controls.autoRotate=!0;controls.autoRotateSpeed=-1;f=new THREE.PointLight(16777215,1.5);f.position.set(0,100,90);scene.add(f);b=new THREE.HemisphereLight(16777215,16777215,.6);b.color.setHSL(.6,1,.6);b.groundColor.setHSL(.095,1,.75);b.position.set(0,50,0);scene.add(b);var k=document.location.hash.substr(1);0!==k.length?(b=k.substring(0,6),v=k.substring(6,7),e=k.substring(7,8),g=k.substring(8,9),k=k.substring(10),hex=b,f.color.setHex(parseInt(b,
		16)),fontName=reverseFontMap[parseInt(v)],fontWeight=reverseWeightMap[parseInt(e)],bevelEnabled=parseInt(g),text=decodeURI(k),updatePermalink()):(f.color.setHSL(1,1,.5),hex=decimalToHex(f.color.getHex()));materials=[new THREE.MeshPhongMaterial({color:16777215,flatShading:!0}),new THREE.MeshPhongMaterial({color:16777215})];group=new THREE.Group;group.position.y=100;scene.add(group);var h=new THREE.Group;h.position.y=-30;scene.add(h);loadFont();(function(c,u,l,m,n,p,q,r,t,d){var a=new THREE.ShapeBufferGeometry(c);
		a=new THREE.Mesh(a,new THREE.MeshPhongMaterial({side:THREE.DoubleSide,color:l}));a.position.set(m,n,p-75);a.rotation.set(q,r,t);a.scale.set(d,d,d);h.add(a);a=new THREE.ShapeBufferGeometry(c);a=new THREE.Mesh(a,new THREE.MeshPhongMaterial({color:l,side:THREE.DoubleSide}));a.position.set(m,n,p-175);a.rotation.set(q,r,t);a.scale.set(d,d,d);h.add(a);a=new THREE.ExtrudeBufferGeometry(c,u);a=new THREE.Mesh(a,new THREE.MeshPhongMaterial({color:l}));a.position.set(m,n,p-125);a.rotation.set(q,r,t);a.scale.set(d,
			d,d);h.add(a);c.autoClose=!0;u=c.getPoints();a=c.getSpacedPoints(50);c=(new THREE.BufferGeometry).setFromPoints(u);u=(new THREE.BufferGeometry).setFromPoints(a);a=new THREE.Line(c,new THREE.LineBasicMaterial({color:l}));a.position.set(m,n,p+25);a.rotation.set(q,r,t);a.scale.set(d,d,d);h.add(a);a=new THREE.Line(u,new THREE.LineBasicMaterial({color:l}));a.position.set(m,n,p-25);a.rotation.set(q,r,t);a.scale.set(d,d,d);h.add(a);c=new THREE.Points(c,new THREE.PointsMaterial({color:l,size:4}));c.position.set(m,
			n,p+125);c.rotation.set(q,r,t);c.scale.set(d,d,d);h.add(c);c=new THREE.Points(u,new THREE.PointsMaterial({color:l,size:4}));c.position.set(m,n,p+75);c.rotation.set(q,r,t);c.scale.set(d,d,d);h.add(c)})((new THREE.Shape).moveTo(25,25).bezierCurveTo(25,25,20,0,0,0).bezierCurveTo(-30,0,-30,35,-30,35).bezierCurveTo(-30,55,-10,77,25,95).bezierCurveTo(60,77,80,55,80,35).bezierCurveTo(80,35,80,0,50,0).bezierCurveTo(35,0,25,25,25,25),{depth:8,bevelEnabled:!0,bevelSegments:2,steps:2,bevelSize:1,bevelThickness:1},
		15728640,60,100,0,0,0,Math.PI,1);window.addEventListener("resize",onWindowResize,!1);animate()};

function boolToNum(a){return a?1:0}function decimalToHex(a){a=Number(a).toString(16);a="000000".substr(0,6-a.length)+a;return a.toUpperCase()}function updatePermalink(){var a=hex+fontMap[fontName]+weightMap[fontWeight]+boolToNum(bevelEnabled)+"#"+encodeURI(text);permalink.href="#"+a;window.location.hash=a}
function createText(){textGeo=new THREE.TextGeometry(text,{font:font,size:size,height:height,curveSegments:curveSegments,bevelThickness:bevelThickness,bevelSize:bevelSize,bevelEnabled:bevelEnabled});textGeo.computeBoundingBox();textGeo.computeVertexNormals();var a=new THREE.Triangle;if(!bevelEnabled)for(var c=.1*height*size,e=0;e<textGeo.faces.length;e++){var b=textGeo.faces[e];if(1==b.materialIndex){for(var d=0;d<b.vertexNormals.length;d++)b.vertexNormals[d].z=0,b.vertexNormals[d].normalize();if(a.set(textGeo.vertices[b.a],
	textGeo.vertices[b.b],textGeo.vertices[b.c]).getArea()>c)for(d=0;d<b.vertexNormals.length;d++)b.vertexNormals[d].copy(b.normal)}}a=-.5*(textGeo.boundingBox.max.x-textGeo.boundingBox.min.x);textGeo=(new THREE.BufferGeometry).fromGeometry(textGeo);textMesh1=new THREE.Mesh(textGeo,materials);textMesh1.position.x=a;textMesh1.position.y=hover;textMesh1.position.z=0;textMesh1.rotation.x=0;textMesh1.rotation.y=2*Math.PI;group.add(textMesh1);textMesh1.position.y=-10}
function loadFont(){(new THREE.FontLoader).load("./examples/fonts/"+fontName+"_"+fontWeight+".typeface.json",function(a){console.log(a);font=a;refreshText()})}function refreshText(){updatePermalink();group.remove(textMesh1);mirror&&group.remove(textMesh2);text&&createText()}
function onWindowResize(){windowHalfX=window.innerWidth/2;windowHalfY=window.innerHeight/2;camera.aspect=window.innerWidth/window.innerHeight;camera.updateProjectionMatrix();renderer.setSize(window.innerWidth,window.innerHeight)}function onDocumentMouseMove(a){mouseX=10*(a.clientX-windowHalfX);mouseY=10*(a.clientY-windowHalfY)}function animate(){requestAnimationFrame(animate);controls.update();render()}
function render(){for(var a=1E-4*Date.now(),c=0,e=spheres.length;c<e;c++){var b=spheres[c];b.position.x=5E3*Math.cos(a+c);b.position.y=5E3*Math.sin(a+1.1*c)}c=0;for(e=spheres.length;c<e;c++)b=spheres[c],b.position.x=5E3*Math.cos(a+c),b.position.y=5E3*Math.sin(a+1.1*c);renderer.render(scene,camera)};

