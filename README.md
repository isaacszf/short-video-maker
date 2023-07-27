# Short-Video-Maker

## Disclaimer
This project was done very quickly and was just for studies. The code here can be sub-optimal and bug-prone.

## Project Info

Automation to create Tiktok/Youtube videos. For now, it only makes two types of video:

- **What would you rather**
  - Need to specify the video information in the file "configs/choice.json"
  - Has some limitations
    - The text of the questions cannot be very large
    - Unable to render heavy images
- **Guess the flag**
  - Almost fully automated
    - Need to specify "level" (easy, medium or hard) in the file "configs/guess.json"
  - The name of the flags are in Portuguese

## Requirements

- An API key from [ElevenLabs](https://elevenlabs.io) (edit the file "generate/.env").
- Node
- Npx & Npm

### Running

Follow these steps:
1. Inside "vide-config.json" choose between "choice" or "guess";
   - If the video type is "**choice**", run the following command:
   ```bash
   cd generate
   npm run choices
   ```
   
   - If the video type is "**guess**", run the following command:
    ```bash
   cd generate
    npm run flags
     ```
     
2. Leave the "generate" directory and run the following command
    ```bash
   cd ..
    npx remotion render src/index.ts
    ```
   
3. It's done! The video will be in the "out" directory
