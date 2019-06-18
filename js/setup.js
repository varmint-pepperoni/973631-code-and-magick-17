'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Юлия', 'Виктор', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = [
  'rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)',
  'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'
];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var CHARACTERS_COUNT = 4;

var generateCharacter = function () {
  return {
    name: getRandomArrValue(NAMES) + ' ' + getRandomArrValue(SURNAMES),
    coatColor: getRandomArrValue(COAT_COLORS),
    eyesColor: getRandomArrValue(EYES_COLORS)
  };
};

var generateCharacters = function (count) {
  var characters = [];

  for (var i = 0; i < count; i++) {
    characters[i] = generateCharacter();
  }

  return characters;
};

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min)) + min + 1;
}

var getRandomArrValue = function (arr) {
  return arr[getRandomNum(0, arr.length - 1)];
};

var createElCharacter = function (data) {
  var elCharacter = elCharacterTemplate.cloneNode(true);
  var elName = elCharacter.querySelector('.setup-similar-label');
  var elCoat = elCharacter.querySelector('.wizard-coat');
  var elEyes = elCharacter.querySelector('.wizard-eyes');

  elName.textContent = data.name;
  elCoat.setAttribute('fill', data.coatColor);
  elEyes.setAttribute('fill', data.eyesColor);

  return elCharacter;
};

var createElCharacters = function (arr) {
  var elCharacters = [];

  for (var i = 0; i < arr.length; i++) {
    elCharacters[i] = createElCharacter(arr[i]);
  }

  return elCharacters;
};

var insertElCharacters = function (arr) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(arr[i]);
  }

  elSetupSimilarList.appendChild(fragment);
};

var setupOpenClickHandler = function () {
  openSetup();
};

var setupCloseClickHandler = function () {
  closeSetup();
};

var setupCloseKeydownHandler = function (e) {
  if (e.keyCode === 13) {
    closeSetup();
  }
};

var setupOpenIconKeydownHandler = function (e) {
  if (e.keyCode === 13) {
    openSetup();
  }
};

var documentKeydownHandler = function (e) {
  if (e.keyCode === 27) {
    if (!isUserNameInput(e.target)) {
      closeSetup();
    }
  }
};

var setupFormSubmitHandler = function (e) {
  e.preventDefault();
};

var setupWizardCoatClickHandler = function () {
  elSetupWizardCoat.style.fill = getRandomArrValue(COAT_COLORS);
};

var setupWizardEyesClickHandler = function () {
  elSetupWizardEyes.style.fill = getRandomArrValue(EYES_COLORS);
};

var openSetup = function () {
  if (!isSetupOpened()) {
    elSetup.classList.remove('hidden');

    elSetupClose.addEventListener('click', setupCloseClickHandler);
    elSetupClose.addEventListener('keydown', setupCloseKeydownHandler);
    document.addEventListener('keydown', documentKeydownHandler);
    elSetupForm.addEventListener('submit', setupFormSubmitHandler);
    elSetupWizardCoat.addEventListener('click', setupWizardCoatClickHandler);
    elSetupWizardEyes.addEventListener('click', setupWizardEyesClickHandler);
  }
};

var closeSetup = function () {
  if (isSetupOpened()) {
    elSetup.classList.add('hidden');

    elSetupClose.removeEventListener('click', setupCloseClickHandler);
    elSetupClose.removeEventListener('keydown', setupCloseKeydownHandler);
    document.removeEventListener('keydown', documentKeydownHandler);
    elSetupForm.removeEventListener('submit', setupFormSubmitHandler);
    elSetupWizardCoat.removeEventListener('click', setupWizardCoatClickHandler);
    elSetupWizardEyes.removeEventListener('click', setupWizardEyesClickHandler);
  }
};

var isSetupOpened = function () {
  return !elSetup.classList.contains('hidden');
};

var isUserNameInput = function (el) {
  return el.classList.contains('setup-user-name');
};

var elSetup = document.querySelector('.setup');
var elSetupWizard = elSetup.querySelector('.setup-wizard');
var elSetupWizardCoat = elSetupWizard.querySelector('.wizard-coat');
var elSetupWizardEyes = elSetupWizard.querySelector('.wizard-eyes');
var elSetupOpen = document.querySelector('.setup-open');
var elSetupClose = elSetup.querySelector('.setup-close');
var elSetupOpenIcon = elSetupOpen.querySelector('.setup-open-icon');
var elSetupSimilar = elSetup.querySelector('.setup-similar');
var elSetupForm = elSetup.querySelector('.setup-wizard-form');
var elSetupSimilarList = elSetupSimilar.querySelector('.setup-similar-list');
var elCharacterTemplate = document.querySelector('#similar-wizard-template').content;
var characters = generateCharacters(CHARACTERS_COUNT);
var elCharacters = createElCharacters(characters);

insertElCharacters(elCharacters);
elSetupSimilar.classList.remove('hidden');

elSetupOpen.addEventListener('click', setupOpenClickHandler);
elSetupOpenIcon.addEventListener('keydown', setupOpenIconKeydownHandler);
