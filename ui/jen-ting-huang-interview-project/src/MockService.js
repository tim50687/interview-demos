var FieldService = {
  getField: function (id) {
    return {
      label: "Sales region",
      required: false,
      choices: [
        "Asia",
        "Australia",
        "Western Europe",
        "North America",
        "Eastern Europe",
        "Latin America",
        "Middle East and Africa",
      ],
      displayAlpha: true,
      default: "North America",
    };
  },
  saveField: async function (fieldJson) {
    try {
      // Fetch the data from the mock API
      const response = await fetch(
        "http://www.mocky.io/v2/566061f21200008e3aabd919",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fieldJson),
        }
      );

      // If the response is not ok, throw an error
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Console log the response
      console.log("Success:", data);
      // Log the posted data to the console as well
      console.log("Posted data:", fieldJson);

      return response.json();
    } catch (error) {
      console.error("Error posting field data:", error);
    }
  },
};

export default FieldService;
