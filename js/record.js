navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    handlerFunction(stream);
});
  
function handlerFunction(stream) {
    rec = new MediaRecorder(stream);
    rec.ondataavailable = (e) => {
        audioChunks.push(e.data);
        if (rec.state == "inactive") {
            let blob = new Blob(audioChunks, { type: "audio/mpeg-3" });
            recordedAudio.src = URL.createObjectURL(blob);
            recordedAudio.controls = true;
            recordedAudio.autoplay = false;
            uploadRec.disabled = false;
            uploadRec.onclick = () => {
                sendData(blob);
            }
        }
    };
}

function sendData(data) {
    let storageRef = firebase.storage().ref("recorded_audio/" + data);
    let task = storageRef.put(data);

    task.on('state_changed', 
        function progress(snapshot) {
            let percent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
            console.log("upload is " + percent +" done");
        },
        function error(err){
            console.log(err.message);
        },
        function complete() {},
        function () {task.snapshot.ref.getDownloadURL().then(
            function (downlaodURL) {
            console.log(downlaodURL);
        });
    });
}

record.onclick = (e) => {
    console.log("I was clicked");
    record.disabled = true;
    record.style.backgroundColor = "blue";
    stopRecord.disabled = false;
    audioChunks = [];
    rec.start();
};
stopRecord.onclick = (e) => {
    console.log("I was clicked");
    record.disabled = false;
    stop.disabled = true;
    record.style.backgroundColor = "red";
    rec.stop();
};
