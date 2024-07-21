<div>
  <h1>Recipe Generator</h1>
  <h2>Project Overview</h2>
  <p>The Recipe Generator is a web application that allows users to input the name of a dish and get the recipe for that dish. It combines a user-friendly frontend with a powerful backend to provide recipe information using AI-generated responses.</p>
  
  <h2>Tech Stack</h2>
  <ul>
    <li>
      <p><strong>Frontend:</strong></p>
      <ul>
        <li>Vite</li>
        <li>Vue.js</li>
        <li>Shadcn UI</li>
        <li>Tailwind CSS</li>
      </ul>
    </li>
    <li>
      <p><strong>Backend:</strong></p>
      <ul>
        <li>Python FastAPI</li>
        <li>Gemini AI</li>
      </ul>
    </li>
  </ul>

  <h2>Installation</h2>
  
  <h3>Frontend</h3>
  <ol>
    <li>
      <p>Navigate to the client directory:</p>
      <pre><code>cd client</code></pre>
    </li>
    <li>
      <p>Install the dependencies:</p>
      <pre><code>npm install</code></pre>
    </li>
    <li>
      <p>Start the development server:</p>
      <pre><code>npm run dev</code></pre>
    </li>
  </ol>
  
  <h3>Backend</h3>
  <ol>
    <li>
      <p>Install the required Python packages:</p>
      <pre><code>pip install -r requirements.txt</code></pre>
    </li>
    <li>
      <p>Start the FastAPI server:</p>
      <pre><code>uvicorn main:app --reload</code></pre>
    </li>
  </ol>
  
  <h2>Usage</h2>
  <ol>
    <li>Open the frontend application in your browser.</li>
    <li>Enter the name of a dish into the input field.</li>
    <li>The application will display the recipe for the specified dish.</li>
  </ol>
  
  <h2>API Documentation</h2>
  <ul>
    <li><strong>Endpoint:</strong> <code>/generate</code></li>
    <li><strong>Method:</strong> <code>POST</code></li>
    <li><strong>Request Body:</strong>
      <pre><code>{
  "dish_name": "string",
  "additional_instructions": "string"
}
</code></pre>
    </li>
    <li><strong>Response:</strong>
      <pre><code>{
  "status": "success",
  "message": "Recipe generated successfully",
  "data": {
    "recipe": {
      "name": "string",
      "ingredients": [
        {
          "name": "string",
          "amount": "string"
        }
      ],
      "steps": [
        {
          "description": "string",
          "tips": "string"
        }
      ],
      "suggested_pairings": [
        {
          "dish_name": "string",
          "description": "string"
        }
      ]
    }
  }
}
</code></pre>
    </li>
  </ul>
  
  <h2>Contributing</h2>
  <p>Contributions and feedback are welcome! If you would like to contribute to this project or have any comments, please feel free to open an issue or submit a pull request.</p>
</div>
