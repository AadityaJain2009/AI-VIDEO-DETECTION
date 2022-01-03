video = "";
statuss ="";
userInput = "";
Objects = [];

function setup(){
    canvas = createCanvas(700 , 500);
    video = createCapture(VIDEO);
    video.hide();
    document.getElementById("status").innerHTML = "Status - Detecting Objects";
}

function speak(){
    var synth = window.speechSynthesis;

    var utterThis = new SpeechSynthesisUtterance(document.getElementById("conculsion").innerHTML);

    synth.speak(utterThis);
}

function draw(){
    image(video ,0, 0,700, 500);

    if (statuss != ""){
        ObjectDetector.detect(video , gotResult );    

        for (i = 0; i < Objects.length; i++ ){
            document.getElementById("status").innerHTML = "Status - Object Detected" ;

            fill("red");
            percent = floor(Objects[i].confidence * 100);
            text(Objects[i].label + "" + percent + "%" , Objects[i].x + 15 ,  Objects[i].y + 15);
            noFill();
            stroke("red");
            rect( Objects[i].x ,  Objects[i].y , Objects[i].width , Objects[i].height);
        }
    }    
}


function start(){
    ObjectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "Status -  Detecting Objects";
    userInput = document.getElementById("inputBox").value;
    console.log(userInput); 

    for (i = 0; i < Objects.length; i++ ){
        if(Objects[i].label == userInput){
            document.getElementById("conculsion").innerHTML = userInput + " " + "found";
            speak();
        }
        if(Objects[i].label != userInput){
            document.getElementById("conculsion").innerHTML = userInput +" " + "not found";
        }
    } 
}

  

function modelLoaded(){
    console.log("Model Loaded");
    statuss = true ;
}

function gotResult(error , results){
    if (error) {
        console.error(error);
    }
    console.log(results);
    Objects = results ;
}

