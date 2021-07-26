// variables
let video = document.getElementById("web-video");
let canvas = document.getElementById("canvas");
let model;
let ctx = canvas.getContext("2d")
// function for camera executing
const startCamera = () =>{
    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
    })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch((error) => console.log("Error " + error));
}
// face detection prediction
const detFace = async () =>{
    const prediction = await model.estimateFaces(video, false);
    // console.log(prediction)
    ctx.drawImage(video, 0,0,720,560)
    // rectangle on face which width 2, and color white
    prediction.forEach((pred)=>{
        ctx.beginPath();
        ctx.lineWidth = "2";
        ctx.strokeStyle = "white";
        ctx.rect(
            pred.topLeft[0],
            pred.topLeft[1],
            pred.bottomRight[0] - pred.topLeft[0],
            pred.bottomRight[1] - pred.topLeft[1],
        )
        ctx.stroke();
    })
}

// startCamera function calling
startCamera();
// on load event
video.addEventListener("loadeddata",async ()=>{
    model = await blazeface.load();
    setInterval(detFace,40);
})

