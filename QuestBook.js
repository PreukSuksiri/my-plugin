//=============================================================================
// QuestBook.js (Ver1.0.1)
//=============================================================================
// 2020.Sep.17 Ver1.0.0  First Release
// 2020.Sep.19 Ver1.0.1  Start Quest / End Quest Added

/*:
 * @target MZ
 * @plugindesc Allow showing quests as choice menu.
 * @author Preuk Suksiri
 *
 * @help QuestBook.js
 *
 * This plugin allow you to make a quest book that show progress of quests.
 *
 * !IMPORTANT! You need to call "RegisterQuest" plugin command at the start of the game. 
 * When you want to open quest book, you call "ShowAllQuest" or "ShowCompletedQuest" or "ShowUnfinishedQuest" plugin command.
 * When you want to check if the "WolfHunt" quest is completed, you use "Conditional Branch" command to check for script $gameSystem.allQuest["WolfHunt"]["Status"] == "Complete"
  * When you want to check if the "WolfHunt" quest is already started, you use "Conditional Branch" command to check for script $gameSystem.allQuest["WolfHunt"]["Status"] != ""
 * 
 *
 * @command RegisterQuest
 * @text RegisterQuest
 * @desc Let the system recognize your quest. Also bind common event when you clicked on the quest menu
 *
 * @arg questName
 * @type string
 * @default 
 * @text Quest Name
 * @desc Your quest name (Thai Language Supported)
 *
 * @arg commonEventBind
 * @type common_event
 * @default 1
 * @text Common Event
 * @desc Common event to call when player clicked this quest on quest book
 *================================================
 * @command ShowAllQuest
 * @text ShowAllQuest
 * @desc Show all quests
  *================================================
 * @command ShowCompletedQuest
 * @text ShowCompletedQuest
 * @desc Show completed quests
  *================================================
 * @command ShowUnfinishedQuest
 * @text ShowUnfinishedQuest
 * @desc Show unfinished quest
   *================================================
  * @command StartQuest
 * @text StartQuest
 * @desc Start a quest
 *
 * @arg questName
 * @type string
 * @default 
 * @text Quest Name
 * @desc Your quest name (Thai Language Supported)
 *================================================
  * @command FinishQuest
 * @text FinishQuest
 * @desc Finish a quest
 *
 * @arg questName
 * @type string
 * @default 
 * @text Quest Name
 * @desc Your quest name (Thai Language Supported)
 */

(() => {

	var fnCreateObject = DataManager.createGameObjects;
	
	DataManager.createGameObjects = function(){
		fnCreateObject();
		fnAddtional();
	}

	var fnAddtional = function(){
		
		 const pluginName = 'QuestBook';

		PluginManager.registerCommand(pluginName, "RegisterQuest", args => {
			const questName = args.questName;
			const commonEventBind = Number(args.commonEventBind);
			
			
			if ("resultChoice" in $gameTemp == false)
			{
				$gameTemp.resultChoice = "";
				
			}

			if ("allQuest" in $gameSystem == false)
			{
				$gameSystem.allQuest = {};
				$gameSystem.allQuest[questName] = {};
				$gameSystem.allQuest[questName]["CommonEvent"] = commonEventBind;
				$gameSystem.allQuest[questName]["Status"] = "";
				
			}

		});
		
		
		
		PluginManager.registerCommand(pluginName, "ShowAllQuest", args => {
			iconComplete = '\\i[89]';
			choices = []; params = []; 
			$gameMessage.setChoices(choices, 0);
			for (var q in $gameSystem.allQuest)
			{
			 if($gameSystem.allQuest[q]["Status"] == "Complete")
			 {
			  choices.push(iconComplete+q);
			 }
			 else if($gameSystem.allQuest[q]["Status"] == "Unfinished")
			 {
			  choices.push(q);
			 }
			}
			$gameMessage._choiceCancelType = -1;
			params.push()
			$gameMessage.setChoiceCallback(function(responseIndex) {
			if (responseIndex >= 0) {$gameTemp.resultChoice = $gameMessage._choices[responseIndex]; } 
			for (var q in $gameSystem.allQuest)
			{
			 if($gameTemp.resultChoice.indexOf(q) >= 0)
			 {
			  $gameTemp.reserveCommonEvent($gameSystem.allQuest[q]["CommonEvent"]);

			 }
			}
			});
			
		});
		

		
		PluginManager.registerCommand(pluginName, "ShowCompletedQuest", args => {
			iconComplete = '\\i[89]';
			choices = []; params = []; 
			$gameMessage.setChoices(choices, 0) 

			for (var q in $gameSystem.allQuest)
			{
			 if($gameSystem.allQuest[q]["Status"] == "Complete")
			 {
			  choices.push(iconComplete+q);
			 }
			 
			}
			params.push()
			$gameMessage.setChoiceCallback(function(responseIndex) {
			if (responseIndex >= 0) {$gameTemp.resultChoice = $gameMessage._choices[responseIndex]; } 
			for (var q in $gameSystem.allQuest)
			{
			 if($gameTemp.resultChoice.indexOf(q) >= 0)
			 {
			  $gameTemp.reserveCommonEvent($gameSystem.allQuest[q]["CommonEvent"]);

			 }
			}
			});
			
		});
		
		
		
		PluginManager.registerCommand(pluginName, "ShowUnfinishedQuest", args => {
			iconComplete = '\\i[89]';
			choices = []; params = []; 
			$gameMessage.setChoices(choices, 0) 

			for (var q in $gameSystem.allQuest)
			{
			 if($gameSystem.allQuest[q]["Status"] == "Unfinished")
			 {
			  choices.push(q);
			 }
			 
			}
			params.push()
			$gameMessage.setChoiceCallback(function(responseIndex) {
			if (responseIndex >= 0) {$gameTemp.resultChoice = $gameMessage._choices[responseIndex]; } 
			for (var q in $gameSystem.allQuest)
			{
			 if($gameTemp.resultChoice.indexOf(q) >= 0)
			 {
			  $gameTemp.reserveCommonEvent($gameSystem.allQuest[q]["CommonEvent"]);

			 }
			}
			});
			
		});
		
		PluginManager.registerCommand(pluginName, "StartQuest", args => {
			const questName = args.questName;
			$gameSystem.allQuest[questName]["Status"] = "Unfinished";
		});
		
		PluginManager.registerCommand(pluginName, "FinishQuest", args => {
			const questName = args.questName;
			$gameSystem.allQuest[questName]["Status"] = "Complete";
		});
		
		
		
		
		
		
	}
 
	
	
})();