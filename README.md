# Image Processing API

## Description

This project intends to provide API that allows you to place images into your frontend with the size set via URL parameters if you set the size. It reduced page load size rather than needing to resize and upload multiple copies of the same image. The API will handle resizing and serving stored images for you.

This project doesn’t need database, we will store all the images in the file storage.

## Requirement

Here is a requirement that you need to start the project.

### 1. Install Dependencies

Let's start with installing all of the dependencies. Execute the following command from the root folder.

```console
$ npm install
```

Please confirm Typescript, Prettier, Eslint, Jasmine, Supertest, Nodemon、Express and Sharp are successfully installed.

### 2. Test & Build

```console
$ npm run test
```

Run test to build the typeScript code into JavaScript code and Jasmine will test the code if there is any error. It will be saved in the build folder.

### 3. Start the Server

```console
$ npm run start
```

Run Start to start the server running on port 3000. During the server is running, it will be accessible at http://localhost:3000.

### 4. Explore the Endpoints

There are multiple endpoints you can explore.

- List (http://localhost:3000/images/list):
  To get an array of the image name before trying image resizing.

- Resize (http://localhost:3000/images/resize?filename=fjord&width=150&height=150): To get the resized image based on the parameters.

- Check main page (http://localhost:3000/): To check the homepage for image handling is working.
