const {GlobalKeyboardListener} = require("node-global-key-listener");
const LiveSplitClient = require('livesplit-client');
const defaultHelperInstructions = require('./defaultHelperInstructions.json');
const getTotalSeconds = require('./utils/getTotalSeconds');
const getTimeFromSeconds = require('./utils/getTimeFromSeconds');

(async () => {
    const globalKeyListener = new GlobalKeyboardListener();

    let liveSplit;

    const actionTimeDefaults = [
        '0:00',
        '0:24',
        '1:00',
        '1:24',
        '1:54',
        '2:18',
        '2:21'
    ]

    let helperInstructions = defaultHelperInstructions;

    const resetActionTimes = () => {
        helperInstructions = helperInstructions.map((instruction, index) => {
            instruction.time = actionTimeDefaults[index];
            return instruction;
        });
    }

    const welcomePrompt = () => {
        console.log('Xian Skip Helper is running! Press "/" to calculate the timing sequence.');
    }

    const calculateActionTimes = async () => {
        const currentTime = await liveSplit.getCurrentTime();
        let totalSeconds = getTotalSeconds(currentTime);
        resetActionTimes();

        for (let i = 0; i < helperInstructions.length; i++) {
            let {time} = helperInstructions[i];
            const timeInSeconds = getTotalSeconds(time);
            const newTimeInSeconds = timeInSeconds + totalSeconds;
            helperInstructions[i].time = getTimeFromSeconds(newTimeInSeconds);

            // totalSeconds = totalSeconds + (duration / 1000);
        }
    }

    await globalKeyListener.addListener(function (e) {

        if (e.name === "FORWARD SLASH") {
            liveSplit && calculateActionTimes();
            console.clear();
            console.log(`---------XIAN SKIP SEQUENCE---------\n
${helperInstructions[0].currentAction}:     ${helperInstructions[0].time}
${helperInstructions[1].currentAction}:     ${helperInstructions[1].time}
${helperInstructions[2].currentAction}:     ${helperInstructions[2].time}
${helperInstructions[3].currentAction}:     ${helperInstructions[3].time}
${helperInstructions[4].currentAction}:     ${helperInstructions[4].time}
${helperInstructions[5].currentAction}:     ${helperInstructions[5].time}
${helperInstructions[6].currentAction}:  ${helperInstructions[6].time}
\n-----------------------------------`);
            console.log("\nGL Tombin'!");
            console.log('Press "/" to recalculate.');
            // helperSequence();
        }
    });

    const getLiveSplit = async () => {
        try {
            // Initialize client with LiveSplit Server's IP:PORT
            const client = new LiveSplitClient('127.0.0.1:16834');

            await client.connect();

            return client;

        } catch (err) {
            console.log('LiveSplit connection failed. Please make sure LiveSplit Server is running and try again.\n');
            return null;
        }
    }

    liveSplit = await getLiveSplit();

    if (liveSplit) {
        console.log('LiveSplit connected successfully!\n');
    } else {
        console.log('LiveSplit connection failed. Please make sure LiveSplit Server is running and try again.\n');
    }

    welcomePrompt();
})();