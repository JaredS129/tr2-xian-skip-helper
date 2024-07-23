const { GlobalKeyboardListener } = require("node-global-key-listener");

(async () => {
    try {
        const globalKeyListener = new GlobalKeyboardListener();
        let sequenceIsRunning = false;

        const helperInstructions = [
            {
                currentAction: 'UP + ACTION',
                nextAction: 'DOWN + WALK',
                duration: 24000
            },
            {
                currentAction: 'DOWN + WALK',
                nextAction: 'UP + ACTION',
                duration: 36000
            },
            {
                currentAction: 'UP + ACTION',
                nextAction: 'DOWN + WALK',
                duration: 24000
            },
            {
                currentAction: 'DOWN + WALK',
                nextAction: 'UP + ACTION',
                duration: 30000
            },
            {
                currentAction: 'UP + ACTION',
                nextAction: 'BACK + WALK',
                duration: 24000
            },
            {
                currentAction: 'BACK + WALK',
                nextAction: 'ROLL + UP/LEFT',
                duration: 3000
            },
            {
                currentAction: 'ROLL + UP/LEFT',
                nextAction: null,
                duration: 0
            }
        ]

        const welcomePrompt = () => {
            console.log('Xian Skip Helper is running! Press "/" to begin the timing sequence.');
        }

        const helperSequence = async () => {
            sequenceIsRunning = true;
            console.clear();

            const countdown = async (currentAction, nextAction, duration, iteration) => {
                process.stdout.write(`(${iteration+1}/${helperInstructions.length}) ${currentAction}\n`);
                let startTime = Date.now();
                let remaining = duration;

                while (remaining > 0) {
                    await new Promise(resolve => setTimeout(resolve, remaining > 1000 ? 1000 : remaining));
                    let elapsed = Date.now() - startTime;
                    remaining = duration - elapsed;

                    let minutes = Math.floor(remaining / 60000);
                    let seconds = ((remaining % 60000) / 1000).toFixed(0);

                    process.stdout.clearLine(-1);
                    process.stdout.write(`\r${nextAction} in ${minutes}:${seconds.padStart(2, '0')}`);
                }
                process.stdout.clearLine(-1);
                process.stdout.write('\r');
            }

            for (let i = 0; i < helperInstructions.length; i++) {
                const { currentAction, nextAction, duration } = helperInstructions[i];
                await countdown(currentAction, nextAction, duration, i);
            }

            console.log("GL Tombin'!");
            sequenceIsRunning = false;
            welcomePrompt();
        }

        await globalKeyListener.addListener(function (e) {
            if (e.name === "FORWARD SLASH" && !sequenceIsRunning) {
                helperSequence();
            }
        });

        welcomePrompt();

    } catch (err) {
        console.error(err);
    }
})();