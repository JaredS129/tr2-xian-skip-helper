# tr2-xian-skip-helper

A command-line tool to help practice the Temple of Xian skip in Tomb Raider 2 (PS1)

## Prerequisites

1. **Node.js**
   - Download and install the latest version of node.js from [here](https://nodejs.org/en/download/).
2. **LiveSplit**
   - This tool integrates directly with LiveSplit, so you will need to have LiveSplit installed on your computer. You can download it from [here](https://livesplit.org/downloads/).
3. **LiveSplit Server**
   - You will need to have the LiveSplit Server component installed in LiveSplit. Download the zip [here](https://github.com/LiveSplit/LiveSplit.Server/releases).
   - Place the contents of the downloaded zip into the "LiveSplit\Components" directory.
   - Add the LiveSplit Server component to your LiveSplit Layout (Edit Layout -> + -> Control -> LiveSplit Server).

## Usage

1. Download or clone this repository to your computer.
2. Open a terminal (CMD or PowerShell) and navigate to the directory where you downloaded or cloned this repository.
   ```bash
   cd path\to\tr2-xian-skip-helper
   ```
3. Run the following command to install the dependencies (you only need to do this the first time you use the tool):
   ```bash
   npm install
   ```
4. Make sure LiveSplit is running on your computer.
5. Start the LiveSplit Server in LiveSplit (Control -> Start Server)
6. Run the following command in your terminal (CMD or PowerShell) to start the tool:
   ```bash
   npm start
   ```
7. If everything is set up correctly, you should see the following message in your terminal:

   ```
   LiveSplit connected successfully!

    Xian Skip Helper is running! Press "/" to calculate the timing sequence.
   ```

8. Once you press the "/" key, the tool will calculate the timing sequence for the Temple of Xian based on your current LiveSplit time. And you should see an output similar to below:

   ```
    ---------XIAN SKIP SEQUENCE---------

    UP + ACTION:     0:0
    DOWN + WALK:     0:24
    UP + ACTION:     1:0
    DOWN + WALK:     1:24
    UP + ACTION:     1:54
    BACK + WALK:     2:18
    ROLL + UP/LEFT:  2:21

    -----------------------------------
   ```
