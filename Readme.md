# 🏩 Cardano Land Registry

A decentralized application (**dApp**) built on the **Cardano blockchain** to enable **land registration**, **ownership tracking**, and **secure transfer of property rights**.  
Developed with ❤️ by a 5-member team(AuFive).

---

## ✨ Project Structure

```
cardano-land-registry/
 ├── frontend/          # React.js application (user interface)
 ├── backend/           # Nest.js server (API layer)
 └── smart-contracts/   # Cardano smart contracts (Plutus/Aiken)
```

---

## ⚡ Tech Stack

| Part | Technology |
|:-----|:-----------|
| Frontend | React.js + TailwindCSS + @meshsdk/core |
| Backend | Nest.js + Cardano Serialization Lib / Blockfrost |
| Smart Contracts | Plutus / Aiken (Cardano Smart Contracts) |
| Hosting | Vercel / Netlify (Frontend), Render / AWS (Backend) |
| Blockchain | Cardano Testnet ➔ Cardano Mainnet |

---

## 🚀 Features

- 🌐 Connect Cardano wallets (Nami, Eternl, etc.)
- 🏡 Register new lands securely
- 📜 View your registered lands
- 🔁 Transfer land ownership to other users
- 📈 Full blockchain-based record keeping
- 🔒 Secure, decentralized, and transparent

---

## 🛠️ How to Run Locally

### 1. Clone the Repository
```bash
git clone https://github.com/<your-org-or-username>/cardano-land-registry.git
cd cardano-land-registry
```

---

### 2. Frontend Setup (React.js)

```bash
cd frontend
npm install
npm run dev
```
> Visit `http://localhost:3000`

---

### 3. Backend Setup (Nest.js)

```bash
cd backend
npm install
npm run start:dev
```
> Backend runs on `http://localhost:5000` (configurable)

---

### 4. Smart Contracts Setup
- Navigate to `smart-contracts/`
- Install Aiken or use Plutus tools
- Compile and deploy contracts to **Cardano Testnet**
- Update deployed contract addresses in backend config

---

## 🧹 Folder Details

| Folder | Description |
|:-------|:------------|
| `frontend/` | Frontend web app (wallet connect, register, view, transfer UI) |
| `backend/` | API server (land registration API, blockchain interaction) |
| `smart-contracts/` | Plutus/Aiken smart contracts for land registry logic |

---

## 👥 Team Members

| Role | Name |
|:-----|:-----|
| Frontend Developer | [Your Name] |
| Backend Developer | [Your Name] |
| Smart Contract Developer | [Your Name] |

---

## 📜 Contribution Guidelines

- Create a new branch for each feature: `feature/<your-feature-name>`
- Pull Request (PR) to `develop` branch
- At least 1 review required before merging
- Follow coding standards and write clear commit messages

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## ✨ Future Enhancements (Coming Soon)

- 😂 Land verification by government authorities
- 🗘️ Land location with GPS mapping
- 📊 Dashboard analytics for land ownership trends
- 📱 Mobile app version

---

# 🚀 Let's build the future of Land Registration on Blockchain!
