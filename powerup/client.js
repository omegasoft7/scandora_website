/* global TrelloPowerUp */

var SCANDORA_ICON = 'https://scandora.eu/favicon.svg';

var UTM_BASE =
  'https://scandora.eu/?utm_source=trello_marketplace&utm_medium=marketplace&utm_campaign=listing';
var CARD_URL = UTM_BASE + '&utm_content=powerup_card';
var BOARD_URL = UTM_BASE + '&utm_content=powerup_board';

window.TrelloPowerUp.initialize({
  'card-buttons': function () {
    return [
      {
        icon: SCANDORA_ICON,
        text: 'Scan with Scandora',
        url: CARD_URL,
        target: '_blank',
        condition: 'always',
      },
    ];
  },
  'board-buttons': function () {
    return [
      {
        icon: { dark: SCANDORA_ICON, light: SCANDORA_ICON },
        text: 'Scan with Scandora',
        url: BOARD_URL,
        target: '_blank',
        condition: 'always',
      },
    ];
  },
});
