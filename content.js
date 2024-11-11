function autofillForm(userDetails) {
    const fields = {
      firstName: ["first_name", "firstname", "fname", "First Name", "first", "given-name"],
      lastName: ["last_name", "lastname", "lname", "Last Name", "last", "family-name"],
      fullName: ["full_name", "fullname", "Full Name", "name", "applicant_name"],
      gender:["user_gender","sex","gender_identity"],   
      email: ["email", "user_email", "email1", "Your email address", "email-address"],
      phone: ["phone", "user_phone", "phone_number", "Phone", "tel", "contact_number", "mobile", "mobile_number"],
      address: ["address", "Address", "location", "home_address"],
      linkedin: ["linkedin", "linkedin_profile", "linkedin-url", "LinkedIn"],
      github: ["github", "github_profile", "GitHub", "github-url"],
      portfolio: ["portfolio", "website", "Portfolio", "personal_website", "site"],
      jobTitle: ["job_title", "Job Title", "position", "desired_position"],
      university: ["university", "college", "institution", "University", "school"],
      degree: ["degree", "Degree", "qualification"],
      graduationYear: ["grad_year", "graduation_year", "year_of_graduation", "Graduation Year"]
    };

    // Autofill based on various selectors
    for (const [key, identifiers] of Object.entries(fields)) {
      const value = userDetails[key];
      if (!value) continue;

      // Match by `name`, `id`, or `aria-label`
      identifiers.forEach(identifier => {
        const nameField = document.querySelector(`input[name='${identifier}']`);
        const idField = document.querySelector(`input[id='${identifier}']`);
        const ariaField = document.querySelector(`input[aria-label='${identifier}']`);

        if (nameField) nameField.value = value;
        if (idField) idField.value = value;
        if (ariaField) ariaField.value = value;
      });

      // Match by `autocomplete`
      const autoCompletes = {
        email: "email",
        phone: "tel",
        firstName: "given-name",
        lastName: "family-name",
        address: "address-line1",
        fullName: "name"
      };
      if (autoCompletes[key]) {
        const autoCompleteField = document.querySelector(`input[autocomplete='${autoCompletes[key]}']`);
        if (autoCompleteField) autoCompleteField.value = value;
      }

      // Class-based matching for Google Forms
      if (key === "phone" || key === "email" || key === "fullName" || key === "firstName") {
        const classField = document.querySelector("input.whsOnd.zHQkBf");
        if (classField && !classField.value) {
          classField.value = value;
        }
      }

      // Specific handling for Google Forms' `aria-labelledby` and `aria-describedby` for "Mobile Number"
      document.querySelectorAll("input[aria-labelledby], input[aria-describedby]").forEach(input => {
        const labelId = input.getAttribute("aria-labelledby") || input.getAttribute("aria-describedby");
        if (labelId) {
          const labelElement = document.getElementById(labelId.split(" ")[0]);
          if (labelElement) {
            const labelText = labelElement.textContent.toLowerCase();

            // Improved filtering for mobile number fields
            if (labelText.includes("mobile") || labelText.includes("phone")) {
              input.value = userDetails.phone || "";
            } else if (labelText.includes("email")) {
              input.value = userDetails.email || "";
            } else if (labelText.includes("name") && !labelText.includes("college")) {
              input.value = userDetails.fullName || `${userDetails.firstName} ${userDetails.lastName}` || "";
            } else if (labelText.includes("college") || labelText.includes("university") || labelText.includes("school")) {
              input.value = userDetails.university || "";
            }
          }
        }
      });
    }
}

// Retrieve and autofill saved data
chrome.storage.local.get("userDetails", (data) => {
  if (data.userDetails) {
    autofillForm(data.userDetails);
  }
});
