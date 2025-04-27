function searchData() {
  const input = document.getElementById('inputData').value.trim();
  const resultDiv = document.getElementById('result');
  
  if (!input) {
    resultDiv.innerHTML = "Please enter a valid input.";
    return;
  }

  // Check if input is number (PIN Code)
  if (!isNaN(input)) {
    fetch(`https://api.postalpincode.in/pincode/${input}`)
      .then(response => response.json())
      .then(data => {
        if (data[0].Status === "Success") {
          const placeName = data[0].PostOffice[0].Name;
          resultDiv.innerHTML = `Location: ${placeName}`;
        } else {
          resultDiv.innerHTML = "No location found for this PIN code.";
        }
      })
      .catch(error => {
        resultDiv.innerHTML = "Error fetching data.";
      });
  } else {
    // If input is text (Place Name)
    fetch(`https://api.postalpincode.in/postoffice/${input}`)
      .then(response => response.json())
      .then(data => {
        if (data[0].Status === "Success") {
          const pinCode = data[0].PostOffice[0].Pincode;
          resultDiv.innerHTML = `Pin Code: ${pinCode}`;
        } else {
          resultDiv.innerHTML = "No PIN code found for this location.";
        }
      })
      .catch(error => {
        resultDiv.innerHTML = "Error fetching data.";
      });
  }
}
