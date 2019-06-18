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
    name: getRandomValue(NAMES) + ' ' + getRandomValue(SURNAMES),
    coatColor: getRandomValue(COAT_COLORS),
    eyesColor: getRandomValue(EYES_COLORS)
  };
};

var generateCharacters = function (count) {
  var characters = [];

  for (var i = 0; i < count; i++) {
    characters[i] = generateCharacter();
  }

  return characters;
};

var getRandomValue = function (arr) {
  var index = Math.round(Math.random() * (arr.length - 1));

  return arr[index];
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

var elSetup = document.querySelector('.setup');
var elSetupSimilar = elSetup.querySelector('.setup-similar');
var elSetupSimilarList = elSetupSimilar.querySelector('.setup-similar-list');
var elCharacterTemplate = document.querySelector('#similar-wizard-template').content;
var characters = generateCharacters(CHARACTERS_COUNT);
var elCharacters = createElCharacters(characters);

elSetup.classList.remove('hidden');
insertElCharacters(elCharacters);
elSetupSimilar.classList.remove('hidden');
