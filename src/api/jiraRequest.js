import axios from "axios";
export const createTicket = async (data) => {
  const payload = {
    fields: {
      project: { key: import.meta.env.VITE_JIRA_PROJECT_KEY },
      summary: data.title,
      description: data.description,
      issuetype: { name: "Task" },
      priority: { name: data.priority },
      reporter: { name: data.reportBy },
      //   customfield_template: "Template Title", // Replace with actual custom field ID if needed
      customfield_link: data.link,
      status: { name: data.status },
    },
  };

  try {
    const response = await axios.post(
      `https://iamthemunna10.atlassian.net/rest/api/2/issue`,
      payload,
      {
        headers: {
          Authorization: `Basic ${btoa(
            `iamthemunna10@gmail.com:${import.meta.env.VITE_JIRA_API_TOKEN}`
          )}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.self;
  } catch (error) {
    console.error("Error creating ticket:", error);
    throw error;
  }
};
