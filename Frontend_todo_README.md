# Frontend_todo

## Todo List Frontend

This is the frontend of the Todo List App, built using **Next.js**, **Tailwind CSS**, and **TypeScript**.

### Prerequisites
Make sure you have the following installed on your machine:
- **Node.js** (v16 or later)
- **npm** or **yarn**

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/Frontend_todo.git
   cd Frontend_todo
   ```
2. Install dependencies:
   ```sh
   npm install  
   # or
   yarn install
   ```
3. Install Tailwind CSS::
   ```sh
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

### Running the Development Server
To start the frontend development server, run:
```sh
npm run dev  
# or
yarn dev
```
Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Project Structure
```
Frontend_todo/
├── app/
         ├── addTask/            # AddTask pages
               ├── page.tsx
         ├── editTask/           # EditTask pages
               ├── [id]          # Particular Id
                     ├── page.tsx
         ├── page.tsx            # Next.js page
         ├── layout.tsx          # Next.js layout
         ├── golbals.css         # Global styles
├── components/       # Reusable components
         ├── Forms.tsx
         ├── Header.tsx
         ├── TaskCard.tsx 
├── utils/            # Helper functions
├── public/           # Static assets
└── next.config.js    # Next.js configuration
```

### API Integration
This frontend connects to a backend API built with Express.js and Prisma. Ensure the backend is running on `http://localhost:8080` before testing API calls.

### Building for Production
To generate a production build, run:
```sh
npm run build  
# or
yarn build
```
To start the production server:
```sh
npm start  
# or
yarn start
```




