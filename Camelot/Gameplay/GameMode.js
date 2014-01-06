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



})();