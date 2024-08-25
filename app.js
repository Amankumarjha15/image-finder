const ACCESS_TOKEN = "rb5Wcel1i9ev7KQpqFucLTec1_wNTdWbeBOx0GeGgkc";
let keyword = document.getElementById("keywords");
let val;
let page;
const btn = document.querySelector(".search-btn");
const mainDiv=document.querySelector(".main");



window.addEventListener('load', () => {
    fetchImg('all');
});



const fetchImg = async (val,page) => {

    try{
        // page = 1;
    const data = await fetch(`https://api.unsplash.com/search/photos?query=${val}&client_id=${ACCESS_TOKEN}&page=${page}`);

    const response = await data.json();
    // keyword.value = "";

    console.log(response);

     if (response.results.length < 1) {
        mainDiv.innerHTML = `<h2>Not Found</h2>`;
    } else {
        displayImg(response);
        console.log(response);
    }
}
catch(error){
    mainDiv.innerHTML=`<h1>Type correct image name . This ${val} image is not found.</h1>`;
}

}




function displayImg(response) {
    response.results.map((results) => {
        const card = document.createElement('div');
        card.classList.add('cards');
        card.innerHTML = `
        <div class="image">
               <img src="${results.urls.regular}" alt="">
           </div>

           <div class="disc">
               <p>${results.alt_description}</p>
           </div>
           <button class="download-btn"><a href="${results.urls.regular}" class="download-btn2" onclick="download("${results.urls.regular}")" target="_blank">Download Image</a></button>
    `
    mainDiv.appendChild(card);

    });
    document.getElementById("loadMoreBtn").classList.remove("hidden");
}





document.getElementById("loadMoreBtn").addEventListener("click", () => {
    page++;
    const val = keyword.value.trim();  
    fetchImg(val,page);
});







btn.addEventListener("click" , (e)=> {
    page=1;
    e.preventDefault();
    const val = keyword.value.trim();  
    if(!val){
        mainDiv.innerHTML = `<h1>Type the correct word..</h1>`
      return;
    }
    fetchImg(val,page);
    mainDiv.innerHTML="";
})




function downloadFile(url, filename) {
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }
  
  // Example usage:
//   downloadFile('https://example.com/file.pdf', 'example.pdf');




const download = async (e) => {
    const originalImage = e;
    const image = await fetch(originalImage);

    //Split image name
    const nameSplit = originalImage.split("/");
    const duplicateName = nameSplit.pop();

    const imageBlog = await image.blob();
    const imageURL = URL.createObjectURL(imageBlog);
    const link = document.createElement("a");
    link.href = imageURL;
    link.download = "" + duplicateName + "";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log(e);
  };






//   https://api.unsplash.com/search/photos?query=game&client_id=rb5Wcel1i9ev7KQpqFucLTec1_wNTdWbeBOx0GeGgkc&page=1