# Alfou Webapp

This project is an advertisement website and an email service for **Alfou-sécurité**, a security and cleaning service business based in Casablanca, Morocco.

The `src` folder contains the actual webapp, while the `functions` folder contains the backend cloud functions and the the `designs` folder contains the photoshop projects for the company's logo, flyer, cover and business card.

### Development server (angular cli)

- First clone the repo: `git clone git@github.com:salah3x/alfou-webapp.git` 
- Install dependencies for the web app (assuming `node`, `npm` and `ng` are already installed): `cd alfou-webapp && npm install`
- Install dependencies for the backend project `cd functions && npm install`
- Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Development server (firebase cli)

- Serve the hosting plan (content of dist/alfou-webapp) locally: `firebase serve --only hosting`
- Serve the cloud functions in a local server: `firebase serve --only functions[:function_name]`

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/alfou-webapp` directory. Use the `--prod` flag for a production build.

### Deployment

- First in the `functions` folder, add a `secret.json` file that contains the folowing : 
```
{
    "API_KEY": "[YOUR_SENDGRID_API_KEY]"
}
```
- Install firebase tools: `npm install -g firebase-tools`
- Authenticate the cli and access Firebase projects: `firebase login`
- Initialize your site (choose the dist/alfou-webapp folder): `firebase init`
- Deploy the site and the backend functions to Firebase: `firebase deploy [--only hosting | functions]`
(This will build the project first and do some linting)
- Visit [https://alfou.net/](https://alfou.net/)

**********

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.4.
