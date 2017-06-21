/**
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @OnlyCurrentDoc
 *
 * The above comment directs Apps Script to limit the scope of file
 * access for this add-on. It specifies that this add-on will only
 * attempt to read or modify the files in which the add-on is used,
 * and not all of the user's files. The authorization request message
 * presented to users will reflect this limited scope.
 */

/**
 * A global constant String holding the title of the add-on. This is
 * used to identify the add-on in the notification emails.
 */
var ADDON_TITLE = 'LiveQuest Visualization';




/**
 * Adds a custom menu to the active form to show the add-on sidebar.
 *
 * @param {object} e The event parameter for a simple onOpen trigger. To
 *     determine which authorization mode (ScriptApp.AuthMode) the trigger is
 *     running in, inspect e.authMode.
 */
function onOpen(e) {
  FormApp.getUi()
      .createAddonMenu()
      .addItem('Kõikide Andmete saatmine', 'showSidebar')
      .addItem('Puuduvate Andmete saatmine', 'showSidebar2')
      .addToUi();
}

/**
 * Runs when the add-on is installed.
 *
 * @param {object} e The event parameter for a simple onInstall trigger. To
 *     determine which authorization mode (ScriptApp.AuthMode) the trigger is
 *     running in, inspect e.authMode. (In practice, onInstall triggers always
 *     run in AuthMode.FULL, but onOpen triggers may be AuthMode.LIMITED or
 *     AuthMode.NONE).
 */
function onInstall(e) {
  onOpen(e);
}

/**
 * Opens a sidebar in the form containing the add-on's user interface for
 * configuring the notifications this add-on will produce.
 */
function showSidebar() {
  var ui = HtmlService.createHtmlOutputFromFile('Sidebar')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .setTitle('SEND DATA TO LL');
  FormApp.getUi().showSidebar(ui);
}

function showSidebar2() {
  var ui = HtmlService.createHtmlOutputFromFile('Sidebar2')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .setTitle('SEND DATA');
  FormApp.getUi().showSidebar(ui);
}



/**
 * Save sidebar settings to this form's Properties, and update the onFormSubmit
 * trigger as needed.
 *
 * @param {Object} settings An Object containing key-value
 *      pairs to store.
 */
function saveSettings(settings) {
  PropertiesService.getDocumentProperties().setProperties(settings);
}

function getSettings() {
  var settings = PropertiesService.getDocumentProperties().getProperties();
  return settings;
}

/**
 * Adjust the onFormSubmit trigger based on user's requests.
 */
/*function adjustFormSubmitTrigger() {
  var form = FormApp.getActiveForm();
  var triggers = ScriptApp.getUserTriggers(form);
  var settings = PropertiesService.getDocumentProperties();
  var triggerNeeded =
      settings.getProperty('dataNotify') == 'true';

  // Create a new trigger if required; delete existing trigger
  //   if it is not needed.
  var existingTrigger = null;
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getEventType() == ScriptApp.EventType.ON_FORM_SUBMIT) {
      existingTrigger = triggers[i];
      break;
    }
  }
  if (triggerNeeded && !existingTrigger) {
    var trigger = ScriptApp.newTrigger('respondToFormSubmit')
        .forForm(form)
        .onFormSubmit()
        .create();
  } else if (!triggerNeeded && existingTrigger) {
    ScriptApp.deleteTrigger(existingTrigger);
  }
}
*/


function showResponses() {
  
  var responses = [];
  var formId = FormApp.getActiveForm().getId();
  var title = FormApp.getActiveForm().getTitle();
  var formResponses = FormApp.getActiveForm().getResponses();
  //Logger.log(formId);
  //Logger.log(title);
  //Logger.log(formResponses.length);
  
 
  for (var i = 0; i < formResponses.length; i++) {
      var response = [];
      var formResponse = formResponses[i];
      var itemResponses = formResponse.getItemResponses();
  
      //Logger.log(itemResponses.length);
  
      for (var j = 0; j < itemResponses.length; j++) {
               var answer = []
               var itemResponse = itemResponses[j];
        
               //Logger.log('Question: "%s" \n Answer: "%s" \n Type: "%s"',
               //itemResponse.getItem().getTitle(),
               //itemResponse.getResponse(),
               //itemResponse.getItem().getType());
               answer.push(formId);
               answer.push(title)
               answer.push(itemResponse.getItem().getTitle());
               answer.push(String(itemResponse.getResponse()));
               answer.push(String(itemResponse.getItem().getType()));
        
               response.push(answer); 
        
      }
      responses.push(response);
      Logger.log(responses);
  }
  return responses;
}

/*
function sendId() {
 var formId = FormApp.getActiveForm().getId();
 var title = FormApp.getActiveForm().getTitle();
 
 return [formId, title];
  
}
*/

