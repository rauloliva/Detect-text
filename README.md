# Text Detector App
## Overview
This file will help you to understand the purpose and usage of this tool.

The Text Detector App was part of the **Inclusive Language project** at **NXP Semiconductors**, and its purpose was to detect every word found in every image published in Team Site, in those detected words, found the marked words that were selected to be in the scope (master, slave, blacklist, etc).

This task was completed thanks to the Optica Character Recognition (OCR) tool from the [Google Cloud Documentation](https://cloud.google.com/vision/docs/ocr "Google Cloud docs").

Basically the text detector app helps sending the images to the OCR API and interpreting the received data.

Unfortunately not all the images were processed, because The OCR only supports these file formats: [OCR Supported formats](https://cloud.google.com/vision/docs/supported-files "OCR Supported formats").

The text detector app was built with ExpressJS.

## Installation & Execution

Please follow these steps to configure your environment.

1. Download and install [NodeJS](https://nodejs.org/en/download/ "Download NodeJS")
2. To make sure you have installed NodeJS correctly type the following in the Command Line (CMD): `node -v` and you should see the version of your NodeJS.
3. In the same terminal window go the **TextDector** root folder
4. Type the following command: `npm install` This will install the dependencies.

Now you are ready to execute the app.

### Execute in Windows

1. Open the folder **TextDetector** and right click in the file **_setup.ps1_**.
2. In the options select **_Run with PowerShell_**.
3. Wait until you see a blue screen with a text that says **_Server started at port: 3000_**.
4. Open your browser and go to this link: **http://localhost:3000**

### Execute in MacOS & Linux
1. Open the terminal and paste the following line: `export GOOGLE_APPLICATION_CREDENTIALS="credentials.json"`
2. Navigate to the root folder in the same window of the terminal.
3. Execute the following command: `node server.js`
3. Wait until you see a text that says **_Server started at port: 3000_**.
4. Open your browser and go to this link: **http://localhost:3000**

## UI Components

![Main Options image](https://github.com/rauloliva/Detect-text/blob/master/img/UIComponent.jpg?raw=true)

The app will generate a new JSON file called **_ocr_report.json_** if the **Rewrite JSON** option is selected otherwise this will use the same file but will append the new data.

The load last report will convert the data from the **_ocr_report.json_** file into a table to see in a more readable manner.

**IMPORTANT:**

First of all you be aware of the [OCR Pricing Details](https://cloud.google.com/vision/pricing "Google Cloud pricing details") 

Then download the credentials.json file from the google developer console so the tool can work.