<div>
  <h1>Recipe Generator</h1>
  <h2>Project Overview</h2>
  <p>The Recipe Generator is a web application that allows users to input the name of a dish and get the recipe for that dish. It combines a user-friendly frontend with a backend to provide recipe information using AI-generated responses.</p>
  <p>You can explore the live site here: <a href="https://rulkimi.github.io/recipe-generator/" target="_blank">Recipe Generator</a></p>
  
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
    <li>Open the frontend website in your browser.</li>
    <li>Enter the name of a dish into the input field.</li>
    <li>The website will display the recipe for the specified dish.</li>
  </ol>
  
<h2>API Documentation</h2>
<ul>
  <li><strong>Endpoint:</strong> <code>/generate</code></li>
  <li><strong>Method:</strong> <code>POST</code></li>
  <li><strong>Request Body:</strong>
    <pre><code>{
  "question": "string",
  "additional_instructions": "string",
  "dietary_restrictions": ["string"],
  "language": "string"
}</code></pre>
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
}</code></pre>
  </li>
</ul>

<h3>Generate Recipe by Ingredients</h3>
<ul>
  <li><strong>Endpoint:</strong> <code>/generate_by_ingredients</code></li>
  <li><strong>Method:</strong> <code>POST</code></li>
  <li><strong>Request Body:</strong>
    <pre><code>{
  "ingredients": ["string"],
  "additional_instructions": "string",
  "dietary_restrictions": ["string"],
  "language": "string"
}</code></pre>
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
}</code></pre>
  </li>
</ul>

<h3>Upload Image for Recipe</h3>
<ul>
  <li><strong>Endpoint:</strong> <code>/upload_image</code></li>
  <li><strong>Method:</strong> <code>POST</code></li>
  <li><strong>Request Body:</strong>
    <pre><code>FormData: {
  "file": File,
  "additional_instructions": "string",
  "dietary_restrictions": ["string"],
  "language": "string"
}</code></pre>
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
}</code></pre>
  </li>
</ul>

<h3>Root</h3>
<ul>
  <li><strong>Endpoint:</strong> <code>/</code></li>
  <li><strong>Method:</strong> <code>GET</code></li>
  <li><strong>Response:</strong>
    <pre><code>{
  "message": "Welcome to Recipe Generator"
}</code></pre>
  </li>
</ul>

  
  <h2>Contributing</h2>
  <p>Contributions and feedback are welcome! If you would like to contribute to this project or have any comments, please feel free to open an issue or submit a pull request.</p>
</div>
