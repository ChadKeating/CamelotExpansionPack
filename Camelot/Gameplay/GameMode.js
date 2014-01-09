/*
 * Version: 0.1.0
 * Description: Additional game modes
 * 
 */
var GameMode = {};
(function () {

    GameMode.addGameModeSelector = function () {
        var draw = "";
        draw += '<div id="gameMode" class="centeredButtonWrapper">';
        draw += '<h2>Game Mode</h2>';
        draw += '</ br>';
        draw += '<select id="gmSelect" style="max-width: 250px">';
        draw += '<option value="normal" selected="selected">Normal</option>';
        draw += '<option value="oneman">One Man Machine</option>';
        draw += '</select>';
        draw += '<p>One Man Machine: Never leave the garage. How long can you keep up with everyone else.</p>';
        draw += '</div>';
        var findMe = document.getElementById("newGameView").getElementsByClassName("featureSelectionPanel featureSelectionPanelHiddenState")[0];
        findMe.innerHTML += draw;
    };

    GameMode.setGameMode = function () {
        var keepMe = UI.closeNewGameView;
        var inputMe = function () {
            var findMe = document.getElementById("gmSelect").value;
            switch (findMe) {
                case "oneman":
                    DecisionNotifications.moveToLevel2.trigger = null;
                    break;
                case "sandbox":


                    break;
                case "normal":
                    break;
                default:
                    console.log("Gamemode");
                    break;
            }
        };

        UI.closeNewGameView = function () {
            keepMe();
            inputMe();
        };
    };


    function moveToLevel4() {

        if (GameManager.company.gameLog.length == 0) {
            GameManager.company.notifications.push(new Notification("CheatMod", "To continue to the final level, you need to have at least created game 1 game"));
            return
        }

        if (GameManager.company.currentLevel != 4) {

            //add at least 1 staff member & at least 1 game
            if (GameManager.company.staff.length < 2) {
                GameManager.company.maxStaff = 7;
                //addDreamTeam();
                var character = new Character({
                    id: GameManager.getGUID(), name: "Cheater1", dF: 2,
                    tF: 2, speedF: 2, qualityF: 1, experience: 10000,
                    researchF: 2, salary: 1, efficiency: 1,
                    slot: 2, sex: 1
                });

                GameManager.setBodyAndHead(character);
                character.flags.hiredTimestamp = GameManager.gameTime;
                character.flags.nextVacation = GameManager.gameTime + 48E3 * GameManager.SECONDS_PER_WEEK;
                character.flags.workload = 0;
                GameManager.company.staff.push(character);
                GameManager.uiSettings.findStaffData = null;
                VisualsManager.reloadAllCharacters();
                GameManager.company.staff[GameManager.company.staff.length - 1].startAnimations();
                VisualsManager.addComputer(character);
                VisualsManager.refreshHiringButtons();
                VisualsManager.refreshTrainingOverlays();
            }
            GameManager.company.currentLevel = 4,
			VisualsManager.nextLevel();
            Media.createLevel4Notifications();
            GameManager.save(GameManager.company.slot + "L4");
            GameManager.resume(true);
        }
        unlockRnDLab();
        unlockHwLab();
    }

    function unlockHwLab() {
            GameManager.company.flags.hwLabUnlocked = true;
            //GameManager.company.flags.hwBudget = 0;
            GameManager.company.flags.fractionalHwLabCosts = 0;
    }

    function unlockRnDLab() {
            GameManager.company.flags.rndLabUnlocked = true;
            //GameManager.company.flags.rndBudget = 0;
            //GameManager.company.flags.fractionalRndLabCosts = 0;
    }






    GameMode.runStartUp = function (){
        GameMode.addGameModeSelector();
        GameMode.setGameMode();

    };

})();