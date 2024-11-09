document.getElementById("saveBtn").addEventListener("click", () => {
    const userDetails = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      fullName: document.getElementById("fullName").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      address: document.getElementById("address").value,
      linkedin: document.getElementById("linkedin").value,
      github: document.getElementById("github").value,
      portfolio: document.getElementById("portfolio").value,
      jobTitle: document.getElementById("jobTitle").value,
      university: document.getElementById("university").value,
      degree: document.getElementById("degree").value,
      graduationYear: document.getElementById("graduationYear").value
    };
    
    // Save user details to Chrome's local storage
    chrome.storage.local.set({ userDetails }, () => {
      alert("Details saved successfully!");
    });
  });
  