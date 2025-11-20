<div>
  <h1>Recipe Generator</h1>
  <h2>Project Overview</h2>
  <p>The Recipe Generator is a web application that allows users to input the name of a dish and receive its recipe. In addition to dish-name searches, users can also find recipes based on ingredients they already have at home or by uploading an image of a dish. The app combines a user-friendly frontend with a powerful backend to deliver AI-generated recipe suggestions tailored to each search method.</p>
  <p>You can explore the live site here: <a href="https://recipe-generator.rulkimi.com/recipes/search" target="_blank">Recipe Generator</a></p>
  
  <h2>Tech Stack</h2>
  <ul>
    <li>
      <p><strong>Frontend:</strong></p>
      <ul>
        <li>Next.js</li>
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
    <li>
      <p><strong>Database:</strong></p>
      <ul>
        <li>PostgreSQL</li>
      </ul>
    </li>
  </ul>
  
  <h2>Local PostgreSQL via Docker + Alembic</h2>
  <ol>
    <li>Copy <code>server/env.example</code> to <code>server/.env</code> and adjust credentials if needed. The same env file is used by Alembic.</li>
    <li>Run <code>cd server && docker compose up -d</code> to start PostgreSQL on <code>localhost:5432</code>.</li>
    <li>Apply migrations with <code>alembic upgrade head</code> (run inside the <code>server</code> directory). This creates the required tables and extensions in the container.</li>
    <li>Develop as usual. When schema changes are needed, update the SQLAlchemy models in <code>server/core/models.py</code> and generate a migration via <code>alembic revision --autogenerate -m "describe change"</code>, then run <code>alembic upgrade head</code>.</li>
    <li>Shut the database down with <code>docker compose down</code>. Append <code>-v</code> if you also want to remove the stored volume.</li>
  </ol>

  <h2>Contributing</h2>
  <p>Contributions and feedback are welcome! If you would like to contribute to this project or have any comments, please feel free to open an issue or submit a pull request.</p>
</div>
