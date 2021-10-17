music1 = "";
music2 = "";
LeftWristX = 0;
LeftWristY = 0;
RightWristX = 0;
RightWristY = 0;
LeftWristScore = 0;
Status = "";

function preload() {
    music1 = loadSound("music.mp3");
    music2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(300, 300);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function draw() {
    image(video, 0, 0, 300, 300);
    fill("purple");
    stroke("purple");
    Status = music1.isPlaying();
    if (LeftWristScore > 0.2) {
        circle(LeftWristX, LeftWristY, 20);
        music2.stop();
        if (Status == false) {
            music1.play();
            document.getElementById("song_name").innerHTML = "music1";
        }
    }
}

function modelLoaded() {
    console.log("PoseNet Is Initialized!");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        LeftWristScore = results[0].pose.keypoints[9].score;
        LeftWristX = results[0].pose.leftWrist.x;
        LeftWristY = results[0].pose.leftWrist.y;
        console.log("LeftWristX = " + LeftWristX + " LeftWristY = " + LeftWristY);
        RightWristX = results[0].pose.rightWrist.x;
        RightWristY = results[0].pose.rightWrist.y;
        console.log("RightWristX = " + RightWristX + " RightWristY = " + RightWristY);
    }
}
