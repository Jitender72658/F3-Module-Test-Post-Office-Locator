const addressDetails = document.getElementById('addressDetailsContainer');
const ipAddressVal= document.getElementById('ipAddressVal');
const map = document.getElementById('map');
const moreInfoContent = document.getElementById('moreInfoContent');
const postOfficesListContainer = document.getElementById('postOfficesDetailsContainer');
const searchInput = document.getElementById('searchInput');
window.onload =fetchIpAddress;
const token = 'b077d39e5618dd';
let longi;
let lati;
let postOfficeList;
async function fetchIpAddress(){
      const url =  `https://ipinfo.io?token=${token}`;
      const response = await fetch(url);
      const ipDetails = await response.json();
      const dataUrl = `https://ipapi.co/${ipDetails.ip}/json/`;
       const data = await fetch(dataUrl);
       const extractedData =await data.json();
       console.log(extractedData);
      displayAddressDetails(extractedData);
      loadMap();
}
function loadMap(){
    map.src = `https://maps.google.com/maps?q=${lati}, ${longi}&output=embed`;
}

function displayAddressDetails(details){
    ipAddressVal.innerText = details.ip;
    lati = details.latitude;
    longi =details.longitude;
    addressDetails.innerHTML = `<span>Lat: ${lati}</span>
                                <span>City: ${details.city}</span>
                                <span>Organisation: ${details.org}</span>
                                <span>Long: ${longi}</span>
                                <span>Region: ${details.region}</span>
                                <span>Hostname: </span>`;
      displayMoreDetails(details);
      fetchNearbyPostOffices(details.postal);
    
}

function displayMoreDetails(details){
      moreInfoContent.innerHTML = `<p>Time Zone: ${details.timezone}</p>
                                   <p> Date and Time: ${2}</p>
                                   <p>Pincode: ${details.postal}</p>
                                   <p id="messageDetails"></p>`;
}

async function fetchNearbyPostOffices(pincode){
    url = `https://api.postalpincode.in/pincode/${pincode}`;
    const response = await fetch(url);
    const result = await response.json();
    postOfficeList = result[0].PostOffice;
    displayNearbyPostOffices(postOfficeList);
    const messageDetails = document.getElementById('messageDetails');
    console.log(messageDetails);
    messageDetails.innerText = `Message: ${result[0].Message}`;

}
function displayNearbyPostOffices(postOffices){
    console.log(postOffices);
     postOfficesListContainer.innerHTML = '';
     postOffices.forEach((postOffice) => {
        const postOfficeDiv = document.createElement('div');
        postOfficeDiv.className = 'postOfficeDiv';
        postOfficeDiv.innerHTML = `<p>Name: ${postOffice.Name}</p>
                                   <p>Branch Type: ${postOffice.BranchType}</p>
                                   <p>Delivery Status: ${postOffice.DeliveryStatus}</p>
                                   <p>District: ${postOffice.District}</p>
                                   <p>Division: ${postOffice.Division}</p>`;
        postOfficesListContainer.appendChild(postOfficeDiv);
     });
}
searchInput.addEventListener('keyup',(event)=>{
      let inputValue = document.getElementById('searchInput').value;
      let filteredPostOffices = postOfficeList.filter((value,index)=>{
               return value.Name.toLowerCase().includes(inputValue.toLowerCase());
      })
      displayNearbyPostOffices(filteredPostOffices);
})






