'use strict';

(function () {
  var COAT_COLORS = [
    'rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)',
    'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'
  ];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var CHARACTERS_COUNT = 4;
  var Value = {
    COAT: 2,
    EYES: 1
  };

  var getRandomNum = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min + 1;
  };

  var getRandomArrValue = function (arr) {
    return arr[getRandomNum(0, arr.length - 1)];
  };

  var createElCharacter = function (data) {
    var elCharacter = elCharacterTemplate.cloneNode(true);
    var elName = elCharacter.querySelector('.setup-similar-label');
    var elCoat = elCharacter.querySelector('.wizard-coat');
    var elEyes = elCharacter.querySelector('.wizard-eyes');

    elName.textContent = data.name;
    elCoat.setAttribute('fill', data.colorCoat);
    elEyes.setAttribute('fill', data.colorEyes);

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

    elSetupSimilarList.innerHTML = '';
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
    wizardState.colorCoat = color;
    updateSimilarWizards();
  };

  var setupWizardEyesClickHandler = function () {
    var color = getRandomArrValue(EYES_COLORS);

    elSetupWizardEyes.style.fill = color;
    elSetupWizardEyesInput.value = color;
    wizardState.colorEyes = color;
    updateSimilarWizards();
  };

  var setupWizardFireballClickHandler = function () {
    var color = getRandomArrValue(FIREBALL_COLORS);

    elSetupWizardFireball.style.background = color;
    elSetupWizardFireballInput.value = color;
  };

  var setupWizardFormSubmitHandler = function (e) {
    var formData = new FormData(e.target);

    e.preventDefault();

    window.backend.save(formData, successFormSaveHandler, ajaxErrorHandler);
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
      elSetupWizardForm.addEventListener('submit', setupWizardFormSubmitHandler);
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
      elSetupWizardForm.removeEventListener('submit', setupWizardFormSubmitHandler);
    }
  };

  var isSetupOpened = function () {
    return !elSetup.classList.contains('hidden');
  };

  var isUserNameInput = function (el) {
    return el.classList.contains('setup-user-name');
  };

  var successCharactersLoadHandler = function (characters) {
    wizards = characters;
    redrawWizards();
    elSetupOpen.addEventListener('click', setupOpenClickHandler);
    elSetupOpenIcon.addEventListener('keydown', setupOpenIconKeydownHandler);
  };

  var redrawWizards = function () {
    var elCharacters = createElCharacters(getSimilarWizards());

    insertElCharacters(elCharacters);
    elSetupSimilar.classList.remove('hidden');
  };

  var successFormSaveHandler = function () {
    closeSetup();
  };

  var ajaxErrorHandler = function (errorMessage) {
    var node = document.createElement('div');

    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var getSimilarWizards = function () {
    wizards.forEach(function (wizard) {
      wizard.similarValue = getWizardSimilarValue(wizard);
    });

    wizards.sort(compareWizards);

    return wizards.slice(0, CHARACTERS_COUNT);
  };

  var getWizardSimilarValue = function (wizard) {
    var value = 0;

    if (wizard.colorCoat === wizardState.colorCoat) {
      value += Value.COAT;
    }

    if (wizard.colorEyes === wizardState.colorEyes) {
      value += Value.EYES;
    }

    return value;
  };

  var compareWizards = function (a, b) {
    if (a.similarValue < b.similarValue) {
      return 1;
    }
    if (a.similarValue > b.similarValue) {
      return -1;
    }
    return 0;
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
  var elSetupWizardForm = elSetup.querySelector('.setup-wizard-form');
  var wizards = [];
  var wizardState = {
    colorCoat: 'rgb(101, 137, 164)',
    colorEyes: 'black'
  };
  var updateSimilarWizards = window.debounce(redrawWizards);

  window.backend.load(successCharactersLoadHandler, ajaxErrorHandler);
})();
