/*
 * Version: 0.1.0
 * Description: Adds staff training options.
 * 
 */
var Train = {};
(function () {
	
	/*
	 * Short Hand Variables
	 */
	var evKey = GDT.eventKeys.gameplay;
	
    Train.EventTrain = function () {
        if (Math.floor((Math.random() * 5) + 1) != 1) {
            return;
        }
        var game = CAMELOT.gC().gameLog.last;
        var staffMember = CAMELOT.gC().staff.skip(0).pickRandom();
        var staffName = staffMember.name;
        var statAmount = Math.floor((Math.random() * 15) + 3);
        var stat = Math.floor((Math.random() * 4) + 1);
        var sv = statAmount / 500;
        switch (stat) {
        case 1:
            staffMember.designFactor += sv;
            stat = "Design";
            break;
        case 2:
            staffMember.technologyFactor += sv;
            stat = "Technology";
            break;
        case 3:
            staffMember.speedFactor += sv;
            stat = "Speed";
            break;
        case 4:
            staffMember.researchFactor += sv;
            stat = "Research";
            break;
        default:
            return CAMELOT.post(new Notification("Train Event".localize(), "Trained event errored."));
        }
        var message = "Whilst working on " + game.title + " " + staffName + " improved their " + stat + " ability by " + statAmount + "!".localize().format(staffMember.name);
        CAMELOT.post(new Notification("Staff Improved!".localize(), message));
        return;
    };
    
    Train.runStartUp = function () {
    	GDT.on(evKey.afterReleaseGame, Train.EventTrain);
    };
    
})();