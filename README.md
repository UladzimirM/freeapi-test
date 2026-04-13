# FreeAPI Test Automation

API test automation for [FreeAPI](https://api.freeapi.app/api/v1/) e-commerce endpoints using Playwright + TypeScript.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Create .env file
echo "ENV=TEST" > .env

# Run tests
npm run test
```

## 📝 Available Commands

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests |
| `npm run lint` | Check code quality |
| `npm run format` | Format code with Prettier |
| `npm run allure-report` | Generate and open Allure report |

### Run Specific Tests

```bash
# Run by test suite name
npx playwright test --config=config/playwright.config.ts --grep "@users"

# Run specific file
npx playwright test tests/products/product.spec.ts
```

## 📁 Project Structure

```
freeapi-test/
├── config/              # Playwright config & API endpoints
├── fixtures/            # Custom test fixtures (auth, clients)
├── services/            # API service layer (BaseClient, UserService, EcommerceService)
├── model/               # Factories for test data + JSON schemas
├── tests/               # Test suites
│   ├── users/          # User API tests
│   └── products/       # Product CRUD + negative tests
├── utils/               # Helpers (schema validation, FormData conversion)
└── data/                # Test images & generated data
```

## 🧪 Test Suites

### User API (3 tests)
- Register user
- Login user
- Get user profile

### Product API (5 tests)
- Get products list
- Create product
- Get product by ID
- Update product price
- Delete product

### Negative Tests (7 tests)
- Invalid product creation scenarios
- Unauthorized access tests
- Invalid data handling

## 🏗️ How It Works

### Simple Architecture

```
Tests → Fixtures → Services → BaseClient → FreeAPI
```

### Key Components

**Fixtures** (`fixtures/apiFixture.ts`)
- `apiClient` - Unauthenticated HTTP client
- `apiClientWithToken` - Authenticated HTTP client (auto-creates user & token)
- `userService` - User operations helper

**Services** (`services/`)
- `BaseClient` - Wrapper for Playwright API requests
- `UserService` - User registration & login
- `EcommerceService` - Category & product creation

**Factories** (`model/`)
- `UserFactory.getRandomValidUser()` - Generates test user data
- `ProductFactory.getRandomValidProduct()` - Generates test product data

## 📊 Reporting

View Allure report:
```bash
npx allure generate allure-results --clean
npx allure open allure-report
```

## ⚙️ Configuration

**Environment** (`.env`):
```env
ENV=TEST
```

**API Endpoints** (`config/url.ts`):
```typescript
baseUrl: 'https://api.freeapi.app/api/v1/'
```

**Global Setup** (`config/pwGlobalSetup.ts`):
- Creates admin user before tests
- Creates default category
- Stores token & categoryId in `process.env`
