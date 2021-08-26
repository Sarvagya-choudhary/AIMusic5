music="";
music2="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreLeftWrist=0;
scoreRightWrist=0;
song1Status="";
song2Status="";
function preload(){
    song=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
}
function setup(){
    canvas=createCanvas(560,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    posenet= ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);
    song.play();
}
function draw(){
    image(video,0,0,560,500);
    song1Status= song.isPlaying();
    stroke("red");
    fill("red");
    if(scoreLeftWrist>0.2){
        circle(leftWristX,leftWristY,20);
        if(song2Status == true){
            song2.stop();
            song.play();
            document.getElementById("song_name").innerHTML="Harry Potter";
        }
    }
    song2Status= song2.isPlaying();
    if(scoreRightWrist>0.2){
        circle(rightWristX,rightWristY,20);
        if(song1Status == true){
            song.stop();
            song2.play();
            document.getElementById("song_name").innerHTML="My Freind";
        }
    }
}
function modelLoaded(){
    console.log("Model Loaded");
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log(" Left Wrsit X = "+leftWristX+"  Left Wrist Y "+leftWristY);
        console.log(" Right Wrist X = "+rightWristX+"  Right Wrist Y "+rightWristY);
        scoreLeftWrist= results[0].pose.keypoints[9].score;
        scoreRightWrist= results[0].pose.keypoints[10].score;
    }
}