import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Раздаем статику из папки dist/client
app.use(express.static(path.join(__dirname, 'dist/client')));

// Все запросы направляем на index.html для работы SPA-роутера
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist/client', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
