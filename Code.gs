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
var ADDON_TITLE = 'TINCAN';

/**
 * A global constant 'notice' text to include with each email
 * notification.
 */
var NOTICE = "Form Notifications was created as an sample add-on, and is meant for \
demonstration purposes only. It should not be used for complex or important \
workflows. The number of notifications this add-on produces are limited by the \
owner's available email quota; it will not send email notifications if the \
owner's daily email quota has been exceeded. Collaborators using this add-on on \
the same form will be able to adjust the notification settings, but will not be \
able to disable the notification triggers set by other collaborators.";


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
      .addItem('Send data to LRS', 'showSidebar')
      .addItem('Show Data', 'showDataScreen')
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
      .setTitle('Share data with LRS');
  FormApp.getUi().showSidebar(ui);
}

function showDataScreen() {
  var ui = HtmlService.createHtmlOutputFromFile('data')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .setWidth(420)
      .setHeight(270);
  FormApp.getUi().showModalDialog(ui, 'About Form Notifications');
}

function showResponses() {
  //console.log("vajutas");
  var form = FormApp.openById('1HJ4y8IdOFGdBet8VK4XnMD1gN-2h7VJ62JQ_N3PQ4Nk');
  var formResponses = form.getResponses();
  Logger.log(formResponses.length);
  var formResponse = formResponses[formResponses.length-1];
  var itemResponses = formResponse.getItemResponses();
  for (var j = 0; j < itemResponses.length; j++) {
    var itemResponse = itemResponses[j];
    var kys = itemResponse.getItem().getTitle();
    Logger.log('Last response to the question "%s" was "%s"',
               itemResponse.getItem().getTitle(),
               itemResponse.getResponse());
    
    formData = document.createElement('span');
    formData.innerHTML = kys;
    var p = document.getElementById('p');
    p.appendChild(formData);
  }
}

