# Lead Compass Score
DEMO- https://lead-compass-score.vercel.app/
**Lead Compass Score** is a web-based application that helps sales and marketing teams analyze the quality of leads based on key input criteria. The system uses a scoring algorithm to rank leads, enabling businesses to prioritize high-quality prospects and enhance conversion rates.

## 🚀 Features

- ✅ Lead scoring based on industry, job title, company size, and other key inputs  
- 📊 Visual representation of lead score  
- 💼 Designed for marketing and sales professionals  
- 🧠 Simple, intuitive UI for quick interaction  
- 🔧 Easily extendable for additional lead parameters  

## 🖥️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** Node.js, Express.js  
- **Database:** None (static scoring logic)  
- **Deployment:** Localhost (can be deployed on platforms like Vercel, Netlify, or Render)  

## 📂 Project Structure

```
lead-compass-score/
│
├── public/               # Static assets (CSS, JS)
│   ├── css/
│   └── js/
│
├── views/                # HTML templates
│   └── index.html
│
├── app.js                # Express server
├── package.json
└── README.md
```

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/araj7491/lead-compass-score.git
   cd lead-compass-score
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the server**
   ```bash
   node app.js
   ```

4. **Visit the app**
   Open your browser and go to `http://localhost:3000`

## 🧮 How Lead Scoring Works

The score is calculated using a predefined formula, considering:
- **Industry relevance**
- **Job title impact**
- **Company size**
- **Lead source**

You can modify the scoring logic in `app.js` to suit your business requirements.

## 📸 Screenshots

> Add a screenshot or GIF here showing the application interface and how lead scoring is displayed.

## 🛠️ Future Improvements

- Add database support for persistent lead data  
- User authentication for saved sessions  
- Advanced analytics and export to CSV  
- Mobile-responsive UI  

## 🙌 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the [MIT License](LICENSE).
