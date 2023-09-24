export const createEmail = (data) => {
  const emailData = JSON.parse(data);

  const email = `
  <body >
          ${Object.entries(emailData)
            .map(([key, value]) =>
              key === "categories"
                ? `<p>
                ${key}: <span>${value.attributes.name}</span>
              </p>`
                : `<p>
                ${key}: <span>${value}</span>
              </p>`
            )
            .join("")}

  </body>
  `;

  return email;
};
