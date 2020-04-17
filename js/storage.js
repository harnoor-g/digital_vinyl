function upload() {
    // Get content
    // let uploader = document.getElementById("uploader");
    let file = document.getElementById("file_button").files[0];

    // Listen for file selection
    // file_button.addEventListener('change', function (e) {
        
        // Get file
        // let file = e.target.files[0];

        // Create storage ref
        let storage_ref = firebase.storage().ref('user_audio/' + file.name);

        //Upload file
        let task = storage_ref.put(file);

        // progress
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
            function () {
                task.snapshot.ref.getDownloadURL().then(
                    function (downlaodURL) {
                    //get your upload image url here...
                    console.log(downlaodURL);
                });
            });
    // });
}