
# ETALON ARCHITECTURE

src/
 ├─ main.js              → entry
 ├─ bootstrap/
 │    └─ bootstrap.js    → ініціалізація + DI
 ├─ view/
 │    └─ AppView.js      → тільки UI
 ├─ logic/
 │    └─ boardStore.js   → тільки логіка
 └─ style.css

Run:
npm install
npm run dev
