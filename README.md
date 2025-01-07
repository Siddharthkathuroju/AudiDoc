


# Content Generation with Gemini API

This project is a web-based application that leverages the **Gemini API** to generate creative content based on user input. Built using Next.js, it provides a seamless interface for users to input text, generate unique content, and download the result as a PDF file. The project integrates advanced AI capabilities for dynamic content generation and utilizes modern web development frameworks to deliver an efficient and user-friendly experience.

---

Features

- **Content Generation**: Users can input a text prompt, and the Gemini API generates creative content in response.
- **PDF Download**: The generated content can be converted to a PDF and downloaded for offline use.
- **API Integration**: Utilizes the Gemini API (`gemini-2.0-flash-exp` model) for robust and accurate content generation.
- **Modern Frontend**: Developed with Next.js for optimal performance and scalability.
- **Tailored User Experience**: Intuitive UI for entering prompts and accessing generated content.

---

Tech Stack

- **Frontend**: Next.js, React
- **Styling**: Tailwind CSS
- **Backend**: Node.js
- **AI Model**: Gemini API
- **PDF Generation**: jsPDF

---

How It Works

1. **Input Text**: Users provide a text prompt through the application interface.
2. **Content Generation**: The app sends the text input to the Gemini API to generate creative content.
3. **Receive Output**: The generated content is displayed to the user.
4. **Download PDF**: Users can download the generated content as a PDF file for future reference.

---

Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env.local` file in the root directory.
   - Add your Gemini API key:
     ```
     GEMINI_API_KEY=your_api_key_here
     ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open the app in your browser:
   ```
   http://localhost:3000
   ```

---

Usage

- Navigate to the input page.
- Enter a prompt in the text field and submit it.
- Wait for the content to be generated and displayed.
- Click the "Download PDF" button to save the content locally.

---

Future Enhancements

- Add support for multiple content formats (e.g., DOCX, HTML).
- Enhance customization options for generated content.
- Improve error handling and detailed feedback for API interactions.
- Integrate user authentication for personalized features.

---

Contributing

Contributions are welcome! If you'd like to contribute to this project, please fork the repository and submit a pull request.
License This project is open-source and available under the MIT License.
