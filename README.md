## 🧪 Sauce Demo - Playwright Test Automation Framework

A comprehensive test automation framework built with Playwright and TypeScript for testing the Sauce Demo e-commerce website.

## 🚀 Features

- **Page Object Model (POM)** - Maintainable and scalable test architecture
- **TypeScript** - Type-safe test code
- **UI & API Testing** - Complete test coverage
- **Responsive Testing** - Mobile and desktop viewport testing
- **Allure Reports** - Beautiful, detailed test reports
- **Environment Configuration** - Secure credential management with `.env`
- **CI/CD Ready** - Configured for continuous integration

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **npm** (comes with Node.js)

## 🛠️ Installation

1. **Clone the repository:**

```bash
   git clone https://github.com/daryyashvets-sw/shopify.git
   cd <project-folder>
```

2. **Install dependencies:**

```bash
   npm install
```

3. **Install Playwright browsers:**

```bash
   npx playwright install
```

4. **Set up environment variables:**

```bash
   cp .env.example .env
```

Edit `.env` and add your credentials:
SAUCE_PASSWORD=your_password_here

## 🏃 Running Tests

### Run all tests:

```bash
npm test
```

### Run UI tests only:

```bash
npm run test:ui
```

### Run API tests only:

```bash
npm run test:api
```

### Run tests in UI mode (interactive):

```bash
npm run test:ui-mode
```

### Run tests in debug mode:

```bash
npm run test:debug
```

### Run tests in headed mode (see browser):

```bash
npx playwright test --headed
```

## 📊 Test Reports

### View HTML report:

```bash
npx playwright show-report
```

### Generate Allure report:

```bash
npm run allure:serve
```

## 🧪 Test Coverage

### UI Tests

- **Product Listing** - Homepage loading and product display
- **Navigation** - Main menu navigation (Catalog, Blog, About Us)
- **Product Search** - Valid/invalid search scenarios
- **User Signup** - Registration and duplicate email validation
- **User Login** - Authentication and error handling
- **Cart & Checkout** - Add to cart, checkout flow, quantity updates
- **Social Media Links** - Validation of external links
- **Responsive Design** - Mobile and desktop layouts
- **Purchase Flow** - Sold-out product handling

### Environment Variables

Sensitive data stored securely:

```typescript
password: process.env.SAUCE_PASSWORD;
```

## ⚙️ Configuration

### Playwright Config (`playwright.config.ts`)

- **Base URL**: https://sauce-demo.myshopify.com
- **Timeout**: 60 seconds
- **Retries**: 2 on CI, 0 locally
- **Parallel execution**: Enabled
- **Reporters**: HTML, Allure
- **Browsers**: Chromium (default)

### Test Data ('fixtures' folder')

- User credentials
- Test data objects
- Social media links

## 🔐 Security

- **Environment variables** for sensitive data
- **`.env` excluded** from version control
- **No hardcoded credentials** in test files

## 🚨 Known Limitations

- Some tests are skipped due to CAPTCHA on signup/login flows
- Full payment flow cannot be automated (requires real card details)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests to ensure they pass
5. Submit a pull request

## 📄 License

ISC

## 👤 Author

**Daria Shvets**

## 🔗 Links

- [Sauce Demo Website](https://sauce-demo.myshopify.com)
- [Playwright Documentation](https://playwright.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)
