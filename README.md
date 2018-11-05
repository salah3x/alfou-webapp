# Alfou Webapp

This project is an advertisement website for **Alfou-Security** and an email application to answer customers' questions.

### Development server (angular cli)

- First clone the repo: `git clone git@github.com:salah3x/alfou-webapp.git` 
- Install dependencies (assuming `node`, `npm` and `ng` are already installed): `cd alfou-webapp && npm install`
- Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Development server (firebase cli)

- Serve the hosting plan (content of dist/alfou-webapp) locally: `firebase serve --only hosting`
- Serve the cloud functions in a local server: `firebase serve --only functions[:function_name]`

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Deployment

- First install firebase tools: `npm install -g firebase-tools`
- Access your Firebase projects: `firebase login`
- Initialize your site (choose the dist/alfou-webapp folder): `firebase init`
- Deploy your site: `firebase deploy [--only hosting | functions]`
(This will build your project an deploy it plus deploying the cloud functions)
- Visit [alfou-5b922.firebaseapp.com](http://alfou-5b922.firebaseapp.com/)

#

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.4.
