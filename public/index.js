
document.getElementById("download-button").addEventListener("click",downloadImage);

function downloadImage(){
    window.open("http://localhost:3000/download?shaderName=metal");
    // fetch("http://localhost:3000/download?shaderName=metal");
}
