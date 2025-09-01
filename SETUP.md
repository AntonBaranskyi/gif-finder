# Налаштування змінних середовища для Giphy API

## Крок 1: Отримання API ключа

1. Зайдіть на https://developers.giphy.com/
2. Створіть новий додаток (Create App)
3. Скопіюйте API ключ

## Крок 2: Створення файлу .env

Створіть файл `.env` в корені проекту (поруч з `package.json`):

```bash
# Giphy API Key - Get from https://developers.giphy.com/
VITE_GIPHY_API_KEY=your_actual_giphy_api_key_here

# App Configuration
VITE_APP_TITLE=GIF Finder
VITE_API_BASE_URL=https://api.giphy.com/v1

# Development settings
VITE_DEBUG_MODE=true
VITE_LOG_LEVEL=info
```

## Крок 3: Перевірка налаштувань

Запустіть тестовий файл для перевірки:

```bash
npm run dev
```

Потім відкрийте консоль браузера і перевірте, чи немає помилок.

## Крок 4: Використання в коді

```typescript
// Автоматично бере API ключ з змінних середовища
import { GiphyFactoryService } from './shared/services/giphy-factory.service'

const factory = new GiphyFactoryService()
const giphyService = factory.createGiphyService()

// Тепер можна використовувати сервіс
const results = await giphyService.searchGifs({ q: 'cat', limit: 10 })
```

## Важливі примітки:

1. **Файл .env НЕ повинен бути в git** - додайте його до `.gitignore`
2. **Тільки змінні з префіксом VITE_ доступні в браузері**
3. **Після зміни .env файлу перезапустіть dev сервер**

## Структура файлів:

```
project/
├── .env                    # Ваші змінні середовища (НЕ в git)
├── env.example            # Приклад змінних (в git)
├── src/
│   ├── shared/
│   │   ├── utils/
│   │   │   └── env.ts     # Утиліти для роботи з env
│   │   └── services/
│   │       ├── giphy.service.ts
│   │       └── giphy-factory.service.ts
│   └── test-env.ts        # Тестовий файл
```
