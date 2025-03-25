/*import axios from "axios";

// Replace with your Groq API key
const API_KEY = "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";

// Groq API Endpoint
const API_URL = "https://api.groq.com/openai/v1/chat/completions";

// Generate Capstone Title
export const generateCapstoneTitle = async () => {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: "llama3-8b-8192", // Groq's Llama 3 model
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that generates creative capstone project titles."
          },
          {
            role: "user",
            content: "Generate one unique and innovative capstone project title for an Information Technology student. Make it concise and engaging."
          }
        ],
        max_tokens: 50,
        temperature: 0.7,
        n: 1,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`,
        },
      }
    );
    
    // Extract and return the generated title
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Groq API Error:", error.response ? error.response.data : error.message);
    throw new Error("Failed to generate title");
  }
};*/import axios from "axios";

const API_KEY = "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";
const API_URL = "https://api.groq.com/openai/v1/chat/completions";

export const generateCapstoneProject = async () => {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: "llama3-8b-8192",
        messages: [
          {
            role: "system",
            content: `Follow these strict guidelines:
- Generate a professional, innovative IT-related project title.
- Focus on solving real-world problems.
- Ensure the title is specific and technically oriented.
- Avoid generic or vague titles.
- Create a title that sounds like a genuine research or engineering project.
Examples of good titles:
- "Adaptive Machine Learning Framework for Predictive Cybersecurity"
- "IoT-Enabled Smart Urban Traffic Management System"
- "Blockchain-Powered Decentralized Healthcare Data Management Platform"
Generate capstone project details exactly in the following format: Title | 20-word description | Tech Stack. Do not include any intro, outro, or extra words.
Ensure the title includes at least one of these keywords: "System", "Framework", or "Platform".`
          },
          {
            role: "user",
            content: `Create a  modern IT capstone project title with a maximum twenty words description and include the tech stack, strictly following the format: Title | twenty words description | Tech Stack only.`
          }
        ],
        max_tokens: 150,
        temperature: 0.7,
        n: 1,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`,
        },
      }
    );
    
    const fullResponse = response.data.choices[0].message.content.trim();
    const [title, description, techStack] = fullResponse.split('|').map(item => item.trim());
    
    // Validate the title includes at least one required keyword.
    if (!/(System|Framework|Platform)/.test(title)) {
      throw new Error("The generated title is not valid. It must include 'System', 'Framework', or 'Platform'.");
    }
    
    return { title, description, techStack };
  } catch (error) {
    console.error("Groq API Error:", error.response ? error.response.data : error.message);
    throw new Error("Failed to generate valid project details");
  }
};

// Example usage:
(async () => {
  try {
    const project = await generateCapstoneProject();
    console.log("Generated Project Details:");
    console.log("Title:", project.title);
    console.log("Description:", project.description);
    console.log("Tech Stack:", project.techStack);
  } catch (err) {
    console.error(err.message);
  }
})();
