function upload() {
    // Get file
    let file = document.getElementById("file_button").files[0];

    // Create storage ref
    let storage_ref = firebase.storage().ref('uploaded_audio/' + file.name);

    // Upload file
    let task = storage_ref.put(file);

    // Progress
    task.on('state_changed', 
        function progress(snapshot) {
            let percent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
            console.log("upload is " + percent +" done");
        },
        function error(err){
            console.log(err.message);
        },
        function complete() {
            
        },
        function () {task.snapshot.ref.getDownloadURL().then(
            function (downlaodURL) {

            // Get your upload image url 
            console.log(downlaodURL);
        });
    });
}