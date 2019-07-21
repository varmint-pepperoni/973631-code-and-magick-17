'use strict';

(function () {
  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Юлия', 'Виктор', 'Люпита', 'Вашингтон'];
  var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = [
    'rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)',
    'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'
  ];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
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
    if (window.keyboardPress.isEnter(e)) {
      closeSetup();
    }
  };

  var setupOpenIconKeydownHandler = function (e) {
    if (window.keyboardPress.isEnter(e)) {
      openSetup();
    }
  };

  var documentKeydownHandler = function (e) {
    if (window.keyboardPress.isEsc(e)) {
      if (!isUserNameInput(e.target)) {
        closeSetup();
      }
    }
  };

  var setupWizardCoatClickHandler = function () {
    var color = getRandomArrValue(COAT_COLORS);

    elSetupWizardCoat.style.fill = color;
    elSetupWizardCoatInput.value = color;
  };

  var setupWizardEyesClickHandler = function () {
    var color = getRandomArrValue(EYES_COLORS);

    elSetupWizardEyes.style.fill = color;
    elSetupWizardEyesInput.value = color;
  };

  var setupWizardFireballClickHandler = function () {
    var color = getRandomArrValue(FIREBALL_COLORS);

    elSetupWizardFireball.style.background = color;
    elSetupWizardFireballInput.value = color;
  };

  var openSetup = function () {
    if (!isSetupOpened()) {
      elSetup.classList.remove('hidden');

      elSetupClose.addEventListener('click', setupCloseClickHandler);
      elSetupClose.addEventListener('keydown', setupCloseKeydownHandler);
      document.addEventListener('keydown', documentKeydownHandler);
      elSetupWizardCoat.addEventListener('click', setupWizardCoatClickHandler);
      elSetupWizardEyes.addEventListener('click', setupWizardEyesClickHandler);
      elSetupWizardFireball.addEventListener('click', setupWizardFireballClickHandler);
    }
  };

  var closeSetup = function () {
    if (isSetupOpened()) {
      elSetup.classList.add('hidden');
      elSetup.style.top = '';
      elSetup.style.left = '';

      elSetupClose.removeEventListener('click', setupCloseClickHandler);
      elSetupClose.removeEventListener('keydown', setupCloseKeydownHandler);
      document.removeEventListener('keydown', documentKeydownHandler);
      elSetupWizardCoat.removeEventListener('click', setupWizardCoatClickHandler);
      elSetupWizardEyes.removeEventListener('click', setupWizardEyesClickHandler);
      elSetupWizardFireball.removeEventListener('click', setupWizardFireballClickHandler);
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
  var elSetupWizardCoatInput = elSetup.querySelector('input[name="coat-color"]');
  var elSetupWizardEyes = elSetupWizard.querySelector('.wizard-eyes');
  var elSetupWizardEyesInput = elSetup.querySelector('input[name="eyes-color"]');
  var elSetupWizardFireball = elSetup.querySelector('.setup-fireball-wrap');
  var elSetupWizardFireballInput = elSetupWizardFireball.querySelector('input');
  var elSetupOpen = document.querySelector('.setup-open');
  var elSetupClose = elSetup.querySelector('.setup-close');
  var elSetupOpenIcon = elSetupOpen.querySelector('.setup-open-icon');
  var elSetupSimilar = elSetup.querySelector('.setup-similar');
  var elSetupSimilarList = elSetupSimilar.querySelector('.setup-similar-list');
  var elCharacterTemplate = document.querySelector('#similar-wizard-template').content;
  var characters = generateCharacters(CHARACTERS_COUNT);
  var elCharacters = createElCharacters(characters);

  insertElCharacters(elCharacters);
  elSetupSimilar.classList.remove('hidden');

  elSetupOpen.addEventListener('click', setupOpenClickHandler);
  elSetupOpenIcon.addEventListener('keydown', setupOpenIconKeydownHandler);
})();
