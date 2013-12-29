/*
 * Version: 0.1.0
 * Description: Collection of core functions for the modules in the camelot expansion.
 *
 */
var StartingMoney = {};
(function () {

    StartingMoney.addMoneyOption = function () {
        var draw = "";
        draw += '<div id="startingMoney" class="centeredButtonWrapper">';
        draw += '<h2>Starting Money</h2>';
        draw += '</ br>';
        draw += '<select id="moneySelect" style="max-width: 250px">';
        draw += '<option value="0">40k.</option>';
        draw += '<option value="1" selected>70k.*</option>';
        draw += '<option value="2">100k.</option>';
        draw += '<option value="3">250k.</option>';
        draw += '<option value="4">500k.</option>';
        draw += '<option value="5">1M.</option>';
        draw += '<option value="6">10M.</option>';
        draw += '<option value="7">100M.</option>';
        draw += '</select>';
        draw += '<p>*Default amount of money</p>';
        draw += '</div>';
        var findMe = document.getElementById("newGameView").getElementsByClassName("featureSelectionPanel featureSelectionPanelHiddenState")[0];
        findMe.innerHTML += draw;
    };
    StartingMoney.setMoney = function () {
        var keepMe = UI.closeNewGameView;
        var inputMe = function () {
            if (CAMELOT.store().moneySet !== true){
            var findMe = document.getElementById("moneySelect").value;
                CAMELOT.gC().flags.lastMoveUpLevelQ = true;
            switch(findMe){
                case "0":
                    CAMELOT.gC().cash = 4E4;
                    console.log("setMoney 0");
                    break;
                case "1":
                    //c = 7E4;
                    console.log("setMoney 1");
                    break;
                case "2":
                    CAMELOT.gC().cash = 1E5;
                    console.log("setMoney 2");
                    break;
                case "3":
                    CAMELOT.gC().cash = 25E4;
                    console.log("setMoney 3");
                    break;
                case "4":
                    CAMELOT.gC().cash = 5E5;
                    console.log("setMoney 4");
                    break;
                case "5":
                    CAMELOT.gC().cash = 1E6;
                    console.log("setMoney 5");
                    break;
                case "6":
                    CAMELOT.gC().cash = 1E7;
                    console.log("setMoney 6");
                    break;
                case "7":
                    CAMELOT.gC().cash = 1E8;
                    console.log("setMoney 7");
                    break;
                default:
                    console.log("setMoney Error");
                    break;
            }CAMELOT.store().moneySet = true;
            };
        };

        UI.closeNewGameView = function () {
            keepMe();
            inputMe();
            CAMELOT.store().sNOc = 0
        };

    };

    StartingMoney.stopNewOffice = function (){
        if (CAMELOT.store().sNOc !== 1){ CAMELOT.store().sNOc += 1; return;}
        if (CAMELOT.store().NOrunonce !== true){
        CAMELOT.gC().flags.lastMoveUpLevelQ = false;
        CAMELOT.store().NOrunonce = true;
        }
        GDT.off(GDT.eventKeys.gameplay.weekProceeded,StartingMoney.stopNewOffice);
    };

    StartingMoney.runStartUp = function () {
        StartingMoney.addMoneyOption();
        StartingMoney.setMoney();
        GDT.on(GDT.eventKeys.gameplay.weekProceeded,StartingMoney.stopNewOffice);
    };

})();